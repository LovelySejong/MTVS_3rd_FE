import axiosInstance from "../axios/AxiosInstance";

export const getUserProfile = async () => {
    try {
      // const response = await axiosInstance.get('/user/profile'); // axiosInstance 사용
    //   if (response?.success && response?.response?.nickName) {
    //     setNickname(response.response.nickName); // 받아온 닉네임을 상태에 저장
    //   } else {
    //     console.error('Invalid profile response:', response);
    //   }
      return "nickName";
    } catch (error) {
      console.error('Failed to fetch member profile:', error);
    }
}