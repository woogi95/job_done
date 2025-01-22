import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-slate-300 flex justify-between items-center">
      <div className="flex gap-10">
        <a href="/">
          <img src="./images/logo.svg" alt="logo" />
        </a>
        <ui className="flex gap-10 text-xl items-center">
          <li>청소</li>
          <li>세차</li>
          <li>이사</li>
        </ui>
      </div>
      <div className="flex gap-4 text-sm">
        <Link to="/login">업체 등록</Link>
        <Link to="/login">로그인 및 회원가입</Link>
      </div>
    </div>
  );
}

export default Header;
