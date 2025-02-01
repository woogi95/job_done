import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";

import parse from "html-react-parser";
import {
  CountStarCustomDiv,
  // CountStarDiv,
  DContsDiv,
  DetailContentsDiv,
  DetailLayout,
  PortfolioListItem,
  PortfolioSwiperDiv,
  ReviewDiv,
  StarTotalDiv,
  SummaryDiv,
} from "./serviceDetail";

// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

// import Portfolio from "../../pages/expert/management/Portfolio";
// import { NavLink } from "react-router-dom";
// icon
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaStar, FaStarHalf } from "react-icons/fa";
// 포트폴리오 아이콘
// import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import axios from "axios";
import { reviewListState } from "../../atoms/reviewAtom";

const DetailContents = () => {
  const [isFixed, setIsFixed] = useState(false); //nav 스크롤고정
  const [isLike, setIsLike] = useState(false); // 찜
  const [rating, setRating] = useState(4.2); // 별점
  const [activeLink, setActiveLink] = useState("about"); //링크 active
  const [reviewList, setReviewList] = useRecoilState(reviewListState);
  const businessDetail = useRecoilValue(businessDetailState);
  const navigate = useNavigate();
  const ToggleLike = e => {
    e.preventDefault();
    setIsLike(!isLike);
  };

  let businessId = 1;
  const [detailPicList, setDetailPicList] = useState([
    {
      businessId: 0,
      pic: "https://static.cdn.soomgo.com/upload/media/275dc588-abb6-4bac-827f-7808219b4a6b.jpg?webp=1",
    },
    {
      businessId: 0,
      pic: "https://static.cdn.soomgo.com/upload/media/275dc588-abb6-4bac-827f-7808219b4a6b.jpg?webp=1",
    },
    {
      businessId: 0,
      pic: "https://static.cdn.soomgo.com/upload/media/275dc588-abb6-4bac-827f-7808219b4a6b.jpg?webp=1",
    },
  ]);
  const getDetailPagePic = async () => {
    try {
      const res = await axios.get(
        `/api/business/pic/%7BbusinessId%7D?businessId=${businessId}`,
      );
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetailPagePic();
  }, []);
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

  const renderStars = () => {
    const fullStars = Math.floor(rating); // 채워진 별 개수
    const halfStar = rating % 1 >= 0.5; // 반쪽 별 여부
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 비어 있는 별 개수

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} color="#EAB838" />
        ))}
        {halfStar && <FaStarHalf key="half" color="#EAB838" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaStar key={`empty-${i}`} color="#E0E2E7" />
        ))}
      </>
    );
  };
  const handleLinkClick = id => {
    setActiveLink(id);
  };

  businessId = 2;
  const page = 1;
  const size = 5;
  // 리뷰
  const getReviewList = async () => {
    try {
      const res = await axios.get(
        `/api/review?businessId=${businessId}&page=${page}&size=${size}`,
      );
      console.log("reviewList", res.data.resultData);
      setReviewList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("reviewList--", reviewList);
  useEffect(() => {
    getReviewList();
  }, []);
  return (
    <DetailLayout>
      {/* 오른쪽 */}
      <DetailContentsDiv>
        {/* 메뉴 */}
        <nav style={{ position: isFixed ? "fixed" : "static" }}>
          <ul>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={1000}
                offset={-150}
                className={activeLink === "about" ? "active" : ""}
                onClick={() => handleLinkClick("about")}
              >
                업체소개
              </Link>
            </li>
            <li>
              <Link
                to="portfolio"
                smooth={true}
                duration={1000}
                offset={-150}
                className={activeLink === "portfolio" ? "active" : ""}
                onClick={() => handleLinkClick("portfolio")}
              >
                포트폴리오
              </Link>
            </li>
            <li>
              <Link
                to="reviews"
                smooth={true}
                duration={1000}
                offset={-150}
                className={activeLink === "reviews" ? "active" : ""}
                onClick={() => handleLinkClick("reviews")}
              >
                리뷰 7500
              </Link>
            </li>
          </ul>
        </nav>

        {/* 컨텐츠 */}
        <DContsDiv>
          <div className="box" id="about">
            <h2>업체소개</h2>
            <p>{parse(businessDetail.contents)}</p>
            {detailPicList.map((item, index) => (
              <img src={detailPicList[index].pic} alt="상품디테일사진" />
            ))}
          </div>
          <div className="box" id="portfolio">
            <h2>포트폴리오</h2>
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
                <SwiperSlide>
                  <PortfolioListItem>
                    <div className="imgbox">
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
          </div>
          <div className="box" id="reviews">
            <h2>리뷰</h2>
            <StarTotalDiv>
              <h4>{businessDetail.businessName}</h4>
              <div className="star-container">
                <p className="star">{renderStars()}</p>
                <span className="star-grade"> {rating.toFixed(1)}</span>
              </div>
            </StarTotalDiv>
            <ReviewDiv>
              <div className="rv-top">
                <h3>서비스 리뷰 7,500</h3>
                <div className="filter">별점 낮은순 +</div>
              </div>
              {/* 리뷰리스트 */}
              <div className="rv-list">
                {reviewList.map((item, index) => (
                  <div className="rv-item" key={index}>
                    {/* 유저리뷰 */}
                    <div className="user-rv">
                      <div className="user-info">
                        <div className="user-photo">
                          {item.writerPic ? (
                            <img src={`${item.writerPic}`} alt={item.name} />
                          ) : (
                            <div>업을때 기본프로필</div>
                          )}
                        </div>
                        <div className="desc">
                          <div>
                            {renderStars(item.score)}
                            <span className="star-grade">
                              {item.score.toFixed(1)}
                            </span>
                            <b>{item.createdAt.slice(0, 10)}</b>
                          </div>
                          <h4>{item.name.slice(0, 1)}**</h4>
                        </div>
                      </div>
                      <div className="comment">
                        <span>{item.contents}</span>
                        <div className="photo">
                          {item.pics &&
                            item.pics.slice(0, 2).map((pic, index) => (
                              <div key={index}>
                                <img src={`${pic}`} alt="review-img" />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/* 사장님댓글 */}
                    <div className="reply">
                      <div className="info">
                        <h4>{businessDetail.businessName}</h4> <b>20.01.24</b>
                      </div>
                      <div className="comment">
                        <span>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Eius voluptatem voluptate aut in, explicabo
                          excepturi. Autem incidunt earum explicabo tempore
                          distinctio alias quae animi enim sit numquam,
                          perferendis provident quibusdam.
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* 리뷰 */}
              </div>
            </ReviewDiv>
          </div>
        </DContsDiv>
      </DetailContentsDiv>
      {/* 왼쪽 */}
      <SummaryDiv
        style={{
          position: isFixed ? "fixed" : "absolute",
          top: isFixed ? "180px" : "60px",
        }}
      >
        <div className="inner">
          <div className="top">
            <h2>{businessDetail.businessName}</h2>
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
            <em>{businessDetail.scoreAvg} </em>
            <span>(7500)</span>
          </CountStarCustomDiv>
          <h3 className="tit">청소 랭킹 1위 잡던어워즈 KS 3년 연속 1위 수상</h3>
          <div className="desc">
            <div className="box">
              <b>Job_Done 횟수</b>
              <div>{businessDetail.serviceCount}회</div>
            </div>
            <div className="box">
              <b>경력</b>
              <div>5년</div>
            </div>
          </div>
          <div className="btn-area">
            <button
              onClick={() => {
                navigate("/reservation");
              }}
            >
              예약하기
            </button>
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
