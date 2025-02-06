import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginUser } from "../../atoms/loginAtom";
import { likeStatusState } from "../../atoms/like";

const DetailContents = () => {
  const [isFixed, setIsFixed] = useState(false); //nav 스크롤고정
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);

  const [activeLink, setActiveLink] = useState("about"); //링크 active
  const [isPfDetailPop, setIsPfDetailPop] = useState(false);

  const businessDetail = useRecoilValue(businessDetailState);
  const loginUserState = useRecoilValue(loginUser);
  const userId = loginUserState.userId;
  const businessId = businessDetail.businessId;
  // console.log("`~~~~~~~~~~~~userId", userId);
  console.log("`~~~~~~~~~~~~businessId", businessDetail.businessId);
  const { id } = useParams();
  const navigate = useNavigate();
  const ToggleLike = async e => {
    e.preventDefault();
    setLikeStatus({
      ...likeStatus,
      isLiked: !likeStatus.isLiked,
      businessId,
    });

    try {
      // POST 요청 보내기
      const response = await axios.post("/api/like", {
        userId,
        businessId,
      });

      if (response.status === 200) {
        console.log("success:", response.data);
      } else {
        console.log("Failed:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 상세설명 사진들
  const [detailPicList, setDetailPicList] = useState([
    // {
    //   businessId: 0,
    //   pic: "https://static.cdn.soomgo.com/upload/media/275dc588-abb6-4bac-827f-7808219b4a6b.jpg?webp=1",
    // }
  ]);

  useEffect(() => {
    if (likeStatus.businessId) {
      setLikeStatus({
        ...likeStatus,
        isLiked: likeStatus.isLiked,
        businessId,
      });
    }
  }, [businessId, setLikeStatus]);

  const getDetailPagePic = async businessId => {
    try {
      // `/api/business/${businessId}?businessId=${businessId}`,
      const res = await axios.get(
        `/api/business/pic/${businessId}?businessId=${businessId}`,
      );
      console.log(res.data.resultData);
      setDetailPicList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(detailPicList);
  useEffect(() => {
    getDetailPagePic(id);
  }, [id]);

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
                리뷰 {businessDetail.reviewCount}
              </Link>
            </li>
          </ul>
        </nav>

        {/* 컨텐츠 */}
        <DContsDiv>
          <div className="box" id="about">
            <h2>업체소개</h2>
            <p>
              {businessDetail.contents ? parse(businessDetail.contents) : ""}
            </p>
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
            <ContPortfolioList setIsPfDetailPop={setIsPfDetailPop} />
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
              {likeStatus.isLiked ? (
                <BsHeartFill />
              ) : (
                <BsHeart style={{ color: "gray" }} />
              )}
            </div>
          </div>
          <CountStarCustomDiv>
            <FaStar />
            <em>{businessDetail.scoreAvg} </em>
            <span>({businessDetail.reviewCount})</span>
          </CountStarCustomDiv>
          <h3 className="tit">{businessDetail.title}</h3>
          <div className="desc">
            <div className="box">
              <b>Job_Done 횟수</b>
              <div>{businessDetail.serviceCount}회</div>
            </div>
            <div className="box">
              <b>경력</b>
              <div>{businessDetail.years}</div>
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
      <PfPopup
        setIsPfDetailPop={setIsPfDetailPop}
        isPfDetailPop={isPfDetailPop}
      />
    </DetailLayout>
  );
};

export default DetailContents;
