import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../assets/images/logo.png';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  const handleNewStart = () => {
    navigate('/signup');
  };

  return (
    <HomeContainer>
      <LogoContainer>
        <LogoImage src={LogoImg} alt="Logo" />
      </LogoContainer>
      <ButtonContainer>
        <StartButton onClick={handleStart}>시작하기</StartButton>
        <NewStartButton onClick={handleNewStart}>새로 시작하기</NewStartButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  height: 100vh; /* 화면 전체 높이 */
  justify-content: center;
  align-items: center;
  background-color: #f7f4f0;
  padding: 0;
  margin: 0;
`;

const LogoContainer = styled.div`
  flex: 1; /* 왼쪽에 로고가 위치하도록 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 50%;
  padding-left: 300px;
`;

const ButtonContainer = styled.div`
  flex: 1; /* 오른쪽에 버튼들이 위치하도록 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 150px;
`;

const StartButton = styled.button`
  width: 60%;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #ffd233;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fbc02d;
  }
`;

const NewStartButton = styled(StartButton)`
  background-color: #d4886e;

  &:hover {
    background-color: #c3775d;
  }
`;
