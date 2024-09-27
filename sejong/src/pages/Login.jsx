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

  const handleSignUp = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
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
          <div style={styles.signUpLinkWrapper}>
            <a href="/signup" style={styles.signUpLink}>회원가입</a>
          </div>
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
    width: '100vw',
    backgroundColor: '#6bbde0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '40px',
    borderRadius: '15px',
    maxWidth: '400px',
    width: '100%',
    boxSizing: 'border-box',
    margin: '0 20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    height: '40px',
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    fontSize: '16px',
    textAlign: 'center',
    boxSizing: 'border-box', // 입력 필드 크기 계산에 패딩 포함
  },
  loginButton: {
    width: '100%', // 버튼의 너비를 입력 필드와 동일하게
    height: '50px',
    borderRadius: '25px',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
    boxSizing: 'border-box', // 버튼 크기 계산에 패딩 포함
  },
  signUpLinkWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '10px',
  },
  signUpLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default Login;
