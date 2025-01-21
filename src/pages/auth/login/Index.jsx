import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-div">
      {/* 로그인, 비밀번호 */}
      <form>
        <div className="login-box-div">
          <input
            className="login-box"
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
          />
          <input
            className="login-box"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
          <button className="bg-blue-500 border border-gray-400 w-80 h-11 rounded-lg ">
            로그인
          </button>
          <div>
            <input
              type="checkbox"
              id="logining"
              name="logining"
              // checked={}
              // onChange={}
            />
            <label htmlFor="iogining">로그인 상태 유지</label>
            <Link to={"/email"}>아이디•비밀번호 찾기</Link>
          </div>
        </div>
      </form>
      <div></div>
    </div>
  );
}

export default LoginPage;
