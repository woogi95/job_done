import React, { useEffect, useState } from "react";
import {
  BtnAreaDiv,
  FormDiv,
  PaperContDiv,
  PapersDiv,
  ReservationPaperContDiv,
} from "./papers";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { papersState } from "../../atoms/businessAtom";

const UserReservation = () => {
  // const [estimateInfo, setEstimateInfo] = useState({});
  const [estimateInfo, setEstimateInfo] = useRecoilValue(papersState);
  const getEstimate = async () => {
    try {
      const res = await axios.get("/api/service/detail?serviceId=1");
      // console.log(res.data.resultData);
      setEstimateInfo(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEstimate();
  }, []);
  console.log(estimateInfo);
  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <ReservationPaperContDiv>
          <h2 className="tit">
            업체명에서
            <strong>
              견적·예약 신청이
              <br />
            </strong>
            접수 되었습니다.
          </h2>
          <span className="description">
            잡던에서 예약 신청해 주셔서 감사 드립니다. <br />
            업체에서 고객님께서 신청하신 예약신청서를 확인후 상세 견적을 내어
            드립니다. <br />
            예약 내역 및 견적 내용은 <em>마이페이지>예약현황</em>에서 확인하실
            수 있습니다.
            <br /> 문의 사항이 있을시, "문의하기"를 통해 연락 주시길 바랍니다.
            <br />
            <b>
              견적서를 받은 후 결제가 지연될 경우, 해당 견적은 취소될 수
              있습니다.
            </b>
          </span>
          <FormDiv>
            <div className="company-info">
              <h3>예약업체정보</h3>
              <ul>
                <li>
                  <p>상호명</p>
                  <span>{estimateInfo.businessName}</span>
                </li>
                <li>
                  <p>분류</p>
                  <span>{estimateInfo.categoryName}</span>
                </li>
                <li>
                  <p>주소</p>
                  <span>----</span>
                </li>
              </ul>
            </div>
            <div className="user-info">
              <h3>예약자 정보</h3>
              <ul>
                <li>
                  <p>예약자</p>
                  <span>{estimateInfo.reservedName}</span>
                </li>
                <li>
                  <p>연락처</p>
                  <span>{estimateInfo.userPhone}</span>
                </li>
                <li>
                  <p>주소</p>
                  <span>{estimateInfo.address}</span>
                </li>
              </ul>
            </div>
            <div className="estimate-info">
              <h3>예약신청 내용</h3>
              <ul>
                <li>
                  <p>신청일</p>
                  <span>{estimateInfo.createdAt}</span>
                </li>
                <li>
                  <p>예약방문날짜</p>
                  <span>----</span>
                </li>
                <li>
                  <p>평수</p>
                  <span>----</span>
                </li>
                <li className="option">
                  <p>옵션</p>
                  <ul>
                    <li>
                      <p>
                        항목명1 - <em>옵션명1</em>
                      </p>
                      <span>20,000</span>
                    </li>
                    <li>
                      <p>
                        항목명2 - <em>옵션명2</em>
                      </p>
                      <span>40,000</span>
                    </li>
                    <li>
                      <p>
                        항목명3 - <em>옵션명3</em>
                      </p>
                      <span>40,000</span>
                    </li>
                  </ul>
                </li>

                <li>
                  <p>예상비용</p>
                  <span>------</span>
                </li>
                <li>
                  <p>문의사항</p>
                  <span>----</span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            <button className="cancel">예약취소</button>
            <button className="okay">예약현황 보기</button>
          </BtnAreaDiv>
        </ReservationPaperContDiv>
      </div>
    </PapersDiv>
  );
};

export default UserReservation;
