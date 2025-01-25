import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import {
  CountStarCustomDiv,
  // CountStarDiv,
  DContsDiv,
  DetailContentsDiv,
  DetailLayout,
  PortfolioListItem,
  PortfolioSwiperDiv,
  SummaryDiv,
} from "./serviceDetail";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// 포트폴리오 아이콘
import { FaChevronRight } from "react-icons/fa";

// import required modules
import { Navigation } from "swiper/modules";
import Portfolio from "../../pages/expert/management/Portfolio";

const DetailContents = () => {
  const [isFixed, setIsFixed] = useState(false); //nav 스크롤고정
  // 찜
  const [isLike, setIsLike] = useState(false);
  const ToggleLike = e => {
    e.preventDefault();
    setIsLike(!isLike);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 243 && !isFixed) {
        setIsFixed(true);
        console.log(window.scrollY);
      } else if (scrollY <= 243 && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  // swiper
  const swiperRef = useRef(null);
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <DetailLayout>
      <DetailContentsDiv>
        {/* 메뉴 */}
        <nav style={{ position: isFixed ? "fixed" : "static" }}>
          <ul>
            <li>
              <Link to="about" smooth={true} duration={500}>
                업체소개
              </Link>
            </li>
            <li>
              <Link to="portfolio" smooth={true} duration={500}>
                포트폴리오
              </Link>
            </li>
            <li>
              <Link to="reviews" smooth={true} duration={500}>
                리뷰 7500
              </Link>
            </li>
          </ul>
        </nav>

        {/* 콘텐츠 */}
        <DContsDiv>
          <div className="box" id="about">
            <h2>업체소개</h2>
            <p>
              여기에 업체소개 내용 - Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Eveniet laborum iste ad officiis, tempora
              maiores a consectetur eius omnis deleniti aperiam ut incidunt
              possimus molestias soluta quasi quidem facere nam adipisci ipsa
              velit expedita temporibus voluptatum fugiat. Velit quam quos vero
              voluptatem dicta veniam, nam minus, distinctio ullam nihil porro.
            </p>
            <img
              src="https://static.cdn.soomgo.com/upload/media/275dc588-abb6-4bac-827f-7808219b4a6b.jpg?webp=1"
              alt="사진"
            />
            <img
              src="https://static.cdn.soomgo.com/upload/media/275dc588-abb6-4bac-827f-7808219b4a6b.jpg?webp=1"
              alt="사진"
            />
            <img
              src="https://static.cdn.soomgo.com/upload/media/275dc588-abb6-4bac-827f-7808219b4a6b.jpg?webp=1"
              alt="사진"
            />
          </div>
          <div className="box" id="portfolio">
            <h2>포트폴리오</h2>
            <PortfolioSwiperDiv>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                onSwiper={swiper => {
                  swiperRef.current = swiper;
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <PortfolioListItem>
                    <div className="imgbox">
                      <img
                        src="https://static.cdn.soomgo.com/upload/portfolio/697dffc1-fc73-4761-8e3d-c4d3c2fc5513.png?h=320&w=320&webp=1"
                        alt=""
                      />
                    </div>
                    <h3>포트폴리오 타이틀1</h3>
                  </PortfolioListItem>
                </SwiperSlide>
                <SwiperSlide>
                  <PortfolioListItem>
                    <div className="imgbox">
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
                    <div className="imgbox">
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
                    <div className="imgbox">
                      <img
                        src="https://static.cdn.soomgo.com/upload/portfolio/697dffc1-fc73-4761-8e3d-c4d3c2fc5513.png?h=320&w=320&webp=1"
                        alt=""
                      />
                    </div>
                    <h3>포트폴리오 타이틀4</h3>
                  </PortfolioListItem>
                </SwiperSlide>
              </Swiper>
              <button onClick={handlePrev}>Prev</button>
              <button onClick={handleNext}>Next</button>
            </PortfolioSwiperDiv>
          </div>
          <div className="box" id="reviews">
            <h2>리뷰</h2>
            <p>여기에 리뷰 내용</p>
          </div>
        </DContsDiv>
      </DetailContentsDiv>
      <SummaryDiv
        style={{
          position: isFixed ? "fixed" : "absolute",
          top: isFixed ? "150px" : "15px",
          right: isFixed ? "16.5%" : "0",
        }}
      >
        <div className="inner">
          <div className="top">
            <h2>지구컴스</h2>
            <div
              className="like"
              onClick={e => {
                ToggleLike(e);
              }}
            >
              {isLike ? <BsHeartFill /> : <BsHeart style={{ color: "gray" }} />}
            </div>
          </div>
          <CountStarCustomDiv>
            <FaStar />
            <em>4.2 </em>
            <span>(7500)</span>
          </CountStarCustomDiv>
          <h3 className="tit">청소 랭킹 1위 잡던어워즈 KS 3년 연속 1위 수상</h3>
          <div className="desc">
            <div className="box">
              <b>Job_Done 횟수</b>
              <div>5000회</div>
            </div>
            <div className="box">
              <b>경력</b>
              <div>5년</div>
            </div>
          </div>
          <div className="btn-area">
            <button>예약하기</button>
            <a href="/" target="_blank">
              문의하기
            </a>
          </div>
        </div>
      </SummaryDiv>
    </DetailLayout>
  );
};

export default DetailContents;
