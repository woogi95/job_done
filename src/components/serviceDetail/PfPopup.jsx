import { PfLayerDiv, PfModalDiv, PhotoAreaDiv } from "./serviceDetail";
// icon
import { CgClose } from "react-icons/cg";
// swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const PfPopup = ({ isPfDetailPop, setIsPfDetailPop }) => {
  return isPfDetailPop ? (
    <PfModalDiv>
      <PfLayerDiv>
        <PhotoAreaDiv>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="pfdetail-img"
          >
            <SwiperSlide>
              <img src="" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="" alt="" />
            </SwiperSlide>
          </Swiper>
        </PhotoAreaDiv>
        <div className="txt-area">
          <h3>타이틀</h3>
          <ul>
            <li>
              <b>서비스 종류</b>
              <p>청소/투룸</p>
            </li>
            <li>
              <b>가격대</b>
              <p>370,000원대</p>
            </li>
            <li>
              <b>소요시간</b>
              <p>5시간</p>
            </li>
          </ul>
          <span>
            신축 입주 청소는 그 무엇보다 공사후 잔해, 분진들이 얼마나 전문적으로
            제거하냐에 따라 청소의 완성도가 결정됩니다.
          </span>
          <button>견적 요청하기</button>
        </div>
        <button
          onClick={() => {
            setIsPfDetailPop(false);
          }}
        >
          <CgClose />
        </button>
      </PfLayerDiv>
    </PfModalDiv>
  ) : (
    <></>
  );
};

export default PfPopup;
