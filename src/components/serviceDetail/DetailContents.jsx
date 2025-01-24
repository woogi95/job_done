import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import {
  CountStarDiv,
  DetailContentsDiv,
  DetailLayout,
  SummaryDiv,
} from "./serviceDetail";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

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
        <div className="cont">
          <div id="about">
            <h2>업체소개</h2>
            <p>여기에 업체소개 내용</p>
          </div>
          <div id="portfolio">
            <h2>포트폴리오</h2>
            <p>여기에 포트폴리오 내용</p>
          </div>
          <div id="reviews">
            <h2>리뷰</h2>
            <p>여기에 리뷰 내용</p>
          </div>
        </div>
      </DetailContentsDiv>
      <SummaryDiv style={{ position: isFixed ? "fixed" : "static" }}>
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
        <CountStarDiv>
          <FaStar />
          <em>4.2</em>
          <span>(7500)</span>
        </CountStarDiv>
        <h3 className="tit">청소 랭킹 1위 잡던어워즈 KS 3년 연속 1위 수상</h3>
        <div>
          <div className="box">
            <b>Job_Done 횟수</b>
            <div>5000회</div>
          </div>
          <div className="box">
            <b>경력</b>
            <div>5년</div>
          </div>
        </div>
        <button>예약하기</button>
        <a href="/" target="_blank">
          문의하기
        </a>
      </SummaryDiv>
    </DetailLayout>
  );
};

export default DetailContents;
