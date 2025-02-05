import axios from "axios";

// Axios 인스턴스 생성
export const loginApi = axios.create({
  withCredentials: true, // RefreshToken이 쿠키에 포함되도록 설정
});

// 모든 요청에 AccessToken 자동 포함
loginApi.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

loginApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // AccessToken 만료로 401 오류 발생 시
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // RefreshToken을 사용하여 새로운 AccessToken 요청
        const res = await axios.post(
          `api/user/access-token`,
          {},
          { withCredentials: true },
        );

        if (res.data.accessToken) {
          const newAccessToken = res.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          // 새로운 AccessToken으로 헤더 업데이트
          loginApi.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return loginApi(originalRequest);
        }
      } catch (err) {
        console.error("AccessToken 갱신 실패", err);
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  },
);
