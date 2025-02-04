import { atom } from "recoil";

export const reviewListState = atom({
  key: "reviewListState",
  default: [
    {
      reviewId: 0,
      contents: "",
      score: 0,
      createdAt: "",
      userId: 0,
      name: "",
      writerPic: "",
      detailTypeName: "",
      pics: [""],
      comment: {
        commentId: 0,
        contents: "",
        createdAt: "",
        updatedAt: "",
        writerUserId: 0,
        name: "",
        writerPic: "",
      },
    },
  ],
});
