import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

import BackImg from '../assets/images/background.png'; // 이미지 경로

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login Success:', response);
      navigate('/mypage');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div style={{ ...styles.loginContainer, backgroundImage: `url(${BackImg})` }}>
      <div style={styles.content}>
        <div style={styles.form}>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                placeholder="전자우편"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                placeholder="암호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.loginButton}>
              입장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
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
  loginButton: {
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

export default Login;
