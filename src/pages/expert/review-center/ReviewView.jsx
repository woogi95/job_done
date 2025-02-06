import React from "react";
import { useRecoilState } from "recoil";
import { reviewListState } from "../../../atoms/reviewAtom";

const ReviewView = () => {
  const [reviewData, setReviewData] = useRecoilState(reviewListState);
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
        <div></div>
        {/* 평점,날짜 */}
        <div></div>
      </div>
      {/* 사진 */}
      <div style={{ display: "flex" }}></div>
      {/* 유저리뷰 */}
      <div>
        {/* 리뷰 */}
        {/* 답글등록 버튼 */}
      </div>
      {/* 답글등록 */}
      <div>
        {/* 답글입력 */}
        <div></div>
        {/* 삭제버튼/ 등록,수정 */}
        <div>
          <butoon></butoon>
          <butoon></butoon>
        </div>
      </div>
    </div>
  );
};

export default ReviewView;
