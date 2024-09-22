import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 문제 가져오기 API (AI에게 문제를 추천받는 API)
export const getQuestions = async () => {
  const response = await axios.get(`${BASE_URL}/recommend`);
  return response.data;
};

// AI에서 반환된 questionId로 문제 조회하는 API
export const getQuestionsFromAI = async (questionIds) => {
  const response = await axios.post(`${BASE_URL}/recommend`, {
    problems: questionIds.map((id) => ({ question_id: id })),
  });
  return response.data;
};

// 답안 제출 API
export const submitAnswers = async (answers) => {
  const response = await axios.post(`${BASE_URL}/recommend/submit`, {
    answers, // { questionId, selectedAnswer } 형식으로 전달
  });
  return response.data;
};
