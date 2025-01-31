import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BtnAreaDiv,
  FormDiv,
  PaperContDiv,
  PapersDiv,
  ReservationPaperContDiv,
} from "./papers";
// icon
import { CgClose } from "react-icons/cg";

const ExpertReservation = ({ setIsReservationPop }) => {
  const [estimateInfo, setEstimateInfo] = useState({});
  const navigate = useNavigate();
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
            ooo님이
            <strong>
              견적·예약 신청
              <br />
            </strong>
            접수 하였습니다.
          </h2>
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
            <button
              className="okay"
              onClick={() => {
                navigate("/expert/quote-management/quotation-form");
              }}
            >
              견적서작성
            </button>
          </BtnAreaDiv>
          <button
            className="pop-close-btn"
            onClick={() => setIsReservationPop(false)}
          >
            <CgClose />
          </button>
        </ReservationPaperContDiv>
      </div>
    </PapersDiv>
  );
};

export default ExpertReservation;
