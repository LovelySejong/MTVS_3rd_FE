import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const storeTokens = (authorization) => {

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1];
    localStorage.setItem('token', token);
    console.log('토큰 저장 성공:', token);
  } else {
    console.error('Authorization 헤더에 토큰이 없습니다.');
  }
};

export const signup = async (nickName, email, password, confirmPassword) => {

  const signUpDTO = {
    nickName: nickName,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  }

  const res = await axios.post(`${baseURL}/auth/signup`, signUpDTO);

  return res.data;
};

export const login = async (email, password) => {

  console.log('Login 요청 전송 전')

  // authDTO 형식으로 요청 본문을 구성
  const loginDTO = {
    email: email,
    password: password
  };

  const res = await axios.post(`${baseURL}/auth/login`, loginDTO);

  // 헤더에서 토큰 정보 추출
  const token = res.headers['Authorization'] || res.headers['authorization'];

  console.log(res.headers);
  console.log('token: ' + token);

  storeTokens(token);

  return res.data;
};

export const logout = async () => {

  // 1. 로컬 스토리지에서 토큰과 리프레시 토큰 삭제
  localStorage.removeItem('token');
  console.log('로그아웃 성공: 로컬 스토리지에서 토큰 삭제');

  // 2. 서버에 로그아웃 요청 (선택 사항)
  try {
    await axios.post(`${baseURL}/auth/logout`);
    console.log('서버 로그아웃 성공');
  } catch (e) {
    console.error('서버 로그아웃 요청 중 에러 발생:', e);
  }
}