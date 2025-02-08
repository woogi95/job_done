import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FilterDiv } from "./service";
import axios from "axios";
import { useRecoilValue } from "recoil";
import {
  regionState,
  selectedCategoryState,
  selectedDetailTypeState,
} from "../../atoms/categoryAtom";

const Filter = ({ setBusinessList }) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [sortType, setSortType] = useState("최신순");
  const options = ["최신순", "평점순", "주문많은순", "저가순"];

  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  const regionId = useRecoilValue(regionState);

  // const handleOptionCheck = item => {};

  const handleSortTypeClick = async (
    categoryId,
    detailTypeId,
    regionId,
    sortType,
  ) => {
    setSortType(sortType);
    setOptionOpen(false);
    try {
      const response = await axios.get(
        `/api/business?categoryId=${categoryId}&detailTypeId=${detailTypeId}&sortType=${sortType}`,
      );
      setBusinessList(response.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSortTypeClick(categoryId, detailTypeId, regionId, sortType);
  }, [categoryId, detailTypeId, regionId, sortType]);

  return (
    <FilterDiv>
      <div className="select" onClick={() => setOptionOpen(!optionOpen)}>
        <p>{sortType}</p>
        <IoIosArrowDown />
      </div>
      {optionOpen && (
        <div className="options">
          {options.map(item => (
            <div
              key={item}
              onClick={() => {
                handleSortTypeClick(categoryId, detailTypeId, regionId, item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </FilterDiv>
  );
};

export default Filter;
