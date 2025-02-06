import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";

function Wishlist() {
  const ImgURL = "http://112.222.157.156:5224";
  const [wishlist, setWishlist] = useState([]);
  const getWishlist = async () => {
    try {
      const res = await loginApi.get("/api/like");
      setWishlist(res.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <MyPageLayout>
      <div className="flex justify-center items-center pb-[50px]">
        <span className="text-[24px] font-normal">찜목록</span>
      </div>
      <div className="flex flex-wrap gap-[30px]">
        {wishlist.map(item => (
          <a
            href="/"
            key={item.businessId}
            className="flex flex-col rounded-lg w-[calc(33.333%-20px)] gap-[10px] relative group overflow-hidden"
          >
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden transition-transform duration-100 group-hover:scale-[0.97]">
              <img
                src={`${ImgURL}${item.pic}`}
                alt="사진"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="block w-full overflow-hidden">{item.title}</span>
            <span className="text-[18px]">{item.price.toLocaleString()}~</span>
            <div className="flex justify-between items-center text-[14px]">
              <span>{item.businessName}</span>
              <span className="flex justify-center items-center gap-[3px]">
                <FaStar className="text-[#FF9D00] translate-y-[-2px]" />
                {item.score}
                <span className="text-gray-400">{`(${item.reviewNumbers})`}</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </MyPageLayout>
  );
}

export default Wishlist;
