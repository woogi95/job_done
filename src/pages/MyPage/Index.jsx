import React from "react";
import MyPageLayout from "../../components/MyPageLayout";

function MyPage() {
  return (
    <MyPageLayout>
      <div className="flex flex-col items-center gap-[50px]">
        <div className="text-[24px]">내 정보</div>
        <div>
          <img
            src="/images/order/default_profile.jpg"
            alt="profile"
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
      </div>
    </MyPageLayout>
  );
}

export default MyPage;
