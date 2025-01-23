import { FaStar } from "react-icons/fa";
import { DetailTopDiv } from "./serviceDetail";

const DetailTop = () => {
  return (
    <DetailTopDiv>
      <div className="inner">
        <em>카테고리 > 청소</em>
        <h1>청소 랭킹 1위 잡던어워즈 KS 3년 연속 1위 수상</h1>
        <div className="companyInfo">
          <div className="logo"></div>
          <div className="txt">
            <h3>
              지구컴스 <em>09:00 - 18:00</em>
            </h3>
            <b>대전 서구 둔산남로 180번길 15 3층 지구컴스</b>
          </div>
        </div>
        <div className="desc">
          <div className="box">
            <b>Job_Done 횟수</b>
            <div>5000회</div>
          </div>
          <div className="box">
            <b>리뷰</b>
            <div className="countStar">
              <FaStar />
              <em>4.2</em>
              <span>(7500)</span>
            </div>
          </div>
          <div className="box">
            <b>경력</b>
            <div>5년</div>
          </div>
        </div>
      </div>
    </DetailTopDiv>
  );
};

export default DetailTop;
