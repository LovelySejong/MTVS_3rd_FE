import axios from "axios";

// 토큰을 추출하는 함수 (예: 로컬스토리지에서)
const getToken = () => {
  return localStorage.getItem("token");
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 퀴즈 평균 점수 가져오기
export const getQuizAverageScores = async () => {
  return [
    { part: "단어", averageScore: 85 },
    { part: "한자어", averageScore: 75 },
    { part: "띄어쓰기", averageScore: 90 },
    { part: "문해력", averageScore: 70 },
  ];
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
  return [
    {
      gameId: 1,
      partner: "user2",
      rooms: [
        { roomName: "단어의 방", escapeTime: 150 },
        { roomName: "한자어의 방", escapeTime: 160 },
        { roomName: "띄어쓰기의 방", escapeTime: 155 },
        { roomName: "문해력의 방", escapeTime: 175 },
      ],
    },
    {
      gameId: 2,
      partner: "user3",
      rooms: [
        { roomName: "단어의 방", escapeTime: 140 },
        { roomName: "한자어의 방", escapeTime: 150 },
        { roomName: "띄어쓰기의 방", escapeTime: 145 },
        { roomName: "문해력의 방", escapeTime: 160 },
      ],
    },
    {
      gameId: 3,
      partner: "user4",
      rooms: [
        { roomName: "단어의 방", escapeTime: 128 },
        { roomName: "한자어의 방", escapeTime: 187 },
        { roomName: "띄어쓰기의 방", escapeTime: 176 },
        { roomName: "문해력의 방", escapeTime: 142 },
      ],
    },
  ];
};

export const getTestRecord = async () => {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/log`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
    });
    console.log("전적 조회 성공: ", res.data);
    return res.data;
  } catch (error) {
    console.log("전적 조회 실패: ", error);
  }
};
