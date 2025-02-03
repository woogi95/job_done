import { atom } from "recoil";
// 기업 정보 폼
export const businessInfo = atom({
  key: "businessInfo",
  default: {
    userId: 0,
    businessNum: "",
    businessName: "",
    address: "",
    detailTypeId: "",
    busiCreatedAt: "2019.06.08",
    tel: "0533836669",
    paper: "",
  },
});
// 사업자 중복확인 모달창
export const numDubCheck = atom({
  key: "numDubCheck",
  default: false,
});
// 경고 메세지
export const checkMsg = atom({
  key: "checkMsg",
  default: true,
});

export const businessDInfo = atom({
  key: "businessDInfo",
  default: {
    logo: "string",
    detailTypeId: 0,
    detailTypeName: "string",
    businessId: 0,
    businessName: "string",
    title: "string",
    scoreAvg: 0,
    price: 0,
    like: 0,
    address: "string",
    serviceCount: 0,
    openingTime: "string",
    closingTime: "string",
    busiCreatedAt: "string",
    contents: "string",
  },
});
