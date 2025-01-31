import React from "react";
import MyPageLayout from "../../components/MyPageLayout";

function UsageDetails() {
  return (
    <MyPageLayout>
      <div className=" flex justify-center items-center pb-[30px]">
        <span className="text-[24px] font-normal">이용내역</span>
      </div>
      <div className="grid grid-cols-5 border-[1px] border-solid border-[#E0E0E0] rounded-lg py-[15px] px-[20px]">
        <div className="text-center">날짜</div>
        <div className="text-center">업체명</div>
        <div className="text-center">이용한 서비스</div>
        <div className="text-center">금액</div>
        <div className="text-center">진행상황</div>
      </div>
      <div className="grid grid-cols-5 py-[15px] px-[25px] pt-[30px]">
        <div className="text-center">2025-01-13</div>
        <div className="text-center">세차요정 밋돌세</div>
        <div className="text-center">세차</div>
        <div className="text-center">150,000원</div>
        <div className="text-center">완료</div>
      </div>
    </MyPageLayout>
  );
}

export default UsageDetails;
