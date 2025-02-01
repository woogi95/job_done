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

function Service() {
  const [businessList, setBusinessList] = useState([
    {
      detailTypeName: "업체명1",
      pic: "https://d2v80xjmx68n4w.cloudfront.net/articles/IHzd41697620479.jpg?w=1492",
      businessId: 0,
      businessName: "업체명1",
      title: "업체에 대한 제목자리입니다. 두줄까지 들어갑니다.",
      scoreAvg: 4.2,
      price: 50000,
      like: 1,
      reviewNumbers: 7000,
    },
    {
      detailTypeName: "업체명2",
      pic: "https://d2v80xjmx68n4w.cloudfront.net/articles/IHzd41697620479.jpg?w=1492",
      businessId: 1,
      businessName: "업체명1",
      title: "한 줄 타이틀입니다.",
      scoreAvg: 4.5,
      price: 60000,
      like: 0,
      reviewNumbers: 500,
    },
  ]);
  const categoryId = 1;
  const detailTypeId = 1;
  const getBusinessList = async () => {
    try {
      const res = await axios.get(
        `/api/business?categoryId=${categoryId}&detailTypeId=${detailTypeId}`,
      );
      console.log(res.data.resultData);
      // setBusinessList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBusinessList();
    console.log(businessList);
  }, []);
  return (
    <>
      <ServiceListTop />
      <ServiceContentDiv>
        <LayoutDiv>
          <Filter />
          <div className="list">
            {businessList.map(item => (
              <ServiceListItem key={businessList.business} business={item} />
            ))}
          </div>

          {/* 페이지네이션 넣어야함 */}
        </LayoutDiv>
      </ServiceContentDiv>
    </>
  );
}

export default Service;
