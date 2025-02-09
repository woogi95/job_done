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

    // 기본 URL
    let url = "/api/business?";

    // categoryId가 있을 경우 쿼리 파라미터에 추가
    if (categoryId) {
      url += `categoryId=${categoryId}&`;
    }

    // detailTypeId가 있을 경우 쿼리 파라미터에 추가
    if (detailTypeId) {
      url += `detailTypeId=${detailTypeId}&`;
    }

    // sortType이 있을 경우 쿼리 파라미터에 추가
    if (sortType) {
      url += `sortType=${sortType}&`;
    }

    // regionId가 있을 경우 쿼리 파라미터에 추가
    if (regionId) {
      url += `regionId=${regionId}&`;
    }

    // 마지막 "&" 제거
    url = url.endsWith("&") ? url.slice(0, -1) : url;

    try {
      const response = await axios.get(url);
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
