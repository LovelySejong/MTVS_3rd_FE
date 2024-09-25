import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 토큰을 추출하는 함수 (예: 로컬스토리지에서)
const getToken = () => {
  return localStorage.getItem('token');
};

// 문제 가져오기 API (AI에게 문제를 추천받는 API)
export const getQuestions = async () => {
  const token = getToken(); // 토큰을 추출
  const response = await axios.get(`${BASE_URL}/recommend`, {
    headers: {
      Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });
  return response.data;
};

// 답안 제출 API
export const submitAnswers = async (answers) => {
  const token = getToken(); // 토큰을 추출
  const response = await axios.post(
    `${BASE_URL}/recommend/submit`,
    {
      answers, // { questionId, selectedAnswer } 형식으로 전달
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
    }
  );
  return response.data;
};
