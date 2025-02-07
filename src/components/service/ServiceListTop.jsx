import { IoSearch } from "react-icons/io5";
import { PageTopDiv } from "./service";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCategoryState,
  selectedDetailTypeState,
  regionState,
} from "../../atoms/categoryAtom";
// import { NavLink } from "react-router-dom";

const ServiceListTop = ({
  businessList,
  setBusinessList,
  setFilteredBusinessList,
}) => {
  const [regionId, setRegionId] = useRecoilState(regionState); // 전체 기본
  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);

  const handleRegionClick = async (categoryId, detailTypeId, regionId) => {
    console.log(categoryId, detailTypeId, regionId);
    setRegionId(regionId);

    try {
      let url = `/api/business?categoryId=${categoryId}`;
      if (detailTypeId) {
        url += `&detailTypeId=${detailTypeId}`;
      }
      if (regionId) {
        url += `&regionId=${regionId}`;
      }
      const res = await axios.get(url);
      console.log(res.data.resultData);
      setBusinessList(res.data.resultData);
      setFilteredBusinessList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRegionClick(categoryId, detailTypeId, regionId);
  }, [categoryId, detailTypeId, regionId]);
  return (
    <PageTopDiv>
      <div className="inner">
        <h1>청소</h1>
        <span>청소 {">"} 원룸</span>
        <ul>
          <li>
            <button
              to="/service"
              onClick={() => handleRegionClick(categoryId, detailTypeId)}
              className={regionId === undefined ? "active" : ""}
            >
              전체
            </button>
          </li>
          <li>
            <button
              onClick={() => handleRegionClick(categoryId, detailTypeId, 1)}
              className={regionId === 1 ? "active" : ""}
            >
              대구
            </button>
          </li>
          <li>
            <button
              onClick={() => handleRegionClick(categoryId, detailTypeId, 2)}
              className={regionId === 2 ? "active" : ""}
            >
              부산
            </button>
          </li>
          <li>
            <button
              onClick={() => handleRegionClick(categoryId, detailTypeId, 3)}
              className={regionId === 3 ? "active" : ""}
            >
              포항
            </button>
          </li>
          <li>
            <button
              onClick={() => handleRegionClick(categoryId, detailTypeId, 4)}
              className={regionId === 4 ? "active" : ""}
            >
              경주
            </button>
          </li>
          <li>
            <button
              onClick={() => handleRegionClick(categoryId, detailTypeId, 5)}
              className={regionId === 5 ? "active" : ""}
            >
              구미
            </button>
          </li>
        </ul>
        <div className="search">
          <em>
            <IoSearch />
          </em>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            // onChange={handleSearchChange}
          />
          <button>검색</button>
        </div>
      </div>
    </PageTopDiv>
  );
};
export default ServiceListTop;
