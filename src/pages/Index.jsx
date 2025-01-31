import React from "react";
import {
  serviceIcons,
  PopularPost,
  EventBanner,
} from "../components/ServiceIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Index = () => {
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
                <a
                  href="/"
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
                </a>
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
            {PopularPost.map(item => (
              <a
                href="/"
                key={item.id}
                className="flex flex-col rounded-lg w-1/3 gap-[10px] relative group overflow-hidden"
              >
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-[0.97]">
                  <img
                    src={item.image}
                    alt="사진"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="block w-full overflow-hidden">
                  {item.comment}
                </span>
                <span className="text-[18px]">
                  {item.price.toLocaleString()}~
                </span>
                <div className="flex justify-between text-[14px]">
                  <span>{item.company}</span>
                  <span>{item.review}</span>
                </div>
              </a>
            ))}
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
            {PopularPost.map(item => (
              <a
                href="/"
                key={item.id}
                className="flex flex-col rounded-lg w-1/3 gap-[10px] relative group overflow-hidden"
              >
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-[0.97]">
                  <img
                    src={item.image}
                    alt="사진"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="block w-full overflow-hidden">
                  {item.comment}
                </span>
                <span className="text-[18px]">
                  {item.price.toLocaleString()}~
                </span>
                <div className="flex justify-between text-[14px]">
                  <span>{item.company}</span>
                  <span>{item.review}</span>
                </div>
              </a>
            ))}
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
