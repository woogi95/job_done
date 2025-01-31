import { Link } from "react-router-dom";
import { HeaderDiv } from "./header";

const ExpertHeader = () => {
  return (
    <HeaderDiv>
      <Link to={"expert"} className="b-logo">
        <img src="/images/b-logo.svg" alt="비지니스로고" />
      </Link>
      <div className="user-info">
        <ul>
          <li>
            <b>업체이름</b>님 환영합니다:)
          </li>
          <li>
            <button>로그아웃</button>
          </li>
        </ul>
        <button>
          <em>로고</em>사용자계정 전환
        </button>
      </div>
    </HeaderDiv>
  );
};

export default ExpertHeader;
