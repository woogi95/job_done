import { useEffect, useState } from "react";
import { reviewListState } from "../../atoms/reviewAtom";
import { ReviewDiv, StarTotalDiv } from "./serviceDetail";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import axios from "axios";

// parser
import parse from "html-react-parser";

const ContReview = () => {
  const [rating, setRating] = useState(0); // 별점
  const [reviewList, setReviewList] = useRecoilState(reviewListState);
  const businessDetail = useRecoilValue(businessDetailState);

  const businessId = businessDetail.businessId;
  const page = 1;
  const size = 5;
  // 리뷰
  const getReviewList = async businessId => {
    try {
      const res = await axios.get(
        `/api/review?businessId=${businessId}&page=${page}&size=${size}`,
      );
      console.log("---------------reviewList@@@", res.data.resultData);
      setReviewList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("dighdkfoasdas", reviewList[0].averageScore);
  // 별점
  const renderStars = score => {
    const fullStars = Math.floor(score); // 채워진 별 개수
    const halfStar = score % 1 >= 0.5; // 반쪽 별 여부
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

  // console.log("reviewList--", reviewList);
  useEffect(() => {
    getReviewList(businessId);
  }, [businessId]);

  return (
    <>
      <StarTotalDiv>
        <h4>{businessDetail.businessName}</h4>
        <div className="star-container">
          <p className="star"> {renderStars(reviewList[0].averageScore)}</p>
          <span className="star-grade">
            {reviewList.length > 0 && reviewList[0].averageScore.toFixed(1)}
          </span>
        </div>
      </StarTotalDiv>
      <ReviewDiv>
        <div className="rv-top">
          <h3>서비스 리뷰 {businessDetail.reviewCount}</h3>
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
                      <img style={{ backgroundColor: "#34c5f0" }}></img>
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
                  <div className="logo-container">
                    {/* 로고 */}
                    {item.comment && item.comment.logo ? (
                      <img
                        src={item.comment.logo}
                        alt="logo"
                        className="logo"
                      />
                    ) : (
                      <div className="logo-placeholder">👤</div>
                    )}
                  </div>
                  {/* 업체이름 , 작성일 */}
                  {item.comment && item.comment.name ? (
                    <h4>{item.comment.name}</h4>
                  ) : (
                    <h4>사장님</h4>
                  )}
                  <b>
                    {item.comment
                      ? item.comment.createdAt.slice(0, 10)
                      : "없음"}
                  </b>
                </div>
                <div className="comment">
                  {/* 업체 댓글 내용 */}
                  <span>
                    {item.comment ? parse(item.comment.contents) : <></>}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* 리뷰 */}
        </div>
      </ReviewDiv>
    </>
  );
};

export default ContReview;
