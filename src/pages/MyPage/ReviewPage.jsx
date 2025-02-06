import React, { useState } from "react";
import MyPageLayout from "../../components/MyPageLayout";
import { FaStar } from "react-icons/fa";

function ReviewPage() {
  const [review, setReview] = useState([]);
  return (
    <MyPageLayout>
      <div className="flex flex-col justify-center items-center gap-y-[20px]">
        <span className="flex justify-center items-center text-[24px] font-normal">
          예약현황
        </span>
        <div className="w-full max-w-[700px] h-[130px]">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-[5px]">
              <div>
                <img
                  src=""
                  alt="로고"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex justify-center items-center gap-[5px]">
                  <div>
                    <FaStar className="text-[#FF9D00] translate-y-[-2px]" />
                  </div>
                  <div>날짜</div>
                </div>
                <div className="flex">이름</div>
              </div>
            </div>
            <div>수정 삭제</div>
          </div>
          <div className="flex justify-between py-[10px]">
            <div>리뷰 내용</div>
            <div>
              <div className="flex justify-center items-center gap-[5px]">
                <img
                  src=""
                  alt="이미지"
                  className="h-[75px] w-[75px] rounded-[8px] object-cover bg-slate-800"
                />
                <img
                  src=""
                  alt="이미지"
                  className="h-[75px] w-[75px] rounded-[8px] object-cover bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-[1px] bg-[#DBDBDB] max-w-[700px] w-full"></div>
      </div>
    </MyPageLayout>
  );
}

export default ReviewPage;
