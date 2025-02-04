import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { reviewListState } from "../../../atoms/reviewAtom";
import "./index.css";

function Index() {
  const [reviewDatas, setReviewDatas] = useRecoilState(reviewListState);
  const [isSorted, setIsSorted] = useState(false);
  const [isScored, setIsScored] = useState(false);

  useEffect(() => {
    const reviewData = async () => {
      try {
        const res = await axios.get(`/api/review?businessId=2&page=1&size=30`);
        if (res) {
          const formattedData = res.data.resultData.map((item, index) => ({
            reviewId: item.reviewId,
            id: index + 1, // 행 번호 추가 (1부터 시작)
            userName: item.name,
            contents: item.contents, // 예시 내용
            createdAt: item.createdAt,
            score: item.score,
            replyStatus: item.comment ? "🔵" : <button>🔴</button>,
          }));
          setReviewDatas(formattedData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    reviewData();
  }, []);
  const toggleSort = () => {
    const sortedData = [...reviewDatas].sort(
      (a, b) =>
        isSorted
          ? new Date(a.createdAt) - new Date(b.createdAt) // 오래된 순
          : new Date(b.createdAt) - new Date(a.createdAt), // 최신순
    );

    setReviewDatas(sortedData);
    setIsSorted(!isSorted);
  };
  const scoreSort = () => {
    const scoredData = [...reviewDatas].sort(
      (a, b) =>
        isScored
          ? parseFloat(a.score) - parseFloat(b.score) // 낮은 점수 → 높은 점수 (오름차순)
          : parseFloat(b.score) - parseFloat(a.score), // 높은 점수 → 낮은 점수 (내림차순)
    );

    setReviewDatas(scoredData);
    setIsScored(!isScored);
  };
  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={toggleSort}>
          {isSorted ? "오래된 순 정렬" : "최신순 정렬"}
        </button>
        /
        <button onClick={scoreSort}>
          {isScored ? "평점 낮은 순" : "평점 높은 순"}
        </button>
      </div>
      <div>
        <table className="table-container">
          {/* 첫 번째 행 (테이블 헤더) */}
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>내용</th>
              <th>댓글 등록시간</th>
              <th>평점</th>
              <th>답글 여부</th>
            </tr>
          </thead>

          {/* 두 번째 행부터 불러온 데이터 매핑 */}
          <tbody>
            {reviewDatas.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userName}</td>
                <td>{item.contents}</td>
                <td>{item.createdAt}</td>
                <td>{item.score}</td>
                <td>{item.replyStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
