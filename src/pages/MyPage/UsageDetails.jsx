import React from "react";
import MyPageLayout from "../../components/MyPageLayout";

function UsageDetails() {
  return (
    <MyPageLayout>
      <div className="flex justify-center items-center pb-[50px]">
        <span className="text-[24px] font-normal">이용내역</span>
      </div>
      <div className="flex justify-between items-center border-[1px] border-solid border-[#E0E0E0] rounded-lg py-[15px] px-[80px]">
        <span className="w-[120px] text-center">날짜</span>
        <span className="w-[150px] text-center">업체명</span>
        <span className="w-[150px] text-center">이용한 서비스</span>
        <span className="w-[120px] text-center">금액</span>
        <span className="w-[120px] text-center">진행상황</span>
      </div>
      <div className="flex justify-between items-center py-[15px] px-[80px] pt-[30px]">
        <span className="w-[120px] text-center">2025-01-13</span>
        <span className="w-[150px] text-center">세차요정 밋돌세</span>
        <span className="w-[150px] text-center">세차</span>
        <span className="w-[120px] text-center">150,000원</span>
        <span className="w-[120px] text-center">완료</span>
      </div>
    </MyPageLayout>
  );
}

export default UsageDetails;
