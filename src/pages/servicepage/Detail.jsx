import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
import DetailTop from "../../components/serviceDetail/DetailTop";
import DetailContents from "../../components/serviceDetail/DetailContents";
import axios from "axios";
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [businessDetail, setBusinessDetail] =
    useRecoilState(businessDetailState);
  // http://112.222.157.156:5224/api/business/%7BbusinessId%7D?businessId=1
  // const businessId = businessDetail.businessId;
  const getBusinessDetail = async businessId => {
    try {
      const res = await axios.get(
        `/api/business/${businessId}?businessId=${businessId}`,
      );
      console.log("resultData : ", res.data.resultData);
      setBusinessDetail(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("businessDetail", businessDetail);
  useEffect(() => {
    if (id) {
      getBusinessDetail(id);
    }
  }, [id]);
  // const { id } = useParams();
  return (
    <div>
      <DetailTop />
      <DetailContents />
    </div>
  );
}

export default Detail;
