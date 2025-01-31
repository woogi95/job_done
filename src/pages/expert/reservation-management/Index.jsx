import { useState } from "react";
import { EFilterDiv } from "../../../components/expert-List/expertList";
import ExportFilter from "../../../components/expert-List/ExportFilter";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "./reservationMangement";
import ExpertReservation from "../../../components/papers/ExpertReservation";

function Index() {
  const [isReservationPop, setIsReservationPop] = useState(false);
  return (
    <ExpertListPageDiv>
      <h2 className="tit">예약리스트</h2>
      <EListContDiv>
        <EFilterDiv>
          <ul className="btn-area">
            <li>
              <button className="completed3">취소</button>
            </li>
            <li>
              <button className="completed0">대기</button>
            </li>
            <li>
              <button className="completed1">완료</button>
            </li>
            <li>
              <button className="completed5">거절</button>
            </li>
          </ul>
          <div className="search-bar">
            <label htmlFor="">
              <input type="text" />
            </label>
            <button>검색</button>
          </div>
        </EFilterDiv>
        <ExportListDiv>
          <ul className="tr">
            <li className="th">접수일</li>
            <li className="th">예약날짜</li>
            <li className="th">서비스 종류</li>
            <li className="th">회원명</li>
            <li className="th">예약자</li>
            <li className="th">예약현황</li>
            <li className="th">예약신청서확인</li>
          </ul>

          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed0">대기</p>
            </li>
            <li className="td blue btn-area">
              <button
                onClick={() => {
                  setIsReservationPop(true);
                }}
              >
                신청서
              </button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">취소</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed1">완료</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">거절</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed0">대기</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">취소</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed1">완료</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">거절</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed1">완료</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">거절</p>
            </li>
            <li className="td blue btn-area">
              <button>신청서</button>
            </li>
          </ul>
        </ExportListDiv>
      </EListContDiv>
      {isReservationPop && (
        <ExpertReservation
          isReservationPop={isReservationPop}
          setIsReservationPop={setIsReservationPop}
        />
      )}
    </ExpertListPageDiv>
  );
}

export default Index;
