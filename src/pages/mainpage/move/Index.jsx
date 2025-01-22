import ServiceListTop from "../../../components/service/ServiceListTop";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import {
  LayoutDiv,
  ServiceListContentDiv,
} from "../../../components/service/move";
function MovePage() {
  return (
    <>
      <ServiceListTop />
      <ServiceListContentDiv>
        <LayoutDiv>
          <div className="filter-area">
            <div className="filter">
              <p>최신순</p>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="list">
            <div className="listItem">
              <div className="thum"></div>
              <div className="info">
                <em>업체명</em>
                <h4>
                  두줄 타이틀입니다. 두줄 타이틀입니다. 두줄 타이틀입니다.
                </h4>
                <p>50,000 ~</p>
                <div>
                  <FaStar />
                  <em>4.2</em>
                  <span>(7500)</span>
                </div>
              </div>
            </div>
          </div>
        </LayoutDiv>
      </ServiceListContentDiv>
    </>
  );
}

export default MovePage;
