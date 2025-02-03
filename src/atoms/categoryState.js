import { atom } from "recoil";

export const categoryState = atom({
  key: "categoryState",
  default: [
    {
      categoryId: 0,
      categoryName: "",
    },
  ],
});

export const detailTypeState = atom({
  key: "detailTypeState",
  default: [
    {
      detailTypeId: 0,
      detailTypeName: "",
    },
  ],
});
