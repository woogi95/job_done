import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// scroll
import { Link } from "react-scroll";
// parser
import parse from "html-react-parser";
// comp
import ContPortfolioList from "./ContPortfolioList";
import ContReview from "./Contreview";
import PfPopup from "./PfPopup";
//styled
import {
  CountStarCustomDiv,
  DContsDiv,
  DetailContentsDiv,
  DetailLayout,
  SummaryDiv,
} from "./serviceDetail";
// icon
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
// recoil
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";

const DetailContents = () => {
  const [isFixed, setIsFixed] = useState(false); //nav 스크롤고정
  const [isLike, setIsLike] = useState(false); // 찜

  const [activeLink, setActiveLink] = useState("about"); //링크 active

  const businessDetail = useRecoilValue(businessDetailState);
  const navigate = useNavigate();
  const ToggleLike = e => {
    e.preventDefault();
    setIsLike(!isLike);
  };

  const businessId = 1;
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

  const handleLinkClick = id => {
    setActiveLink(id);
  };

  // 문의하기
  const openWindow = () => {
    const width = 410;
    const height = 570;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(
      "/service/contactus",
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes`,
    );
  };
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
              <img
                key={businessDetail.businessId}
                src={detailPicList[index].pic}
                alt="상품디테일사진"
              />
            ))}
          </div>
          <div className="box" id="portfolio">
            <h2>포트폴리오</h2>
            <ContPortfolioList />
          </div>
          <div className="box" id="reviews">
            <h2>리뷰</h2>
            <ContReview />
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
            <button onClick={openWindow}>문의하기</button>
          </div>
        </div>
      </SummaryDiv>
      <PfPopup />
    </DetailLayout>
  );
};

export default DetailContents;
