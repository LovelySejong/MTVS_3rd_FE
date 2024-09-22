import React, { useState, useEffect } from 'react';
import HeaderBar from '../component/Header'; // HeaderBar 컴포넌트
import { getQuestions, getQuestionsFromAI, submitAnswers } from '../api/quiz';

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // 문제 목록
  const [answers, setAnswers] = useState({}); // 사용자가 선택한 답변 저장
  const [result, setResult] = useState(null); // 채점 결과
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 문제 가져오는 함수
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await getQuestions();
        setQuestions(questionsData.problems || []); // 문제 목록을 상태에 저장
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false); // 에러 발생 시에도 로딩 종료
      }
    };

    fetchQuestions();
  }, []);

  // AI가 반환한 문제 ID로 문제를 가져오는 함수
  const fetchQuestionsFromAI = async (questionIds) => {
    try {
      const questionsData = await getQuestionsFromAI(questionIds);
      setQuestions(questionsData.problems || []); // AI가 반환한 문제 목록을 상태에 저장
    } catch (error) {
      console.error('Error fetching questions from AI:', error);
    }
  };

  // 사용자가 선택한 답변을 저장하는 핸들러
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer, // 선택한 답변을 상태에 저장
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

  // 로딩 중이면 로딩 메시지 표시
  if (loading) {
    return (
      <>
        <HeaderBar />
        <p>Loading questions...</p>
      </>
    );
  }

  // 문제나 선택지가 없을 경우 메시지 표시
  if (questions.length === 0) {
    return(
      <>
        <HeaderBar />
        <p>No questions available.</p>;
      </>
    )
  }

  return (
    <>
      <HeaderBar /> {/* 헤더바 표시 */}
      <div>
        <h1>Quiz Page</h1>
        {questions.map((question) => (
          <div key={question.question_id} className="question-block">
            <p>{question.question}</p> {/* 문제 텍스트 */}
            <div className="options">
              {/* 객관식 선택지 표시 */}
              {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question-${question.question_id}`}
                    value={option}
                    onChange={() => handleAnswerChange(question.question_id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSubmit}>Submit Quiz</button>

        {/* 제출 후 결과 표시 */}
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
