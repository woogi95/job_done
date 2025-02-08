import { ko } from "date-fns/locale";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LayoutDiv } from "../page";
import {
  BottomContDiv,
  BtnAreaCustomDiv,
  DateDiv,
  LeftContDiv,
  ReserVationContDiv,
  ReservationDiv,
  ReservationInfoDiv,
  RightContDiv,
  RoomSizeDiv,
  SelectOptionDiv,
  TimeDiv,
  TotalPriceDiv,
} from "./reservation";
// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// icon
import axios from "axios";
import { useForm } from "react-hook-form";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginApi } from "../../apis/login";
import { businessDetailState, serviceIdState } from "../../atoms/businessAtom";
import UserReservation from "../../components/papers/UserReservation";
import { setCookie } from "../../apis/cookie";

const schema = yup.object({
  productId: yup.number(),
  startDate: yup.date().required("날짜를 선택해주세요."),
  pyeong: yup.number().required("평수를 입력해주세요."),
  mstartTime: yup.string().required("시간을 선택해주세요."),
  lat: yup.number(),
  lng: yup.number(),
  address: yup.string(),
  comment: yup.string(),
  totalPrice: yup.number(),
  options: yup.array(),
});

function Index() {
  const [detailAddress, setDetailAddress] = useState("");
  const [address, setAddress] = useState("");
  // const [selectOptions, setSelectOptions] = useState({});
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [basicPrice, setBasicPrice] = useState();
  const [selectedPrices, setSelectedPrices] = useState({});
  const [productId, setProductId] = useState(1);
  const [selectedOption, setSelectedOption] = useState([]);
  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;
  // const [optionDetailIdList, setOptionDetailIdList] = useState()
  const [isTest, setIsTest] = useState();
  const [serviceId, setServiceId] = useRecoilState(serviceIdState);
  useEffect(() => {
    console.log("serviceId", serviceId);
  }, [serviceId]);

  // 최종 API 로 보낼 데이터 모양
  const [sendAllData, setSendAllData] = useState([]);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      productId: 1,
      totalPrice: 0,
      lat: 0,
      lng: 0,
      address: "",
      comment: "",
      startDate: new Date(),
      pyeong: "",
      options: [{ optionDetailId: 0 }],
      mstartTime: "08:00",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(
      "===== 아래에서 원하는 옵션을 만들겠습니다. 하단 코드 복사해서 사용하세요. ======",
    );
    // console.log(sendAllData);
    const sendOptionData = sendAllData.map(item => ({
      optionDetailId: item.optionDetailId,
    }));
    console.log(sendOptionData);
  }, [sendAllData]);

  // 옵션 목록 가져오기
  const getOptionList = async businessId => {
    try {
      const res = await axios.get(`/api/product?businessId=${businessId}`);
      setOptionList(res.data.resultData.optionList);
      setBasicPrice(res.data.resultData.productPrice);
      setProductId(res.data.resultData.productId);
      if (res.data.resultData.optionList.length > 0) {
        const firstOption = res.data.resultData.optionList[0];
        setSelectedPrices({
          [firstOption.productOptionId]:
            firstOption.optionDetailList[0].optionDetailPrice,
        });
      }

      // console.log("너란다 : ", res.data.resultData.optionList);

      const listTempArr = res.data.resultData.optionList.map(item => ({
        productOptionId: item.productOptionId,
        optionDetailId: item.optionDetailList[0].optionDetailId,
      }));

      setSendAllData(listTempArr);
    } catch (error) {
      console.log(error);
    }
  };

  const postReservation = async data => {
    try {
      const res = await loginApi.post(`/api/service`, data);
      const resultData = res.data.resultData;

      setIsTest(resultData);
      console.log("서비스 아이디가 맞나요?", res.data.resultData.serviceId);
      setServiceId(res.data.resultData.serviceId);
      setCookie("serviceId", res.data.resultData.serviceId);

      // console.log(resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOptionList(businessId);
  }, [businessId]);

  const onSubmit = data => {
    const sendOptionData = sendAllData.map(item => ({
      optionDetailId: item.optionDetailId,
    }));
    const formattedStartDate = moment(data.startDate).format("YYYY/MM/DD");
    // const fullAddress = `${address} ${detailAddress}`;
    // const { detailAddress, ...dataWithoutDetailAddress } = data;
    // const options = sendOptionData;
    const updatedData = {
      ...data,
      // address: fullAddress,
      startDate: formattedStartDate,
      totalPrice: totalPrice,
      productId: productId,
      options: sendOptionData,
    };
    console.log("!!!!", updatedData);
    postReservation(updatedData);
    setReservationSubmitted(true);
  };

  // useEffect(() => {
  //   postReservation();
  //   console.log("얼으으으으음!! : ", isTest);
  // }, []);

  const pyeongVal = watch("pyeong");

  // 총 가격 계산
  const totalPrice =
    basicPrice +
    Object.values(selectedPrices).reduce((sum, price) => sum + price, 0) +
    pyeongVal * 10000;

  // 옵션 변경 처리
  const handleOptionChange = (productOptionId, optionPrice, optionDetailId) => {
    console.log("productOptionId : ", productOptionId);
    console.log("optionPrice : ", optionPrice);
    console.log("optionDetailId : ", optionDetailId);
    console.log("----------");

    const resultArr = sendAllData.map(item => {
      if (productOptionId === item.productOptionId) {
        item.optionDetailId = optionDetailId;
      }
      return item;
    });
    // 최종 선택된 데이터
    setSendAllData(resultArr);

    setSelectedPrices(prev => {
      const updatedPrices = Object.keys(prev)
        .filter(key => key !== productOptionId)
        .reduce((obj, key) => {
          obj[key] = prev[key];
          return obj;
        }, {});

      return {
        ...updatedPrices,
        [productOptionId]: optionPrice,
      };
    });
    setSelectedOption(prev => {
      const updatedOptionDetail = Object.keys(prev)
        .filter(key => key !== productOptionId)
        .reduce((obj, key) => {
          obj[key] = prev[key];
          return obj;
        }, {});
      // updatedOptionDetail.map(item => {});
      return {
        ...updatedOptionDetail,
        [productOptionId]: optionDetailId, // ✅ 기존 구조 유지하면서 새로운 값 추가
      };
    });
  };

  // 주소 검색
  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        const addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        setAddress(addr);
        setValue("address", addr);
        document.getElementById("detailAddress").focus();
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    // setValue("address", `${address} ${detailAddress}`);
    // console.log(watch("address"));
    console.log("옵션 아이디", selectedOption);
  }, [address, detailAddress, selectedOption]);

  if (reservationSubmitted) {
    return <UserReservation />;
  }

  const rsvTime = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  return (
    <ReservationDiv>
      {!reservationSubmitted && (
        <LayoutDiv>
          <h2 className="tit">예약하기</h2>
          <ReserVationContDiv>
            <form onSubmit={handleSubmit(onSubmit)}>
              <LeftContDiv>
                <DateDiv>
                  <h3>날짜선택</h3>
                  <p>
                    <b>*</b>서비스 받으실 날짜를 선택해주세요.
                  </p>
                  <DatePicker
                    selected={watch("startDate")}
                    onChange={date => {
                      if (date) {
                        setValue("startDate", date);
                      }
                    }}
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                    inline
                  />
                  {errors.startDate && <p>{errors.startDate.message}</p>}
                </DateDiv>
                <TimeDiv>
                  <h3>시간 선택</h3>
                  <div>
                    {rsvTime.map((item, index) => (
                      <div key={index}>
                        <input
                          {...register("mstartTime")}
                          type="radio"
                          name="mstartTime"
                          id={`mstartTime-${index}`}
                          value={item}
                        />
                        <label htmlFor={`mstartTime-${index}`}>{item}</label>
                      </div>
                    ))}
                  </div>
                  {errors.mstartTime && <p>{errors.mstartTime.message}</p>}
                </TimeDiv>
                <ReservationInfoDiv>
                  <h3>예약자 정보</h3>
                  <label htmlFor="address">
                    <h4>주소</h4>
                    <input
                      // {...register("address")}
                      type="text"
                      className="addr"
                      id="address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      readOnly
                    />
                    <button type="button" onClick={handlePostcodeSearch}>
                      주소검색
                    </button>
                  </label>
                  <label htmlFor="detailAddress">
                    <h4>상세주소</h4>
                    <input
                      type="text"
                      id="detailAddress"
                      placeholder="상세 주소를 입력해주세요"
                      value={detailAddress}
                      // {...register("detailAddress")}
                      onChange={e => setDetailAddress(e.target.value)}
                    />
                    {/* {errors.detailAddress && (
                    <p>{errors.detailAddress.message}</p>
                  )} */}
                  </label>
                  <RoomSizeDiv>
                    <h3>평수입력</h3>
                    <p>
                      <b>*</b>평당 10,000원 입니다.
                    </p>
                    <label>
                      <h4>평수</h4>
                      <input
                        type="number"
                        placeholder="평수를 숫자로 입력해주세요."
                        {...register("pyeong")}
                      />
                      {errors.pyeong && <p>{errors.pyeong.message}</p>}
                    </label>
                  </RoomSizeDiv>
                </ReservationInfoDiv>
              </LeftContDiv>

              <RightContDiv>
                <SelectOptionDiv>
                  <h3>옵션선택</h3>
                  <div>
                    {optionList.map((option, index) => (
                      <div key={index}>
                        <h4>{option.optionName}</h4>
                        <div className="option-list">
                          {option.optionDetailList.map(item => (
                            <label
                              htmlFor={item.optionDetailId}
                              key={item.optionDetailId}
                            >
                              <input
                                type="radio"
                                name={`option-${option.productOptionId}`}
                                id={item.optionDetailId}
                                onChange={() =>
                                  handleOptionChange(
                                    option.productOptionId,
                                    item.optionDetailPrice,
                                    item.optionDetailId,
                                  )
                                }
                                checked={
                                  selectedPrices[option.productOptionId] ===
                                  item.optionDetailPrice
                                }
                              />
                              <em>
                                <i>
                                  {selectedPrices[option.productOptionId] ===
                                  item.optionDetailPrice ? (
                                    <BsCheckCircleFill className="text-[#34A5F0]" />
                                  ) : (
                                    <BsCircle className="text-[#333]" />
                                  )}
                                </i>
                                <b>{item.optionDetailName}</b>
                              </em>
                              <span>
                                {item.optionDetailPrice.toLocaleString()}원
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SelectOptionDiv>
                <TotalPriceDiv>
                  <h3>예상금액</h3>
                  <div>
                    <h4>총금액</h4>
                    <p>{totalPrice.toLocaleString()}원</p>
                  </div>
                </TotalPriceDiv>
              </RightContDiv>

              <BottomContDiv>
                <div>
                  <h3>문의사항</h3>
                  <textarea
                    {...register("comment")}
                    name="comment"
                    id="comment"
                    placeholder="궁금한 점이나 업체에 남기고 싶은 말을 적어주세요."
                  ></textarea>
                </div>
              </BottomContDiv>

              <BtnAreaCustomDiv>
                <button className="cancel" type="button" onClick={handleBack}>
                  뒤로가기
                </button>
                <button
                  className="confirm"
                  type="submit"
                  // onClick={setValue(sendOptionData)}
                >
                  예약하기
                </button>
              </BtnAreaCustomDiv>
            </form>
          </ReserVationContDiv>
        </LayoutDiv>
      )}

      {reservationSubmitted && <UserReservation />}
    </ReservationDiv>
  );
}

export default Index;
