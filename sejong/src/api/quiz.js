import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 문제 가져오기 API
export const getQuestions = async () => {
  const response = await axios.get(`${BASE_URL}/recommend`);
  return response.data;
};

// 답안 제출 API
export const submitAnswers = async (answers) => {
  const response = await axios.post(`${BASE_URL}/recommend/submit`, { answers });
  return response.data;
};
