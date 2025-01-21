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
  default: { name: "", email: "", upw: "", upwConfirm: "", phone: "" },
});
