import axios from 'axios';

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

axiosInstance.interceptors.request.use(
  async (config) => {

    console.log("토큰 확인");

    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      // 토큰이 없을 경우 로그아웃 처리
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('토큰 없음');
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 토큰 관련 에러 처리
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    // 토큰 만료나 잘못된 토큰일 때 로그아웃 처리
    if (error.response?.data?.code === 'AUTH_001') {

      console.log('잘못된 토큰');

      localStorage.removeItem('token');
      
      alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
