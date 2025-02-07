import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  commentsBox,
  reviewIdState,
  reviewListState,
  reviewPicsList,
} from "../../../atoms/reviewAtom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { loginApi } from "../../../apis/login";
import { StarTotalDiv } from "../../../components/serviceDetail/serviceDetail";
import { FaStar, FaStarHalf } from "react-icons/fa";
import "./reviewview.css";
const ReviewView = () => {
  const BASE_URL = "http://112.222.157.156:5224";
  const [reviewDatas, setReviewDatas] = useRecoilState(reviewListState);
  const [reviewPicsData, setReviewPicsData] = useRecoilState(reviewPicsList);
  const [commentBox, setCommentBox] = useRecoilState(commentsBox);
  const [reviewComment, setReviewComment] = useState(false);
  const [reviewIds, setReviewIds] = useRecoilState(reviewIdState);

  // console.log(localStorage.getItem("businessId"));
  // 리뷰 댓글 삭제
  // console.log(reviewIds);
  const deleteComment = async () => {
    try {
      const res = await loginApi.delete(
        `/api/review/commnet?reviewId=${reviewIds}`,
      );
    } catch (error) {
      console.log(error);
    }
  };
  // 별점
  // 별점 렌더링
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
  // 등록
  const onSubmit = async data => {
    const commentReview = {
      reviewId: reviewIds,
      contents: data.contents,
    };

    try {
      const res = await loginApi.post("/api/review/comment", commentReview);

      setReviewDatas(prev => ({
        ...prev,
        comment: data.contents,
      }));
      setReviewComment(false);
    } catch (error) {
      console.log(error);
    }
  };
  const oneData = reviewDatas.find(item => item.reviewId === reviewIds);
  const picData = reviewPicsData.find(item => item.reviewId === reviewIds);
  const busiReview = oneData.replyStatus;

  console.log(picData);
  console.log(busiReview);
  console.log(oneData);
  const initData = {
    reviewId: reviewIds,
    contents: reviewDatas.comment === "" ? "" : reviewDatas.comment,
  };
  // console.log(reviewDatas);
  const isComments = reviewDatas.comment === "" ? false : true;

  // 사진 관리

  const commentResister = () => {
    setReviewComment(true);
  };
  useEffect(() => {
    // const busiId = Number(localStorage.getItem("businessId"));
    // reviewData(busiId, reviewIds);
  });
  useEffect(() => {});
  return (
    <div style={{ display: "block", padding: 10, backgroundColor: "white" }}>
      {/* 유저이름, 평점,날짜 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100",
          fontSize: "20",
        }}
      >
        {/* 유저이름 */}
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            fontSize: "24px",
            height: 40,
            alignItems: "center",
            padding: 5,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              height: 40,
              alignItems: "center",
              padding: 5,
            }}
          >
            {oneData.userName}님의 리뷰
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 5,
              height: 40,
            }}
          >
            등록 날짜 : {oneData.createdAt}
          </div>
          <div style={{ display: "flex", alignItems: "center", padding: 5 }}>
            <div className="star-div">
              <div className="star-container">
                <p className="star">{renderStars(oneData.score)}</p>
                <span className="star-grade">
                  {/* {reviewList.length > 0 &&
                    reviewList[0]?.averageScore.toFixed(1)} */}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 평점,날짜 */}
        <div></div>
      </div>
      <hr style={{ marginBottom: 5, height: "5px" }} />
      {/* 사진 */}
      <div
        style={{
          display: "flex",
          marginBottom: 20,
          width: "100%",
          height: "150px",
        }}
      >
        {picData &&
          picData.pic
            .flat()
            .map((item, index) => (
              <img
                key={index}
                src={`${BASE_URL}${item}`}
                alt="리뷰사진"
                style={{ height: "150px", border: "2px solid black" }}
              />
            ))}
      </div>
      {/* 유저리뷰 */}
      <div style={{ display: "block" }}>
        {/* 리뷰 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            minHeight: "150px",
            border: "2px solid gray",
            borderRadius: 5,
            backgroundColor: "white",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {oneData.contents}
        </div>
        <hr style={{ marginBottom: 5, height: "5px" }} />
        {/* 답글등록 버튼 */}
        <div>
          {isComments ? (
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ marginBottom: 20, fontSize: 30 }}>답글</h1>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "150px",
                  border: "2px solid gray",
                  borderRadius: 5,
                  backgroundColor: "white",
                  marginBottom: 10,
                  lineHeight: 1.5,
                }}
              >
                {busiReview.contents}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <button
                  onClick={() => {
                    commentResister();
                  }}
                  style={{
                    width: 80,
                    fontSize: 20,
                    backgroundColor: "white",
                    height: 40,
                    border: "2px solid #d6d6d6",
                  }}
                >
                  답글 수정
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setReviewComment(true);
              }}
            >
              답글 등록
            </button>
          )}
        </div>
      </div>
      {/* 답글등록 */}
      {reviewComment ? (
        <div>
          {/* 답글입력 */}
          <Form
            initialValues={initData}
            onFinish={onSubmit}
            style={{ width: "100%" }}
          >
            <Form.Item name={"contents"}>
              <Input.TextArea style={{ minHeight: "200px" }} />
            </Form.Item>

            {/* 삭제버튼/ 등록,수정 */}
            <div>
              <div>
                <button>삭제</button>
              </div>
              <div>
                <Button htmlType="submit">등록</Button>
              </div>
            </div>
          </Form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewView;
