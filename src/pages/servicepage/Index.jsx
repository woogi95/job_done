// import ServiceListTop from "../../../components/service/ServiceListTop";
// import { ServiceContentDiv } from "./cleaning";
// import { LayoutDiv } from "../../page";
// import Filter from "../../../components/service/Filter";
// import ServiceListItem from "../../../components/service/ServiceListItem";

import Filter from "../../components/service/Filter";
import ServiceListItem from "../../components/service/ServiceListItem";
import ServiceListTop from "../../components/service/ServiceListTop";
import { LayoutDiv } from "../page";
import { ServiceContentDiv } from "./servicepage";

function MovePage() {
  return (
    <>
      <ServiceListTop />
      <ServiceContentDiv>
        <LayoutDiv>
          <Filter />
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

          {/* 페이지네이션 넣어야함 */}
        </LayoutDiv>
      </ServiceContentDiv>
    </>
  );
}

export default MovePage;
