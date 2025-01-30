import {
  EListContDiv,
  ExpertListPageDiv,
} from "../../../components/expert-List/expertList";
import ExportFilter from "../../../components/expert-List/ExportFilter";

function Index() {
  return (
    <ExpertListPageDiv>
      <h2 className="tit">예약리스트</h2>
      <EListContDiv>
        <ExportFilter />
        <div className="list">
          <div className="tr">
            <div className="th">접수일</div>
            <div className="th">예약날짜</div>
            <div className="th">서비스 종류</div>
            <div className="th">회원명</div>
            <div className="th">예약자</div>
            <div className="th">예약현황</div>
            <div className="th">예약신청서확인</div>
          </div>
          <div className="tr">
            <div className="td">2025-01-16</div>
            <div className="td">2025-01-17</div>
            <div className="td">음식점청소</div>
            <div className="td">회원명</div>
            <div className="td">예약자</div>
            <div className="td">
              <p>대기</p>
            </div>
            <div className="td">신청서</div>
          </div>
        </div>
      </EListContDiv>
    </ExpertListPageDiv>
  );
}

export default Index;
