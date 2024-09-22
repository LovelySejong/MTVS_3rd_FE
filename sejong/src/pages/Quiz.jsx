import { useState, useEffect } from 'react';
import HeaderBar from '../component/Header'; // HeaderBar 컴포넌트 불러오기
import { getQuestions, submitAnswers } from '../api/quiz'; // API 호출 함수 불러오기

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // 서버에서 가져온 질문 목록, 초기값을 빈 배열로 설정
  const [answers, setAnswers] = useState({}); // 사용자가 선택한 답변 저장
  const [result, setResult] = useState(null); // 제출 후 결과 저장
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 서버에서 문제를 가져오는 함수
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await getQuestions();
        setQuestions(questionsData.questions || []); // 데이터가 undefined일 경우 빈 배열로 설정
        setLoading(false); // 로딩 상태 종료
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false); // 에러 발생 시에도 로딩 종료
      }
    };

    fetchQuestions();
  }, []);

  // 사용자가 선택한 답변을 저장하는 핸들러
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer, // 선택한 답을 상태에 저장
    }));
  };

  // 퀴즈 제출 핸들러
  const handleSubmit = async () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId: parseInt(questionId, 10),
      selectedAnswer: answers[questionId],
    }));

    try {
      const resultData = await submitAnswers(formattedAnswers); // 답안을 서버로 제출하고 결과 받음
      setResult(resultData); // 결과를 상태에 저장
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  // 로딩 중인 경우 로딩 메시지 출력
  if (loading) {
    return <p>Loading questions...</p>;
  }

  // 퀴즈 문제나 선택지가 비어있을 경우 처리
  if (questions.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <>
      <HeaderBar />
      <div>
        <h1>퀴즈 페이지</h1>
        {questions.map((question) => (
          <div key={question.questionId} className="question-block">
            <p>{question.question}</p> {/* 질문 텍스트 */}
            <div className="options">
              {/* 객관식 선택지 표시 */}
              {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question-${question.questionId}`}
                    value={option}
                    onChange={() => handleAnswerChange(question.questionId, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSubmit}>Submit Quiz</button>

        {/* 제출 후 결과를 표시 */}
        {result && (
          <div className="result-block">
            <h2>Results</h2>
            <p>Correct Answers: {result.correctCount}</p>
            <p>Total Questions: {result.totalQuestions}</p>
            <p>Score: {result.score}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
