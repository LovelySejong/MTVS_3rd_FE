import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/Header'; // HeaderBar 컴포넌트
import { getQuestions, submitAnswers } from '../api/quiz';
import '../css/Quiz.css'

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // 문제 목록
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 인덱스
  const [answers, setAnswers] = useState({}); // 사용자가 선택한 답변 저장
  const [result, setResult] = useState(null); // 채점 결과
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 문제 가져오는 함수
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await getQuestions();
        const parsedQuestions = questionsData.problems.map(parseQuestion); // 문제와 선택지 분리
        setQuestions(parsedQuestions); // 문제 목록을 상태에 저장
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false); // 에러 발생 시에도 로딩 종료
      }
    };

    fetchQuestions();
  }, []);

  // 질문을 파싱해서 문제와 선택지 분리하는 함수
  const parseQuestion = (questionDTO) => {
    const { question_id, question, answer, question_format } = questionDTO;
    const options = question.split(/\s?\d+\)\s?/).filter(Boolean).slice(1); // Extract options

    return {
      question_id,
      question: question.split(/\s?\d+\)\s?/)[0], // Extract question text only
      options,
      answer, // For grading
      question_format,
    };
  };

  // 사용자가 선택한 답변을 저장하는 핸들러
  const handleAnswerChange = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.question_id]: selectedAnswer, // 선택한 답변을 상태에 저장
    }));
  };

  // 다음 문제로 넘어가는 핸들러
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit(); // 마지막 문제일 경우 채점하기
    }
  };

  // 퀴즈 제출 핸들러
  const handleSubmit = async () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId: parseInt(questionId, 10),
      selectedAnswer: answers[questionId], // 선지 번호를 전달
    }));

    try {
      const resultData = await submitAnswers(formattedAnswers); // 답안을 서버로 제출하고 결과 받음
      setResult(resultData); // 결과를 상태에 저장
    } catch (error) {
      console.log(formattedAnswers);
      console.error('Error submitting answers:', error);
    }
  };

  // 로딩 중이면 로딩 메시지 표시
  if (loading) {
    return (
      <>
        <HeaderBar />
        <p>문제를 불러오는 중입니다...</p>
      </>
    );
  }

  // 문제나 선택지가 없을 경우 메시지 표시
  if (questions.length === 0) {
    return (
      <>
        <HeaderBar />
        <p>현재 준비된 문제가 없습니다! 다음에 다시 찾아와주세요 🥲</p>
      </>
    );
  }

  // 현재 문제를 가져오기
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <HeaderBar /> {/* 헤더바 표시 */}
      <div className="quiz-container">
        <h1 className="quiz-title">문해력 퀴즈</h1>

        {result ? (
          <div className="result-block">
            <h2>결과</h2>
            <p>맞춘 문제: {result.correctCount}</p>
            <p>전체 문제 수: {result.totalQuestions}</p>
            <p>점수: {result.score}</p>
          </div>
        ) : (
          <div key={currentQuestion.question_id} className="question-block">
            <p className="question-text"><strong>질문:</strong> {currentQuestion.question}</p>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`option ${answers[currentQuestion.question_id] === index + 1 ? 'selected' : ''}`}
                  onClick={() => handleAnswerChange(index + 1)} // Pass option index as answer
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.question_id}`}
                    value={index + 1}
                    checked={answers[currentQuestion.question_id] === index + 1}
                    onChange={() => handleAnswerChange(index + 1)}
                    style={{ display: 'none' }} // Hide the radio button itself
                  />
                  {option}
                </label>
              ))}
            </div>
            <button className="next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '제출'}
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
