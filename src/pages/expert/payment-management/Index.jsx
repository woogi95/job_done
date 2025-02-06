import { EFilterDiv } from "../../../components/expert-List/expertList";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportPaymentListDiv,
} from "../reservation-management/reservationMangement";

function Index() {
  return (
    <ExpertListPageDiv>
      <h2 className="tit">결제관리</h2>
      <EListContDiv>
        <EFilterDiv>
          <ul className="btn-area">
            <li>
              <button className="completed3">결제대기</button>
            </li>

            <li>
              <button className="completed5">결제완료</button>
            </li>
          </ul>
          <div className="search-bar">
            <label htmlFor="">
              <input type="text" />
            </label>
            <button>검색</button>
          </div>
        </EFilterDiv>
        <ExportPaymentListDiv>
          <ul className="tr">
            <li className="th">예약날짜</li>
            <li className="th">주소</li>
            <li className="th">결제금액</li>
            <li className="th">예약자</li>
            <li className="th">결제상황</li>
            <li className="th">결제내역</li>
          </ul>

          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">결제대기</p>
            </li>
            <li className="td btn-area"></li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">결제완료</p>
            </li>
            <li className="td btn-area">
              <button className="red">결제내역</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">결제대기</p>
            </li>
            <li className="td btn-area"></li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">결제완료</p>
            </li>
            <li className="td btn-area">
              <button className="red">결제내역</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">결제대기</p>
            </li>
            <li className="td btn-area"></li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">결제완료</p>
            </li>
            <li className="td btn-area">
              <button className="red">결제내역</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">결제대기</p>
            </li>
            <li className="td btn-area"></li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">결제완료</p>
            </li>
            <li className="td btn-area">
              <button className="red">결제내역</button>
            </li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed3">결제대기</p>
            </li>
            <li className="td btn-area"></li>
          </ul>
          <ul className="tr">
            <li className="td">2025-01-16</li>
            <li className="td black">반월당역 12번출구 12-234</li>
            <li className="td">50,000</li>
            <li className="td">예약자</li>
            <li className="td">
              <p className="completed5">결제완료</p>
            </li>
            <li className="td btn-area">
              <button className="red">결제내역</button>
            </li>
          </ul>
        </ExportPaymentListDiv>
      </EListContDiv>
    </ExpertListPageDiv>
  );
}

export default Index;
