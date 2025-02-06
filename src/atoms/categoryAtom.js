import { atom } from "recoil";

export const categoriesState = atom({
  key: "categoriesState",
  default: [],
});

export const detailTypesState = atom({
  key: "detailTypesState",
  default: [],
});

// 카테고리 찍을 때 나오는 숫자
export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: {
    categoryId: 1,
    categoryName: "",
  },
});

export const selectedDetailTypeState = atom({
  key: "selectedDetailTypeState",
  default: {
    detailTypeId: 1,
    detailTypeName: "",
  },
});
export const regionState = atom({
  key: "regionState",
  default: undefined,
});
