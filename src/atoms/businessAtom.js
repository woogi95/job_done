import { atom } from "recoil";

export const businessInfo = atom({
  key: "businessInfo",
  default: {
    userId: 1,
    businessNum: "12245678910",
    businessName: "싹 박멸해",
    address: "만경관근처",
    serviceTypeId: 1,
    busiCreatedAt: "2019.06.08",
    tel: "0533836669",
  },
});
