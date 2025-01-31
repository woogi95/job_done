import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoginState, loginUser } from "../atoms/loginAtom";
function Header() {
  const [isLogin, setIsLogin] = useRecoilState(loginUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogin({
      isLogind: false,
      userId: "",
    });
    navigate("/");
  };
  // 로그인 테스트용
  useEffect(() => {
    setIsLogin({
      isLogind: true,
      userId: "테스트사용자",
    });
  }, [setIsLogin]);
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="bg-white z-50 fixed flex items-center h-[80px] w-[100%] m-auto">
      <div className="bg-white flex justify-between items-center h-20 max-w-[1280px] w-[100%] m-auto">
        <div className="flex gap-10">
          <a href="/">
            <img src="/images/logo.svg" alt="logo" />
          </a>
          <ui className="flex gap-10 text-[20px] items-center text-[#1E1E1E]">
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
        <div className="flex items-center gap-4 text-sm ">
          {isLogin.isLogind ? (
            // 로그인 상태
            <>
              <Link
                to="/business"
                className="bg-[#C3EEFB] text-[#0B7493] w-20 h-7 flex items-center justify-center rounded-2xl"
              >
                업체 등록
              </Link>
              <Link
                to="/mypage/reservation"
                className="flex items-center justify-center"
              >
                예약현황
              </Link>
              <Link
                to="/mypage/wishlist"
                className="flex items-center justify-center"
              >
                찜
              </Link>
              <Link
                to="/mypage/message"
                className="flex items-center justify-center"
              >
                메시지
              </Link>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <img
                    src="/images/order/default_profile.jpg"
                    alt="프로필이미지"
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>
                {/* 프로필 */}
                {isMenuOpen && (
                  <div className="absolute flex flex-col items-center justify-center right-0 mt-2 w-[100px] bg-white rounded-lg shadow-lg py-2 z-10">
                    <Link
                      to="/mypage"
                      className="block px-4 py-2 text-[#1e1e1e] hover:bg-gray-100"
                    >
                      마이페이지
                    </Link>
                    <Link
                      to="/mypage/usage"
                      className="block px-4 py-2 text-[#1e1e1e] hover:bg-gray-100"
                    >
                      이용내역
                    </Link>
                    <Link
                      to="/mypage/review"
                      className="block px-4 py-2 text-[#1e1e1e] hover:bg-gray-100"
                    >
                      작성한 리뷰
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full  px-4 py-2 text-[#1e1e1e] hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
              {/* {isLogin.userId && (
                <span className="flex items-center justify-center h-7">
                  {isLogin.userId}님
                </span>
              )} */}
            </>
          ) : (
            // 로그아웃 상태
            <>
              <Link
                to="/login"
                className="bg-[#C3EEFB] text-[#0B7493] w-20 h-7 flex items-center justify-center rounded-2xl"
              >
                업체 등록
              </Link>
              <Link to="/login" className="flex items-center justify-center">
                로그인 및 회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="h-[1px] w-auto bg-[#E8E8E8]"></div>
    </div>
  );
}
export default Header;
