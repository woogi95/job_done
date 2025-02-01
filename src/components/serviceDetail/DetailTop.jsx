import { FaStar } from "react-icons/fa";
import { CountStarDiv, DetailTopDiv } from "./serviceDetail";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";

const DetailTop = () => {
  const businessDetail = useRecoilValue(businessDetailState);
  console.log(businessDetail);
  if (!businessDetail) {
    return <p>업체 정보를 불러오는 중입니다...</p>;
  }
  return (
    <DetailTopDiv>
      <div className="inner">
        <em>
          카테고리 {">"} {businessDetail.detailTypeName}
        </em>
        <h1>{businessDetail.title}</h1>
        <div className="companyInfo">
          <div className="logo">
            <img src={businessDetail.logo} alt="로고" />
          </div>
          <div className="txt">
            <h3>
              {businessDetail.businessName}
              <em>
                {businessDetail.openingTime.slice(0, 5)} -{" "}
                {businessDetail.closingTime.slice(0, 5)}
              </em>
            </h3>
            <b>{businessDetail.address}</b>
          </div>
        </div>
        <div className="desc">
          <div className="box">
            <b>Job_Done 횟수</b>
            <div>{businessDetail.serviceCount}회</div>
          </div>
          <div className="box">
            <b>리뷰</b>
            <CountStarDiv>
              <FaStar />
              <em>{businessDetail.scoreAvg}</em>
              <span>(7500)</span>
            </CountStarDiv>
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
