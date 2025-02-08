import Filter from "../../components/service/Filter";
import ServiceListItem from "../../components/service/ServiceListItem";
import ServiceListTop from "../../components/service/ServiceListTop";
import { LayoutDiv } from "../page";
import { PageNavDiv, ServiceContentDiv } from "./servicepage";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCategoryState,
  selectedDetailTypeState,
} from "../../atoms/categoryAtom";
import { likeStatusState } from "../../atoms/like";
import axios from "axios";
import { loginApi } from "../../apis/login";
function Service() {
  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);
  const [businessList, setBusinessList] = useState([]);

  //페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; //페이지당 아이템 갯수

  const getBusinessList = async (categoryId, detailTypeId) => {
    try {
      const res = await axios.get(
        `/api/business?categoryId=${categoryId}&detailTypeId=${detailTypeId}`,
      );
      setBusinessList(res.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickBusiness = async businessId => {
    try {
      const response = await loginApi.post("/api/like", {
        businessId: businessId,
      });

      // 응답 데이터 처리
      console.log("찜 상태가 성공적으로 업데이트되었습니다:", response.data);

      // 찜 상태 업데이트
      const currentLikeStatus = likeStatus[businessId] || { isLiked: false };
      const newLikeStatus = !currentLikeStatus.isLiked;

      setLikeStatus(prevState => ({
        ...prevState,
        [businessId]: { isLiked: newLikeStatus },
      }));
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
      setCurrentPage(1);
    }
  }, [categoryId, detailTypeId]);

  //페이지네이션
  const totalPages = Math.ceil(businessList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = businessList.slice(indexOfFirstItem, indexOfLastItem);

  //페이지 숫자
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

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
            {currentItems.map(item => (
              <ServiceListItem
                key={item.businessId}
                business={item}
                onClick={() => handleClickBusiness(item.businessId)}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          <PageNavDiv
            style={{
              display: "flex",
              gap: "15px",
              fontSize: "20px",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </button>
            ))}
          </PageNavDiv>
        </LayoutDiv>
      </ServiceContentDiv>
    </>
  );
}

export default Service;
