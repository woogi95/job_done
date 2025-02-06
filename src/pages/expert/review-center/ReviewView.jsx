import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  commentsBox,
  reviewIdState,
  reviewListState,
} from "../../../atoms/reviewAtom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { loginApi } from "../../../apis/login";

const ReviewView = () => {
  const [reviewDatas, setReviewDatas] = useRecoilState(reviewListState);
  const [commentBox, setCommentBox] = useRecoilState(commentsBox);
  const [reviewComment, setReviewComment] = useState(false);
  const [reviewIds, setReviewIds] = useRecoilState(reviewIdState);
  const busiId = Number(localStorage.getItem("businessId"));
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

  const onSubmit = async data => {
    const commentReview = {
      reviewId: reviewIds,
      contents: data.contents,
    };
    try {
      const res = await loginApi.post("/api/review/comment", commentReview);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const reviewData = async busiId => {
    try {
      const res = await loginApi.get(
        `/api/review?businessId=${busiId}&page=1&size=30`,
        // `/api/review?businessId=2&page=1&size=30`,
      );
      // console.log(res);
      if (res) {
        const formattedData = res.data.resultData;
        // console.log(formattedData);
        // console.log(reviewIds);
        const oneData = formattedData.find(item => item.reviewId === reviewIds);
        // console.log(oneData);
        setReviewDatas(oneData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reviewDatas);
  const initData = {
    reviewId: reviewIds,
    contents: reviewDatas.comment === "" ? "" : reviewDatas.comment,
  };
  // console.log(reviewDatas);
  const isComments = reviewDatas.comment === "" ? false : true;

  const commentResister = () => {
    setReviewComment(true);
  };
  useEffect(() => {
    const busiId = Number(localStorage.getItem("businessId"));

    reviewData(busiId);
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
            minHeight: "150px",
            border: "2px solid gray",
            borderRadius: 2,
            backgroundColor: "white",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {reviewDatas.contents}
        </div>
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
                  borderRadius: 2,
                  backgroundColor: "white",
                  marginBottom: 10,
                  lineHeight: 1.5,
                }}
              >
                {reviewDatas.comment}
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
