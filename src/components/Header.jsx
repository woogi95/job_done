import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUser } from "../atoms/loginAtom";
import {
  categoriesState,
  detailTypesState,
  selectedCategoryState,
  selectedDetailTypeState,
} from "../atoms/categoryAtom";
import axios from "axios";

function Header() {
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [detailTypes, setDetailTypes] = useRecoilState(detailTypesState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState,
  );
  const [selectedDetailType, setSelectedDetailType] = useRecoilState(
    selectedDetailTypeState,
  );
  const menuRef = useRef();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/api/category`);
      // console.log("카테고리는 뭐 오는데? : ", res);
      setCategories(res.data.resultData);
    } catch (error) {
      console.error("Categories error:", error.response || error);
    }
  };

  const fetchDetailTypes = async categoryId => {
    try {
      const res = await axios.get(`/api/category/detail`, {
        params: { categoryId: categoryId },
      });
      // console.log("디테일은 뭐 오는데? : ", res);
      setDetailTypes(prev => ({
        ...prev,
        [categoryId]: res.data.resultData,
      }));
    } catch (error) {
      console.error(categoryId, ":", error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    setUserInfo({
      accessToken: "",
      isLogind: false,
      userId: null,
    });
    navigate("/");
  };

  const handleCategoryClick = categoryId => {
    setSelectedCategory(categoryId);
    setSelectedDetailType(null);
    navigate(`/service?categoryId=${categoryId}`);
  };

  const handleDetailTypeClick = (categoryId, detailTypeId) => {
    setSelectedCategory(categoryId);
    setSelectedDetailType(detailTypeId);
    navigate(`/service?categoryId=${categoryId}&detailTypeId=${detailTypeId}`);

  };

  useEffect(() => {
    console.log("선택된 카테고리:", selectedCategory);
    setSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log("선택된 디테일 타입:", selectedDetailType);
    setSelectedDetailType(selectedDetailType);
  }, [selectedDetailType]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken) {
      setUserInfo(prev => ({
        ...prev,
        accessToken: storedToken,
        isLogind: true,
        userId: storedUserId,
      }));
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    categories.forEach(category => {
      fetchDetailTypes(category.categoryId);
    });
  }, [categories]);

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
    <div className="bg-white z-10 fixed flex items-center h-[80px] w-[100%] m-auto border-b-[1px] border-solid border-[#eee]">
      <div className=" flex justify-between items-center h-20 max-w-[1280px] w-[100%] m-auto">
        <div className="flex gap-10">
          <a href="/">
            <img src="/images/logo.svg" alt="logo" />
          </a>
          <ul className="flex gap-10 text-[20px] items-center text-[#1E1E1E]">
            {categories.map(category => (
              <li key={category.categoryId} className="relative group">
                <button
                  className="hover:text-[#0B7493] py-2"
                  onClick={() => handleCategoryClick(category.categoryId)}
                >
                  {category.categoryName}
                </button>
                <div className="absolute hidden group-hover:block w-auto pt-2">
                  <div className="bg-white shadow-md rounded-lg flex flex-col whitespace-nowrap">
                    {detailTypes[category.categoryId]?.map(detailType => (
                      <button
                        key={detailType.detailTypeId}
                        className="block px-6 py-3 hover:bg-gray-100 text-[16px] text-left"
                        onClick={() =>
                          handleDetailTypeClick(
                            category.categoryId,
                            detailType.detailTypeId,
                          )
                        }
                      >
                        {detailType.detailTypeName}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 text-sm ">
          {userInfo.isLogind ? (
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
                  <div className="absolute flex flex-col items-center justify-center right-0 mt-2 w-[100px] bg-white rounded-lg shadow-lg py-2">
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
