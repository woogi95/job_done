import React, { useState } from "react";
import MyPageLayout from "../../components/MyPageLayout";
import { ReservationData } from "../../components/ServiceIcon";
import Estimate from "../../components/papers/Estimate";

function MyReservation() {
  const statusText = {
    0: "확인중...",
    1: "예약완료",
    2: "결제 대기중",
    3: "예약취소",
    4: "예약취소",
    5: "예약취소",
    6: "결제완료",
    7: "작업완료",
  };

  return (
    <MyPageLayout>
      <div className="flex flex-col justify-center items-center gap-y-[20px]">
        <span className="flex justify-center items-center text-[24px] font-normal">
          예약현황
        </span>
        <div className="w-full max-w-[800px]">
          {ReservationData.map(item => (
            <div key={item.id} className="mb-[15px]">
              <div className="flex flex-col gap-[10px] px-[55px]">
                <div className="flex justify-between">
                  <span>예약일 : {item.resultData[0].startDate}</span>
                  <button onClick={() => window.open("", "_blank")}>
                    상세보기
                  </button>
                </div>
                <div className="flex">{item.resultData[0].businessName}</div>
                <div className="flex">{item.resultData[0].productName}</div>
                <div className="flex justify-between">
                  <span>{item.resultData[0].price.toLocaleString()}원</span>
                  <span className="text-[#FF3044]">
                    {statusText[item.resultData[0].completed] || "알 수 없음"}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-[15px]">
                  <button className="flex justify-center items-center w-[340px] h-[40px] text-[#FFFFFF] bg-[#3887FF] rounded-lg border-[#ABABAB] border-[1px]">
                    결제하기
                  </button>
                  <button className="flex justify-center items-center w-[340px] h-[40px] text-[#1e1e1e] bg-[#ffffff] rounded-lg border-[#ABABAB] border-[1px]">
                    예약취소
                  </button>
                </div>
              </div>
              <div className="h-[1px] bg-slate-900 mx-auto my-[20px] w-[85%] flex justify-center items-center"></div>
            </div>
          ))}
        </div>
      </div>
    </MyPageLayout>
  );
}

export default MyReservation;
