import { IoSearch } from "react-icons/io5";
import { PageTopDiv } from "./service";
import { NavLink } from "react-router-dom";

const ServiceListTop = () => {
  return (
    <PageTopDiv>
      <div className="inner">
        <h1>청소</h1>
        <span>청소 {">"} 원룸</span>
        <ul>
          <li>
            <NavLink
              to="/service"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              청소
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              이사
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              세차
            </NavLink>
          </li>
        </ul>
        <div className="search">
          <em>
            <IoSearch />
          </em>
          <input type="text" placeholder="검색어를 입력해주세요" />
          <button>검색</button>
        </div>
      </div>
    </PageTopDiv>
  );
};
export default ServiceListTop;
