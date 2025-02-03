import { atom } from "recoil";

export const categoriesState = atom({
  key: "categoriesState",
  default: [],
});

export const detailTypesState = atom({
  key: "detailTypesState",
  default: {},
});

// 카테고리 찍을 때 나오는 숫자
export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: null,
});

export const selectedDetailTypeState = atom({
  key: "selectedDetailTypeState",
  default: null,
});
