import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="bg-white flex justify-between items-center h-20 max-w-[1280px] m-auto">
        <div className="flex gap-10">
          <a href="/">
            <img src="./images/logo.svg" alt="logo" />
          </a>
          <ui className="flex gap-10 text-[20px] items-center text-[#1e1e1e]">
            <li className="relative group">
              <a href="/cleaning" className="hover:text-[#0B7493]">
                청소
              </a>
              <div className="absolute hidden group-hover:block w-auto pt-4">
                <div className="bg-white shadow-md rounded-lg flex whitespace-nowrap ">
                  <a
                    href="/cleaning"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs border-2 "
                  >
                    집청소
                  </a>
                  <a
                    href="/cleaning"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs"
                  >
                    사무실청소
                  </a>
                  <a
                    href="/cleaning"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs"
                  >
                    특수청소
                  </a>
                </div>
              </div>
            </li>
            <li className="relative group">
              <a href="/carwash" className="hover:text-[#0B7493]">
                세차
              </a>
              <div className="absolute hidden group-hover:block w-auto pt-4">
                <div className="bg-white shadow-lg rounded-lg flex whitespace-nowrap">
                  <a
                    href="/carwash"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs"
                  >
                    일반차량
                  </a>
                  <a
                    href="/carwash"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs"
                  >
                    특수차량
                  </a>
                </div>
              </div>
            </li>
            <li className="relative group">
              <a href="/move" className="hover:text-[#0B7493]">
                이사
              </a>
              <div className="absolute hidden group-hover:block w-auto pt-4">
                <div className="bg-white shadow-lg rounded-lg flex whitespace-nowrap">
                  <a
                    href="/move"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs  "
                  >
                    가정 이사
                  </a>
                  <a
                    href="/move"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs  "
                  >
                    사무실 이사
                  </a>
                  <a
                    href="/move"
                    className="block px-4 py-[10px] hover:bg-gray-100 text-xs  "
                  >
                    보관 이사
                  </a>
                </div>
              </div>
            </li>
          </ui>
        </div>
        <div className="flex gap-4 text-sm">
          <Link
            to="/login"
            className="bg-[#C3EEFB] text-[#0B7493] w-20 h-7 flex items-center justify-center rounded-2xl"
          >
            업체 등록
          </Link>
          <Link to="/login" className="flex items-center justify-center">
            로그인 및 회원가입
          </Link>
        </div>
      </div>
      <div className="h-[1px] w-auto bg-[#E8E8E8]"></div>
    </>
  );
}

export default Header;
