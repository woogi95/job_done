import { useNavigate } from "react-router-dom";
import { EFilterDiv } from "../../../components/expert-List/expertList";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "../reservation-management/reservationMangement";

function Index() {
  const navigate = useNavigate();
  return (
    <ExpertListPageDiv>
      <h2 className="tit">견적관리</h2>
      <EListContDiv>
        <EFilterDiv>
          <ul className="btn-area">
            <li>
              <button className="completed3">작성대기</button>
            </li>

            <li>
              <button className="completed1">견적완료</button>
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
            <li className="th">견적현황</li>
            <li className="th">견적서</li>
          </ul>

          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">작성대기</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed1">견적완료</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed3">작성대기</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed1">견적완료</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed3">작성대기</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed1">견적완료</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed3">작성대기</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed1">견적완료</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
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
              <p className="completed3">작성대기</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
              </button>
            </li>
          </ul>
          <ul className="tr ">
            <li className="td">2025-01-16</li>
            <li className="td black">2025-01-17</li>
            <li className="td">음식점청소</li>
            <li className="td">회원명</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed1">견적완료</p>
            </li>
            <li className="td btn-area">
              <button
                className="blue"
                onClick={() => {
                  navigate("/expert/quote-management/quotation-form");
                }}
              >
                작성하기
              </button>
              <button
                className="green"
                onClick={() => {
                  navigate("/expert/quote-management/edit-quotation");
                }}
              >
                수정하기
              </button>
            </li>
          </ul>
        </ExportListDiv>
      </EListContDiv>
    </ExpertListPageDiv>
  );
}

export default Index;
