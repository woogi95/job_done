import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { DetailContentsDiv, DetailLayout, SummaryDiv } from "./serviceDetail";

const DetailContents = () => {
  const [isFixed, setIsFixed] = useState(false); //nav 스크롤고정

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
        업체요약박스
      </SummaryDiv>
    </DetailLayout>
  );
};

export default DetailContents;
