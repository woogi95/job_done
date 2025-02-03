// import ServiceListTop from "../../../components/service/ServiceListTop";
// import { ServiceContentDiv } from "./cleaning";
// import { LayoutDiv } from "../../page";
// import Filter from "../../../components/service/Filter";
// import ServiceListItem from "../../../components/service/ServiceListItem";

import axios from "axios";
import Filter from "../../components/service/Filter";
import ServiceListItem from "../../components/service/ServiceListItem";
import ServiceListTop from "../../components/service/ServiceListTop";
import { LayoutDiv } from "../page";
import { ServiceContentDiv } from "./servicepage";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCategoryState,
  selectedDetailTypeState,
} from "../../atoms/categoryAtom";

function Service() {
  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  // console.log("----->", categoryId, detailTypeId);
  const [businessList, setBusinessList] = useState([]);

  const getBusinessList = async (categoryId, detailTypeId) => {
    try {
      const res = await axios.get(
        `/api/business?categoryId=${categoryId}&detailTypeId=${detailTypeId}`,
      );
      console.log("res", res.data.resultData);
      setBusinessList(res.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log("!! =>", businessList);

  useEffect(() => {
    console.log("categoryId", categoryId);
    console.log("detailTypeId", detailTypeId);
    if (categoryId && detailTypeId) {
      getBusinessList(categoryId, detailTypeId);
    }
  }, [categoryId, detailTypeId]);
  // console.log("cateIdBox", cateIdBox);
  return (
    <>
      <ServiceListTop />
      <ServiceContentDiv>
        <LayoutDiv>
          <Filter />
          <div className="list">
            {businessList.map(item => (
              <ServiceListItem
                key={businessList.businessId}
                // key={index}
                business={item}
              />
            ))}
          </div>

          {/* 페이지네이션 넣어야함 */}
        </LayoutDiv>
      </ServiceContentDiv>
    </>
  );
}

export default Service;
