import HeaderBar from "../component/Header";

const Quiz = () => {
  const nickname = 'USER1'; // 실제로는 로그인 정보에서 닉네임을 받아올 수 있습니다.

  return (
    <>
      <HeaderBar nickname={nickname} /> {/* HeaderBar 컴포넌트 추가 */}
      <div>
        {/* Quiz 내용이 들어갈 부분 */}
        <h1>퀴즈 페이지</h1>
        <p>여기에 퀴즈 내용이 표시될 예정입니다.</p>
      </div>
    </>
  );
};

export default Quiz;