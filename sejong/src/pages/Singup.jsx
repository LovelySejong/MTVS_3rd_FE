import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';

import BackImg from '../assets/images/background.png'; // 이미지 경로

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await signup(nickname, email, password, confirmPassword);
      console.log('Signup Success:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  return (
    <div style={{ ...styles.signupContainer, backgroundImage: `url(${BackImg})` }}>
      <div style={styles.content}>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.signupButton}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  signupContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw', // 화면 전체 너비
    backgroundColor: '#6bbde0', // 기본 배경색 (배경 이미지 로드 실패 시 표시)
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain', // 이미지가 잘리지 않도록 설정
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 반투명 흰색 배경
    padding: '40px',
    borderRadius: '15px',
    maxWidth: '400px', // 최대 너비
    width: '100%', // 가로 크기를 부모 요소에 맞춤
    boxSizing: 'border-box', // padding 포함하여 너비 계산
    margin: '0 20px', // 좌우 여백 추가
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', // 폼의 너비를 부모 요소에 맞춤
  },
  inputWrapper: {
    marginBottom: '15px',
    width: '100%', // 입력 필드가 부모 요소에 맞춰짐
  },
  input: {
    width: '100%',
    height: '40px',
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    fontSize: '16px',
    textAlign: 'center',
  },
  signupButton: {
    width: '100%', // 버튼의 너비를 부모 요소에 맞춤
    height: '50px',
    borderRadius: '25px',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default Signup;
