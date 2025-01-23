import ServiceListTop from "../../../components/service/ServiceListTop";
import { IoIosArrowDown } from "react-icons/io";

import {
  LayoutDiv,
  ServiceListContentDiv,
} from "../../../components/service/move";
import ServiceListItem from "../../../components/service/ServiceListItem";
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
            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />

            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />

            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />

            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />
            <ServiceListItem />
          </div>
        </LayoutDiv>
      </ServiceListContentDiv>
    </>
  );
}

export default MovePage;
