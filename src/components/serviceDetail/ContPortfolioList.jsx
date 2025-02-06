import React, { useEffect, useRef, useState } from "react";
import {
  selectedCategoryState,
  selectedDetailTypeState,
} from "../../atoms/categoryAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { PortfolioListState } from "../../atoms/portfolioAtom";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PortfolioListItem, PortfolioSwiperDiv } from "./serviceDetail";
// import required modules
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";

const ContPortfolioList = ({ setIsPfDetailPop }) => {
  const { id } = useParams();
  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  const [portfolioListState, setPortfolioListState] =
    useRecoilState(PortfolioListState);
  const portfolioList = useRecoilValue(PortfolioListState);
  const getPortFolioList = async (categoryId, detailTypeId, businessId) => {
    try {
      // /api/portfolio?categoryId=1&detailTypeId=1&businessId=1
      const res = await axios.get(
        `/api/portfolio?categoryId=${categoryId}&detailTypeId=${detailTypeId}&businessId=${businessId}`,
      );
      console.log(res.data.resultData);
      setPortfolioListState(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPortFolioList(categoryId, detailTypeId, id);
  }, [categoryId, detailTypeId, id]);
  console.log("portfolioList", portfolioList);
  // swiper
  const swiperRef = useRef(null);
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };
  return (
    <PortfolioSwiperDiv>
      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <PortfolioListItem>
            <div
              className="imgbox"
              onClick={() => {
                setIsPfDetailPop(true);
              }}
            >
              <img src={portfolioList.isThumnail} alt="포트폴리오" />
            </div>
            <h3>{portfolioList.title}</h3>
          </PortfolioListItem>
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioListItem>
            <div
              className="imgbox"
              onClick={() => {
                setIsPfDetailPop(true);
              }}
            >
              <img
                src="https://static.cdn.soomgo.com/upload/portfolio/697dffc1-fc73-4761-8e3d-c4d3c2fc5513.png?h=320&w=320&webp=1"
                alt=""
              />
            </div>
            <h3>포트폴리오 타이틀2</h3>
          </PortfolioListItem>
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioListItem>
            <div
              className="imgbox"
              onClick={() => {
                setIsPfDetailPop(true);
              }}
            >
              <img
                src="https://static.cdn.soomgo.com/upload/portfolio/697dffc1-fc73-4761-8e3d-c4d3c2fc5513.png?h=320&w=320&webp=1"
                alt=""
              />
            </div>
            <h3>포트폴리오 타이틀3</h3>
          </PortfolioListItem>
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioListItem>
            <div
              className="imgbox"
              onClick={() => {
                setIsPfDetailPop(true);
              }}
            >
              <img
                src="https://static.cdn.soomgo.com/upload/portfolio/697dffc1-fc73-4761-8e3d-c4d3c2fc5513.png?h=320&w=320&webp=1"
                alt=""
              />
            </div>
            <h3>포트폴리오 타이틀4</h3>
          </PortfolioListItem>
        </SwiperSlide>
        <SwiperSlide>
          <PortfolioListItem>
            <div
              className="imgbox"
              onClick={() => {
                setIsPfDetailPop(true);
              }}
            >
              <img
                src="https://static.cdn.soomgo.com/upload/portfolio/697dffc1-fc73-4761-8e3d-c4d3c2fc5513.png?h=320&w=320&webp=1"
                alt=""
              />
            </div>
            <h3>포트폴리오 타이틀5</h3>
          </PortfolioListItem>
        </SwiperSlide>
      </Swiper>
      <div className="btn-area">
        <button className="prev" onClick={handlePrev}>
          Prev
        </button>
        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </PortfolioSwiperDiv>
  );
};

export default ContPortfolioList;
