import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  commentsBox,
  reviewIdState,
  reviewListState,
} from "../../../atoms/reviewAtom";
import { Form, Input } from "antd";
import axios from "axios";

const ReviewView = () => {
  const [reviewDatas, setReviewDatas] = useRecoilState(reviewListState);
  const [commentBox, setCommentBox] = useRecoilState(commentsBox);
  const [reviewComment, setReviewComment] = useState(false);
  const [reviewIds, setReviewIds] = useRecoilState(reviewIdState);

  const reviewData = async () => {
    try {
      const res = await axios.get(
        // `/api/review?businessId=${busiId}&page=1&size=30`,
        `/api/review?businessId=2&page=1&size=30`,
      );

      if (res) {
        const formattedData = res.data.resultData.map((item, index) => ({
          reviewId: item.reviewId,
          id: index + 1, // 행 번호 추가 (1부터 시작)
          userName: item.name,
          contents: item.contents, // 예시 내용
          createdAt: item.createdAt,
          score: item.score,
          comment: item.comment.contents,
          replyStatus: item.comment,
        }));
        // console.log(formattedData);
        const oneData = formattedData.find(item => item.reviewId === reviewIds);
        setReviewDatas(oneData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const initData = {
    reviewId: reviewIds,
    contents: reviewDatas.comment,
  };
  // console.log(reviewDatas);
  const isComments = reviewDatas.comment ? true : false;

  const commentResister = () => {
    setReviewComment(true);
  };
  useEffect(() => {
    reviewData();
  });
  return (
    <div style={{ display: "block", padding: 10 }}>
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
        <div style={{ marginBottom: 20 }}>{reviewDatas.userName}님의 리뷰</div>
        {/* 평점,날짜 */}
        <div></div>
      </div>
      {/* 사진 */}
      <div style={{ display: "flex" }}></div>
      {/* 유저리뷰 */}
      <div style={{ display: "block" }}>
        {/* 리뷰 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            minHeight: "300px",
            border: "2px solid gray",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          {reviewDatas.contents}
        </div>
        {/* 답글등록 버튼 */}
        <div>
          {isComments ? (
            <div>
              <h1>답글</h1>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "300px",
                  border: "2px solid gray",
                  borderRadius: 2,
                  backgroundColor: "white",
                  gap: "5px",
                }}
              >
                {reviewDatas.comment}
              </div>
              <button
                onClick={() => {
                  commentResister();
                }}
              >
                답글수정
              </button>
            </div>
          ) : (
            <button onClick={() => {}}>답글 등록</button>
          )}
        </div>
      </div>
      {/* 답글등록 */}
      {reviewComment ? (
        <div>
          {/* 답글입력 */}
          <Form
            initialValues={initData}
            onFinish={onsubmit}
            style={{ width: "100%" }}
          >
            <Form.Item name={"contents"}>
              <Input />
            </Form.Item>
          </Form>
          {/* 삭제버튼/ 등록,수정 */}
          <div>
            <butoon></butoon>
            <butoon></butoon>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewView;
