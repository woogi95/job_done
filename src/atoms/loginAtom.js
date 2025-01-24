import { atom } from "recoil";

// 비밀번호 확인 상태
export const upwCheck = atom({
  key: "upwCheck",
  default: false,
});
// 비밀번호 틀림 모달창
export const isOpenModalUpw = atom({
  key: "isOpenModalUpw",
  default: false,
});

// 회원가입 폼 저장 상태
export const joinUserState = atom({
  key: "joinUserState",
  default: { name: "", email: "", upw: "", upwConfirm: "", phone: "", pic: "" },
});
// 이메일 중복확인 모달
export const emailDouble = atom({
  key: "emailDouble",
  default: false,
});
// 이메일 인증완료 모달
export const openModalEmail = atom({
  key: "openModalEmail",
  default: false,
});

// 이메일 인증 인풋 시간
export const countDownCheck = atom({
  key: "countDownCheck",
  default: 180,
});

// 프로필사진 관리
export const profilFile = atom({
  key: "profilFile",
  default: null,
});

// 로그인 상태 저장
export const isLoginState = atom({
  key: "isLoginState",
  default: {
    isLogind: false,
    userId: "",
  },
});
