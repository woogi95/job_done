import React from "react";
import { useParams } from "react-router-dom";
import DetailTop from "../../../components/serviceDetail/DetailTop";
import DetailContents from "../../../components/serviceDetail/DetailContents";

function Detail() {
  const { id } = useParams();
  return (
    <div>
      <DetailTop />
      <DetailContents />
    </div>
  );
}

export default Detail;
