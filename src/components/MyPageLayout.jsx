import React from "react";

function MyPageLayout({ children }) {
  return (
    <div className="flex">
      <div className="min-h-[800px] w-[300px] bg-slate-600 left-0">
        마이페이지 패널
      </div>
      <div className="ml-[300px] flex-1 p-4">{children}</div>
    </div>
  );
}

export default MyPageLayout;
