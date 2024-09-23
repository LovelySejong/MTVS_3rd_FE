import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/Header'; // HeaderBar 컴포넌트 추가
import '../css/Quiz.css'

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // 문제 목록
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 인덱스
  const [answers, setAnswers] = useState({}); // 사용자가 선택한 답변 저장
  const [result, setResult] = useState(null); // 채점 결과
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 문해력 문제 하드코딩
  const hardcodedQuestions = [
    {
      question_id: 36,
      question: '철수가 아침을 먹지 못한 이유를 고르세요 "철수: 아침에 진짜 정신없었어. 지수: 왜? 뭘 그렇게 바빴는데? 철수: 평소보다 일찍 일어나야 했는데, 시계가 멈춰서 시간이 다 늦었더라고. 지수: 설마 아침도 못 먹고 나왔겠네? 철수: 어, 맞아. 아침은 생각도 못 했어. 그냥 대충 준비하고 출근했지."',
      option1: '시계가 멈춰서',
      option2: '길이 막혀서',
      option3: '늦잠을 자서',
      option4: '차가 고장 나서',
      answer: '시계가 멈춰서',
    },
    {
      question_id: 37,
      question: '지수의 감정을 추론하세요 "지수: 오랜만에 친구들이랑 만나기로 했는데, 좀 이상해. 민수: 왜, 무슨 일 있어? 지수: 그냥... 시간이 다가오니까 긴장되더라. 괜히 어색한 분위기 만들까 봐. 민수: 네가? 네가 그런 걸 걱정할 사람이었어? 다들 오랜만에 만나서 반가워할 텐데."',
      option1: '긴장',
      option2: '기쁨',
      option3: '불안',
      option4: '슬픔',
      answer: '긴장',
    },
    {
      question_id: 38,
      question: '민수가 이번 주말에 할 일을 추론하세요 "민수: 이번 주말에 아침 일찍부터 나갈 예정이야. 지수: 아, 또? 지난주에도 나갔잖아. 민수: 그래도 그때는 시간이 없어서 빨리 끝냈는데, 이번엔 정상을 찍고 주변도 좀 돌아볼 거야. 지수: 그렇구나. 이번엔 어디로? 민수: 설악산. 계곡도 보고 내려와서 친구들이랑 저녁도 먹기로 했어."',
      option1: '등산을 간다',
      option2: '캠핑을 간다',
      option3: '영화를 본다',
      option4: '집에서 쉰다',
      answer: '등산을 간다',
    },
    {
      question_id: 39,
      question: '영희가 친구에게 부탁한 내용을 추론하세요 "영희: 나 이번에 큰 실수할 뻔했어. 지영: 왜? 무슨 일인데? 영희: 중요한 자료를 정리해야 하는데, 오늘 갑자기 일이 너무 많아서 시간이 없더라고. 지영: 그래서 어떻게 했어? 영희: 네가 대신 좀 도와줄 수 있겠다고 해서, 진짜 다행이었지. 내가 다른 걸 처리하는 동안 네가 빠르게 해준 덕분에 해결됐어."',
      option1: '자료 정리를 부탁했다',
      option2: '발표 준비를 부탁했다',
      option3: '회의 일정을 바꿔 달라고 부탁했다',
      option4: '회의에 참석해 달라고 부탁했다',
      answer: '자료 정리를 부탁했다',
    },
    {
      question_id: 40,
      question: '민수가 기차를 놓친 이유를 추론하세요 "민수: 아침에 서둘러 나갔는데, 도로 상황이 너무 안 좋았어. 지연: 설마 기차 놓친 거야? 민수: 맞아, 시간 맞추려고 택시까지 탔는데도, 길이 꽉 막혀서 기차가 떠나버렸지. 지연: 아... 교통 체증 때문에 그런 거구나."',
      option1: '교통 체증 때문에',
      option2: '택시가 고장 나서',
      option3: '늦잠을 자서',
      option4: '버스를 놓쳐서',
      answer: '교통 체증 때문에',
    },
    {
      question_id: 41,
      question: '철수의 감정을 추론하세요 "철수: 내가 준비한 발표에서 문제가 생겼어. 중간에 갑자기 자료가 이상하게 나오는 바람에, 다들 내가 실수한 줄 알더라고. 민수: 어떻게 수습했어? 철수: 수습하려고 했는데, 머리가 하얘져서 그냥 버벅거렸어. 정말 난감한 순간이었지."',
      option1: '실망',
      option2: '기쁨',
      option3: '분노',
      option4: '불안',
      answer: '실망',
    },
    {
      question_id: 42,
      question: '주인공이 저녁에 할 일을 추론하세요 "주인공: 오늘 저녁에 뭐 하냐고? 운동 가기로 했어. 요즘 매일 가고 있거든. 민수: 운동 끝나면 뭐 할 거야? 주인공: 운동 끝나고 나서는 집에 가서 좀 쉬고, 책도 읽고 그럴까 해. 그냥 차분하게 마무리할 예정이야."',
      option1: '운동을 간다',
      option2: '영화를 본다',
      option3: '책을 읽는다',
      option4: '친구를 만난다',
      answer: '운동을 간다',
    },
    {
      question_id: 43,
      question: '지수가 발표를 잘할 수 있었던 이유를 추론하세요: "지수: 발표 준비하면서 정말 긴장됐어. 민수: 그랬겠다. 그런데 잘 해냈잖아? 지수: 응, 사실 많이 연습했거든. 특히 중요한 부분은 여러 번 반복해서 외웠어. 그래서 발표할 때 덜 떨리고, 차분하게 할 수 있었어."',
      option1: '연습을 많이 해서',
      option2: '친구가 도와줘서',
      option3: '발표 내용이 쉬워서',
      option4: '운이 좋아서',
      answer: '연습을 많이 해서',
    },
    {
      question_id: 44,
      question: '영희의 감정을 추론하세요 "영희: 오늘 친구들이랑 만났는데, 기대했던 것만큼 즐겁진 않았어. 대화가 계속 어색했고, 내가 무슨 말을 해도 분위기가 안 풀리더라. 민수: 정말? 무슨 일 있었던 건 아니지? 영희: 아니, 그냥 오랜만에 만나서 그런지, 내가 좀 긴장한 것도 있었던 것 같아. 신경이 많이 쓰였어."',
      option1: '불안',
      option2: '기쁨',
      option3: '화남',
      option4: '설렘',
      answer: '불안',
    },
    {
      question_id: 45,
      question: '민수가 왜 일찍 나섰는지 추론하세요 "민수: 오늘은 일찍 출발했어. 지수: 너 항상 시간을 잘 맞추잖아, 왜 일찍 나왔어? 민수: 요즘 길이 너무 막혀서 시간 맞추려면 미리 출발해야겠더라고. 실제로도 도착 시간이 딱 맞았어."',
      option1: '길이 막힐 것을 예상해서',
      option2: '미팅이 일찍 있어서',
      option3: '집에 일이 있어서',
      option4: '버스를 놓쳐서',
      answer: '길이 막힐 것을 예상해서',
    }
  ];

  // 하드코딩된 문제를 가져오는 함수
  useEffect(() => {
    const fetchQuestions = async () => {
      setQuestions(hardcodedQuestions); // 하드코딩된 문제 목록을 상태에 저장
      setLoading(false); // 로딩 완료
    };

    fetchQuestions();
  }, []);

  // 사용자가 선택한 답변을 저장하고 다음 문제로 넘어가는 핸들러
  const handleAnswerSelect = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.question_id]: selectedAnswer, // 현재 문제에 대한 답을 상태에 저장
    }));

    // 다음 문제로 넘어감
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit(); // 마지막 문제일 경우 채점하기
    }
  };

  // 이전 문제로 돌아가는 핸들러
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // 퀴즈 제출 핸들러
  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      if (answers[question.question_id] === question.answer) {
        correctCount++;
      }
    });

    const resultData = {
      correctCount: correctCount,
      totalQuestions: questions.length,
      score: (correctCount / questions.length) * 100,
    };

    setResult(resultData); // 결과를 상태에 저장
  };

  // 대화 텍스트에서 대화 부분만 추출하는 함수
  const extractDialogue = (text) => {
    const match = text.match(/"(.*?)"/); // 대화 부분을 " " 안에서 추출
    return match ? match[1] : ''; // 대화가 있으면 반환, 없으면 빈 문자열
  };

  // 이름을 기준으로 대사를 나누고, 빈 대사는 제거하는 함수 (중복 방지)
  const formatDialogue = (dialogue) => {
    const regex = /([가-힣]+):/g; // 한글 이름 뒤에 ":"이 나오는 패턴을 찾음
    let lines = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(dialogue)) !== null) {
      const person = match[1]; // 인물 이름 추출
      const startIndex = match.index + match[0].length; // 대사 시작 위치

      // 이전 대사를 추가
      if (lastIndex !== 0) {
        const text = dialogue.slice(lastIndex, match.index).trim();
        if (text) {
          lines[lines.length - 1].text += ` ${text}`; // 이전 인물의 대사에 추가
        }
      }

      // 새로운 대사 추가
      lastIndex = startIndex;
      lines.push({ person, text: '' });
    }

    // 마지막 대사 추가
    const lastText = dialogue.slice(lastIndex).trim();
    if (lastText && lines.length > 0) {
      lines[lines.length - 1].text += ` ${lastText}`;
    }

    return lines;
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
    return (
      <>
        <HeaderBar />
        <p>No questions available.</p>
      </>
    );
  }

  // 현재 문제를 가져오기
  const currentQuestion = questions[currentQuestionIndex];

  // 대화 부분 추출
  const dialogue = extractDialogue(currentQuestion.question);
  // 대화 가공
  const dialogueLines = formatDialogue(dialogue);

  return (
    <>
      <HeaderBar />
      <div>
        <h1>문해력 퀴즈</h1>
        {result ? (
          <div className="result-block">
            <h2>결과</h2>
            <p>맞춘 문제: {result.correctCount}</p>
            <p>전체 문제 수: {result.totalQuestions}</p>
            <p>점수: {result.score}%</p>
          </div>
        ) : (
          <div key={currentQuestion.question_id} className="question-block">
            {/* 질문 텍스트 출력 */}
            <p><strong>질문:</strong> {currentQuestion.question.split(' "')[0]}</p>
            {/* 대화 내용 출력 */}
            <div className="dialogue">
              {dialogueLines.map((line, index) => (
                <p key={index}><strong>{line.person}:</strong> {line.text}</p>
              ))}
            </div>
            <div className="options">
              {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
                <div key={index} className="option" onClick={() => handleAnswerSelect(option)}>
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;