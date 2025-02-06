// import ServiceListTop from "../../../components/service/ServiceListTop";
// import { ServiceContentDiv } from "./cleaning";
// import { LayoutDiv } from "../../page";
// import Filter from "../../../components/service/Filter";
// import ServiceListItem from "../../../components/service/ServiceListItem";

// import axios from "axios";
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
import { likeStatusState } from "../../atoms/like";
// import { loginApi } from "../../apis/login";
import axios from "axios";
import { loginApi } from "../../apis/login";

function Service() {
  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);
  const [businessList, setBusinessList] = useState([]);

  const getBusinessList = async (categoryId, detailTypeId) => {
    try {
      const res = await axios.get(
        `/api/business?categoryId=${categoryId}&detailTypeId=${detailTypeId}`,
      );
      // console.log(res.data.resultData);
      setBusinessList(res.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickBusiness = async businessId => {
    // const userId = localStorage.getItem("userId");
    // if (!userId) {
    //   alert("로그인 후 찜할 수 있습니다.");
    //   return;
    // }

    try {
      console.log(userId, businessId);
      const response = await loginApi.post(
        "/api/like",
        {
          // userId: userId,
          businessId: businessId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // 응답 데이터 처리
      console.log("찜 상태가 성공적으로 업데이트되었습니다:", response.data);

      // 찜 상태 업데이트
      const currentLikeStatus = likeStatus[businessId] || { isLiked: false };
      const newLikeStatus = !currentLikeStatus.isLiked;

      // 상태 업데이트
      setLikeStatus(prevState => {
        const updatedState = { ...prevState };
        updatedState[businessId] = { isLiked: newLikeStatus };
        return updatedState;
      });
    } catch (error) {
      console.error(
        "찜 상태 업데이트에 실패했습니다:",
        error.response?.data || error.message,
      );
      alert("찜 상태 업데이트에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (categoryId && detailTypeId) {
      getBusinessList(categoryId, detailTypeId);
    }
  }, [categoryId, detailTypeId]);

  return (
    <>
      <ServiceListTop setBusinessList={setBusinessList} />
      <ServiceContentDiv>
        <LayoutDiv>
          <Filter
            setBusinessList={setBusinessList}
            businessList={businessList}
          />
          <div className="list">
            {businessList.map(item => (
              <ServiceListItem
                key={item.businessId}
                business={item}
                onClick={() => handleClickBusiness(item.businessId)}
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
