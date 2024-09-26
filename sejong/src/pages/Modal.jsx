import React from 'react';
import '../css/Modal.css'; // 모달 관련 스타일 시트 추가

const Modal = ({ show, onClose, record }) => {
  if (!show) {
    return null; // 모달이 표시되지 않으면 null 반환
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>문해력 성적통지표</h2>
        <table>
          <thead>
            <tr>
              <th>수험번호</th>
              <th>성명</th>
              <th>함께 푼 사람</th>
              <th>전체 소요 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{record.gameId}</td>
              <td>lxxsxynnn</td>
              <td>{record.partner}</td>
              <td>23분 25초 45</td> 
            </tr>
            <tr>
              <th>구분</th>
              <th>띄어쓰기</th>
              <th>한자어</th>
              <th>추론</th>
              <th>문해</th>
            </tr>
            <tr>
              <td>시간</td>
              <td>{record.rooms[0].escapeTime}</td>
              <td>{record.rooms[1].escapeTime}</td>
              <td>{record.rooms[2].escapeTime}</td>
              <td>{record.rooms[3].escapeTime}</td>
            </tr>
            <tr>
              <td>백분위</td>
              <td>88</td>
              <td>87</td>
              <td>67</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
        <p>2023.09.04</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
