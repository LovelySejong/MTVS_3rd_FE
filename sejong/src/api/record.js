import axios from "axios";

// 토큰을 추출하는 함수 (예: 로컬스토리지에서)
const getToken = () => {
  return localStorage.getItem("token");
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 퀴즈 평균 점수 가져오기
export const getQuizAverageScores = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/recommend/avgscores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.map((score) => ({
      ...score,
      averageScore: parseFloat(score.averageScore).toFixed(2),
    }));
  } catch (error) {
    console.error("Failed to fetch quiz average scores:", error);
    return [];
  }
};

// 사용자 방탈출 평균 시간 가져오기 (초 단위로 반환)
export const getUserEscapeTime = async () => {
  return {
    roomNumber1: 150,
    roomNumber2: 160,
    roomNumber3: 155,
    roomNumber4: 175,
  };
};

// 방탈출 기록 가져오기 (초 단위)
export const getEscapeRoomRecords = async () => {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/log`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
    });

    return res.data.response;
  } catch (error) {
    console.log("전적 조회 실패: ", error);
  }
};
