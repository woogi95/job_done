import React, { useEffect, useRef, useState } from "react";
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
import { businessDetailState } from "../../atoms/businessAtom";
import axios from "axios";

const ContPortfolioList = ({ handleImageClick }) => {
  const { id } = useParams();
  const BASE_URL = "http://112.222.157.156:5224";
  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;

  const [portfolioListState, setPortfolioListState] =
    useRecoilState(PortfolioListState);
  const portfolioList = useRecoilState(PortfolioListState);
  const getPortFolioList = async businessId => {
    console.log("이거", businessId);
    try {
      // /api/portfolio?categoryId=1&detailTypeId=1&businessId=1
      const res = await axios.get(`/api/portfolio?businessId=${businessId}`);
      console.log("===================", res.data.resultData);
      setPortfolioListState(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleImageClick = portfolioId => {
  //   setSelectedPortfolioId(portfolioId);
  //   setIsPfDetailPop(true);
  // };

  useEffect(() => {
    getPortFolioList(businessId);
    console.log("portfolioList", portfolioList);
  }, [businessId]);

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
        {portfolioListState.map(portfolio => (
          <SwiperSlide key={portfolio.portfolioId}>
            <PortfolioListItem>
              <div
                className="imgbox"
                onClick={() => handleImageClick(portfolio.portfolioId)}
              >
                <img
                  src={`${BASE_URL}${portfolio.isThumnail}`}
                  alt={portfolio.title}
                />
              </div>
              <h3>{portfolio.title}</h3>
            </PortfolioListItem>
          </SwiperSlide>
        ))}
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
