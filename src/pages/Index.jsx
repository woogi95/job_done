import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventBanner, serviceIcons } from "../components/ServiceIcon";

const Index = () => {
  const [categories, setCategories] = useState({});
  const [companies, setCompanies] = useState([]);
  const BASE_URL = "http://112.222.157.156:5224";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 인기 글 데이터 가져오기
        const categoryIds = [1, 2, 3, 4];
        const categoryRequests = categoryIds.map(id =>
          axios.get("/api/business", {
            params: {
              categoryId: id,
            },
          }),
        );

        // 추천 글 데이터 가져오기 (categoryId 1로 임시 설정)
        const recommendedRequest = axios.get("/api/business", {
          params: {
            categoryId: 1, // 임시로 1번 카테고리 사용
          },
        });

        // 모든 요청을 병렬로 처리
        const responses = await Promise.all([
          ...categoryRequests,
          recommendedRequest,
        ]);

        // 응답 확인을 위한 로그
        console.log("모든 응답:", responses);

        // 카테고리별 데이터 정리
        const companiesData = {};
        categoryIds.forEach((id, index) => {
          companiesData[id] = responses[index].data.resultData;
        });

        // 마지막 응답을 추천 글로 사용
        const recommendedData = responses[responses.length - 1].data.resultData;

        console.log("카테고리별 데이터:", companiesData);
        console.log("추천 글 데이터:", recommendedData);

        setCategories(companiesData);
        setCompanies(recommendedData);
      } catch (error) {
        console.log("데이터 조회 에러:", error);
        setCategories({});
        setCompanies([]);
      }
    };

    fetchData();
  }, []);

  // 상태 변경 확인을 위한 useEffect
  useEffect(() => {
    console.log("추천 글 상태 업데이트:", companies);
  }, [companies]);
  return (
    <div className="pt-[80px]">
      <div>
        {/* 이벤트 배너 */}
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="h-[200px]"
          >
            {EventBanner.map(item => (
              <SwiperSlide key={item.id}>
                <Link
                  to="/"
                  className="flex h-[200px] max-w-[1280px] m-auto relative"
                >
                  <img
                    src={item.image}
                    alt="이벤트배너"
                    className="w-full object-cover"
                  />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-bold text-6xl whitespace-nowrap text-ellipsis">
                    {item.title}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 서비스 아이콘 */}
        <div>
          <div className="flex justify-center items-center pt-[100px] pb-[100px]">
            <div className="flex gap-6">
              {serviceIcons.map(item => (
                <a
                  key={item.id}
                  href={item.link}
                  className="h-[100px] w-[100px] rounded-lg relative group overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 rounded-lg text-white text-[20px]">
                    {item.title}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-[1280px] m-auto">
          {/* 인기 글 */}
          <span className="flex pb-[10px]">인기 글</span>
          <div className="flex gap-4 justify-center items-center">
            {categories[1] && categories[1].length > 0 ? (
              categories[1].slice(0, 4).map(item => (
                <Link
                  to="/"
                  key={item.categoryId}
                  className="flex flex-col rounded-lg w-1/3 gap-[10px] relative group overflow-hidden"
                >
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-[0.97]">
                    <img
                      src={`${BASE_URL}${item.pic}`}
                      alt="사진"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="block w-full overflow-hidden">
                    {item.title}
                  </span>
                  <span className="text-[18px]">
                    {item.price.toLocaleString()}~
                  </span>
                  <div className="flex justify-between text-[14px]">
                    <span>{item.businessName}</span>
                    <span className="flex justify-center items-center gap-[3px]">
                      <FaStar className="text-[#FF9D00] translate-y-[-2px]" />
                      {item.scoreAvg}
                      <span className="text-gray-400">{`(${item.serviceCount})`}</span>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div>데이터를 불러오는 중입니다...</div>
            )}
          </div>
          <div className="max-w-[1280px] m-auto pt-[100px] pb-[100px]">
            <a
              href="/"
              className="flex h-[200px] max-w-[1280px] m-auto relative"
            >
              <img
                src="./images/event/event_banner_1.png"
                alt="이벤트배너"
                className="w-full object-cover"
              />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-bold text-6xl whitespace-nowrap text-ellipsis">
                청소하기 힘드신가요?!
              </span>
            </a>
          </div>
        </div>
        <div className="max-w-[1280px] m-auto">
          {/* 추천 글 */}
          <span className="flex pb-[10px]">추천 글</span>
          <div className="flex gap-4">
            {companies && companies.length > 0 ? (
              companies.slice(0, 4).map(item => (
                <Link
                  to="/"
                  key={item.businessId}
                  className="flex flex-col rounded-lg w-1/3 gap-[10px] relative group overflow-hidden"
                >
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-[0.97]">
                    <img
                      src={`${BASE_URL}${item.pic}`}
                      alt="사진"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="block w-full overflow-hidden">
                    {item.title}
                  </span>
                  <span className="text-[18px]">
                    {item.price.toLocaleString()}~
                  </span>
                  <div className="flex justify-between text-[14px]">
                    <span>{item.businessName}</span>
                    <span className="flex justify-center items-center gap-[3px]">
                      <FaStar className="text-[#FF9D00] translate-y-[-2px]" />
                      {item.scoreAvg}
                      <span className="text-gray-400">{`(${item.serviceCount})`}</span>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div>데이터를 불러오는 중입니다...</div>
            )}
          </div>
          <div className="max-w-[1280px] m-auto pt-[100px] pb-[50px]">
            <a
              href="/"
              className="flex h-[200px] max-w-[1280px] m-auto relative"
            >
              <img
                src="./images/event/event_banner_1.png"
                alt="이벤트배너"
                className="w-full object-cover"
              />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-bold text-6xl whitespace-nowrap text-ellipsis">
                청소하기 정말 힘들다!
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
