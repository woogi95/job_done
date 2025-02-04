import { atom } from "recoil";

export const likeStatusState = atom({
  key: "likeStatusState",
  default: [
    {
      isLiked: false,
      businessId: 0,
    },
  ],
});
