import { atom } from "recoil";
// 기업 정보 폼
export const businessInfo = atom({
  key: "businessInfo",
  default: {
    userId: 0,
    businessNum: "",
    businessName: "",
    address: "",
    serviceTypeId: "",
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

// 한 업체 조회(업체 디테일 정보)
export const businessDetailState = atom({
  key: "businessDetailState",
  default: {
    logo: "",
    detailTypeId: 0,
    detailTypeName: "",
    businessId: 0,
    businessName: "",
    title: "",
    scoreAvg: 0,
    price: 0,
    like: 0,
    address: "",
    serviceCount: 0,
    openingTime: "",
    closingTime: "",
    busiCreatedAt: "",
    contents: "",
  },
});
