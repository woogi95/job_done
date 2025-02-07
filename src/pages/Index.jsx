import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventBanner } from "../components/ServiceIcon";
import ServiceSkeleton from "../components/ServiceSkeleton";

const Index = () => {
  const [categories, setCategories] = useState({});
  const [companies, setCompanies] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(1);
  const regionNames = {
    1: "대구",
    2: "구미",
    3: "경주",
    4: "포항",
    5: "부산",
  };
  const [regions] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      regionId: i + 1,
      region: regionNames[i + 1],
    })),
  );
  const BASE_URL = "http://112.222.157.156:5224";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 선택된 지역의 데이터만 가져오기
        const categoryIds = [1, 2, 3];
        const categoryRequests = categoryIds.map(id =>
          axios.get("/api/business", {
            params: {
              categoryId: id,
              regionId: selectedRegion,
            },
          }),
        );

        const recommendedRequest = axios.get("/api/business", {
          params: {
            categoryId: 1,
            regionId: selectedRegion,
          },
        });

        const responses = await Promise.all([
          ...categoryRequests,
          recommendedRequest,
        ]);

        const companiesData = {};
        categoryIds.forEach((id, index) => {
          companiesData[id] = responses[index].data.resultData;
        });

        const recommendedData = responses[responses.length - 1].data.resultData;

        setCategories(companiesData);
        setCompanies(recommendedData);
      } catch (error) {
        console.log("데이터 조회 에러:", error);
        setCategories({});
        setCompanies([]);
      }
    };

    fetchData();
  }, [selectedRegion]); // 변경될 때마다 데이터 다시 부르기

  useEffect(() => {
    console.log("추천 글 상태 업데이트:", companies);
  }, [companies]);
  return (
    <div className="pt-[80px] min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* 배경 패턴 */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#000 0.5px, transparent 0.5px),
            linear-gradient(to right, #000 0.5px, transparent 0.5px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div>
        {/* 이벤트 배너 섹션 */}
        <div className="w-full overflow-hidden shadow-lg">
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
            className="h-[250px]"
          >
            {EventBanner.map(item => (
              <SwiperSlide key={item.id}>
                <Link
                  to="/"
                  className="flex h-[250px] max-w-[1280px] m-auto relative group"
                >
                  <img
                    src={item.image}
                    alt="이벤트배너"
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50">
                    <span className="absolute left-[10%] top-1/2 -translate-y-1/2 text-white text-bold text-6xl whitespace-nowrap text-ellipsis drop-shadow-lg">
                      {item.title}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 지역 아이콘 섹션 */}
        <div className="bg-white/50 backdrop-blur-sm">
          <div className="flex justify-center items-center py-[80px]">
            <div className="flex gap-8">
              {regions.map(region => (
                <a
                  key={region.regionId}
                  onClick={e => {
                    e.preventDefault();
                    setSelectedRegion(region.regionId);
                  }}
                  href={`/?region=${region.regionId}`}
                  className={`h-[120px] w-[120px] rounded-2xl relative group overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-2
                    ${
                      selectedRegion === region.regionId
                        ? "bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30"
                        : "bg-white shadow-lg hover:shadow-xl"
                    }`}
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center rounded-2xl text-[22px] font-bold transition-colors
                    ${selectedRegion === region.regionId ? "text-white" : "text-gray-700"}`}
                  >
                    {region.region}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 컨텐츠 섹션 */}
      <div className="bg-white/30 backdrop-blur-sm py-10">
        <div className="max-w-[1280px] m-auto">
          {/* 인기 글 */}
          <span className="flex pb-[10px] text-2xl font-bold text-gray-800">
            인기 글
          </span>
          <div className="flex gap-[15px]">
            {categories[1] && categories[1].length > 0 ? (
              categories[1].slice(0, 4).map(item => (
                <Link
                  to="/"
                  key={item.categoryId}
                  className="flex flex-col rounded-xl w-1/3 gap-[10px] relative group overflow-hidden bg-white p-[10px] shadow-lg hover:shadow-xl transition-all duration-100 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                    <img
                      src={`${BASE_URL}${item.pic}`}
                      alt="사진"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="block w-full overflow-hidden font-medium text-lg">
                    {item.title}
                  </span>
                  <span className="text-[20px] font-bold text-blue-600">
                    {item.price.toLocaleString()}원~
                  </span>
                  <div className="flex justify-between text-[15px] items-center">
                    <span className="text-gray-600">{item.businessName}</span>
                    <span className="flex justify-center items-center gap-[3px] bg-gray-50 px-3 py-1 rounded-full">
                      <FaStar className="text-[#FF9D00]" />
                      <span className="font-medium">{item.scoreAvg}</span>
                      <span className="text-gray-400">{`(${item.serviceCount})`}</span>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex w-full gap-[15px]">
                {[...Array(4)].map((_, index) => (
                  <ServiceSkeleton key={index} />
                ))}
              </div>
            )}
          </div>

          {/* 중간 배너 */}
          <div className="max-w-[1280px] m-auto py-[80px]">
            <a
              href="/"
              className="flex h-[200px] max-w-[1280px] m-auto relative overflow-hidden group"
            >
              <img
                src="./images/event/event_banner_1.png"
                alt="이벤트배너"
                className="w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center pl-[10%]">
                <span className="text-white text-bold text-6xl whitespace-nowrap text-ellipsis drop-shadow-lg">
                  청소하기 힘드신가요?!
                </span>
              </div>
            </a>
          </div>

          {/* 최신 글 */}
          <span className="flex pb-[10px] text-2xl font-bold text-gray-800">
            최신 글
          </span>
          <div className="flex gap-[15px]">
            {companies && companies.length > 0 ? (
              companies.slice(0, 4).map(item => (
                <Link
                  to="/"
                  key={item.businessId}
                  className="flex flex-col rounded-xl w-1/3 gap-[10px] relative group overflow-hidden bg-white p-[10px] shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                    <img
                      src={`${BASE_URL}${item.pic}`}
                      alt="사진"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="block w-full overflow-hidden font-medium text-lg">
                    {item.title}
                  </span>
                  <span className="text-[20px] font-bold text-blue-600">
                    {item.price.toLocaleString()}원~
                  </span>
                  <div className="flex justify-between text-[15px] items-center">
                    <span className="text-gray-600">{item.businessName}</span>
                    <span className="flex justify-center items-center gap-[3px] bg-gray-50 px-3 py-1 rounded-full">
                      <FaStar className="text-[#FF9D00]" />
                      <span className="font-medium">{item.scoreAvg}</span>
                      <span className="text-gray-400">{`(${item.serviceCount})`}</span>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex w-full gap-[15px]">
                {[...Array(4)].map((_, index) => (
                  <ServiceSkeleton key={index} />
                ))}
              </div>
            )}
          </div>
          <div className="max-w-[1280px] m-auto py-[80px]">
            <a
              href="/"
              className="flex h-[200px] max-w-[1280px] m-auto relative overflow-hidden group"
            >
              <img
                src="./images/event/event_banner_1.png"
                alt="이벤트배너"
                className="w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center pl-[10%]">
                <span className="text-white text-bold text-6xl whitespace-nowrap text-ellipsis drop-shadow-lg">
                  잡던과 함께!{" "}
                  <p className="text-5xl py-[10px]">
                    당신의 비즈니스를 성장시키세요!
                  </p>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
