import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"; // Chart.js 요소 가져오기
import {
  getUserEscapeTime,
  getQuizAverageScores,
  getEscapeRoomRecords,
  getTestRecord,
} from "../api/record";
import HeaderBar from "../components/Header";
import { getUserProfile } from "../api/user";
import "../css/Mypage.css";

import profileImg from "../assets/images/432842383.jpg";

Chart.register(ArcElement, Tooltip, Legend);

// 분:초 형식으로 변환하는 함수
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}초`;
};

const Mypage = () => {
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [averageTime, setAverageTime] = useState(null); // 방탈출 평균 시간 데이터 (초기값 null)
  const [quizScores, setQuizScores] = useState([]); // 퀴즈 평균 점수 데이터
  const [escapeRecords, setEscapeRecords] = useState([]); // 방탈출 기록 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 닉네임을 받아오는 API 호출
  const getProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response?.success && response?.response?.nickname) {
        setNickname(response.response.nickname); // 닉네임만 상태에 저장
      } else {
        console.error("Invalid profile response:", response);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  // 데이터 갱신 함수
  const refreshData = async () => {
    setLoading(true);
    try {
      const timeData = await getUserEscapeTime();
      setAverageTime(timeData);

      const scoresData = await getQuizAverageScores();
      setQuizScores(scoresData);

      const recordsData = await getEscapeRoomRecords();
      setEscapeRecords(recordsData);

      const testData = await getTestRecord();
      console.log("testData: ", testData);

      await getProfile(); // 닉네임 가져오기
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다."); // 오류 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  // 페이지 처음 로드될 때 데이터 가져오기
  useEffect(() => {
    refreshData(); // 처음 로드할 때 데이터 가져오기
  }, []);

  // 원형 차트 데이터 (방탈출 평균 시간)
  const doughnutData = averageTime
    ? {
        labels: ["단어의 방", "한자어의 방", "띄어쓰기의 방", "문해력의 방"], // 방 이름으로 변경
        datasets: [
          {
            label: "Escape Time (sec)",
            data: [
              averageTime.roomNumber1,
              averageTime.roomNumber2,
              averageTime.roomNumber3,
              averageTime.roomNumber4,
            ], // API로부터 받은 데이터 사용
            backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb", "#fd6b19"],
            hoverOffset: 4,
          },
        ],
      }
    : null; // 데이터가 없으면 null 처리

  return (
    <>
      <HeaderBar /> {/* 헤더는 무조건 보여짐 */}
      <div className="mypage-container">
        {/* 프로필 섹션 */}
        <div className="profile-section">
          <img src={profileImg} alt="Profile" className="profile-picture" />{" "}
          {/* 하드코딩된 프로필 사진 */}
          <h2>{nickname}</h2> {/* 닉네임 표시 */}
          <button onClick={refreshData} className="refresh-button">
            갱신
          </button>{" "}
          {/* 갱신 버튼 */}
        </div>

        {/* 로딩 상태 처리 */}
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>{error}</p> // 에러 메시지 표시
        ) : (
          <>
            <div className="stats-container">
              <div className="chart-section">
                <h2>평균 방탈출 시간</h2>
                {doughnutData ? (
                  <Doughnut data={doughnutData} />
                ) : (
                  <p>데이터가 없습니다.</p>
                )}
              </div>

              <div className="score-section">
                <h2>퀴즈 평균 점수</h2>
                <table>
                  <thead>
                    <tr>
                      <th>파트</th>
                      <th>평균 점수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizScores.length > 0 ? (
                      quizScores.map((score, index) => (
                        <tr key={index}>
                          <td>{score.questionType}</td>
                          <td>{score.averageScore}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">퀴즈 데이터가 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* 방탈출 기록 표시 */}
        <div className="escape-records">
          <h2>방탈출 기록</h2>
          <div className="cards">
            {escapeRecords.length > 0 ? (
              escapeRecords.map((record, index) => (
                <div className="card" key={index}>
                  <h3>게임 ID: {record.gameId}</h3>
                  <p>함께 한 사람: {record.partner}</p>
                  {record.rooms.map((room, roomIndex) => (
                    <p key={roomIndex}>
                      {room.roomName}: {formatTime(room.escapeTime)}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p>방탈출 기록이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
