import React, { useEffect, useState } from "react";
import { BtnAreaDiv, FormDiv, PaperContDiv, PapersDiv } from "./papers";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { papersState } from "../../atoms/businessAtom";

const Estimate = () => {
  const [papers, setPapers] = useRecoilState(papersState);
  const papersInfo = useRecoilValue(papersState);
  const serviceId = papers.serviceId;
  const getEstimate = async serviceId => {
    try {
      ///api/service/detail?serviceId=28
      const res = await axios.get(`/api/service/detail?serviceId=${serviceId}`);

      console.log("!!!!", res);
      setPapers(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPhoneNumber = phone => {
    if (!phone) return "-";
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };
  const formatBusinessNumber = number => {
    if (!number) return "사업자 번호 없음";
    return number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
  };
  useEffect(() => {
    getEstimate(serviceId);
    console.log("==>", papersInfo);
  }, [serviceId]);
  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <PaperContDiv>
          <h2 className="tit">
            요청하신
            <strong>
              견적서가
              <br /> 완료
            </strong>
            되었습니다.
          </h2>
          <span className="description">
            기다려 주셔서 감사합니다. <br />
            예약 내역 및 견적 내용은 <em>마이페이지{">"}예약현황</em>에서
            확인하실 수 있습니다.
            <br /> 수정사항이나 문의 사항이 있으시면, "문의하기"를 통해 연락
            주시기 바랍니다.
            <br />
            <b>
              견적서를 받은 후 결제가 지연될 경우, 해당 견적은 취소될 수
              있습니다.
            </b>
          </span>
          <FormDiv>
            <div className="company-info">
              <h3>예약업체 정보</h3>
              <ul>
                <li>
                  <p>등록번호</p>
                  <span>{formatBusinessNumber(papersInfo.businessNum)}</span>
                </li>
                <li>
                  <p>업체번호</p>
                  <span>{formatPhoneNumber(papersInfo.businessPhone)}</span>
                </li>
                <li>
                  <p>상호명</p>
                  <span>{papersInfo.businessName}</span>
                </li>
                <li>
                  <p>분류</p>
                  <span>{papersInfo.categoryName}</span>
                </li>
                <li>
                  <p>주소</p>
                  <span>{papersInfo.businessAddress}</span>
                </li>
              </ul>
            </div>
            <div className="user-info">
              <h3>예약자 정보</h3>
              <ul>
                <li>
                  <p>예약자</p>
                  <span>{papersInfo.userName}</span>
                </li>
                <li>
                  <p>연락처</p>
                  <span>{formatPhoneNumber(papersInfo.userPhone)}</span>
                </li>
                <li>
                  <p>주소</p>
                  <span>{papersInfo.address}</span>
                </li>
              </ul>
            </div>
            <div className="estimate-info">
              <h3>견적 내용</h3>
              <ul>
                <li>
                  <p>견적일</p>
                  <span>{papersInfo.updatedAt}</span>
                </li>
                <li>
                  <p>방문날짜</p>
                  <span>
                    {papersInfo.startDate} ~ {papersInfo.endDate}
                  </span>
                </li>
                <li>
                  <p>예정시간</p>
                  <span>
                    {papersInfo.mstartTime} - {papersInfo.mendTime}
                  </span>
                </li>
                <li>
                  <p>평수</p>
                  <span>{papersInfo.pyeong}</span>
                </li>
                {papersInfo.options && papersInfo.options.length > 0 && (
                  <li className="option">
                    <p>옵션</p>
                    <ul>
                      {papersInfo.options.map((option, index) => (
                        <li key={index}>
                          <p>
                            {option.optionName}{" "}
                            <em>({option.optionDetailName})</em>
                          </p>
                          <span>
                            {option.optionDetailPrice.toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {papersInfo.etc && papersInfo.etc.length > 0 && (
                  <li className="option">
                    <p>추가견적</p>
                    <ul>
                      {papersInfo.etc.map((etcItem, index) => (
                        <li key={index}>
                          <p>
                            {etcItem.etcComment} <em>({etcItem.etcId})</em>
                          </p>
                          <span>{etcItem.etcPrice.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                <li>
                  <p>견적비용</p>
                  <span>{papersInfo.price.toLocaleString()}</span>
                </li>
                <li>
                  <p>특이사항</p>
                  <span>{papersInfo.addComment}</span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            <button className="cancel">예약취소</button>
            <button className="confirm">결제하기</button>
          </BtnAreaDiv>
        </PaperContDiv>
      </div>
    </PapersDiv>
  );
};

export default Estimate;
