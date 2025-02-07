import { useEffect, useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import moment from "moment";
// yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// icon
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import UserReservation from "../../components/papers/UserReservation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  startDate: yup.date().required("날짜를 선택해주세요."),
  pyeong: yup
    .number()
    .required("평수를 입력해주세요.")
    .min(1, "최소 1평 이상 입력해주세요."),
  mstartTime: yup.string().required("시간을 선택해주세요."),
});

function Index() {
  const [detailAddress, setDetailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [selectOptions, setSelectOptions] = useState({});
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [basicPrice, setBasicPrice] = useState();
  const [selectedPrices, setSelectedPrices] = useState({});

  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;

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
      userId: 0,
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

  // 옵션 목록 가져오기
  const getOptionList = async businessId => {
    try {
      const res = await axios.get(`/api/product?businessId=${businessId}`);
      setOptionList(res.data.resultData.optionList);
      setBasicPrice(res.data.resultData.productPrice);
      if (res.data.resultData.optionList.length > 0) {
        const firstOption = res.data.resultData.optionList[0];
        setSelectedPrices({
          [firstOption.productOptionId]:
            firstOption.optionDetailList[0].optionDetailPrice,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOptionList(businessId);
  }, [businessId]);

  const onSubmit = data => {
    const formattedStartDate = moment(data.startDate).format("YYYY-MM-DD");
    const fullAddress = `${address} ${detailAddress}`;
    // const { detailAddress, ...dataWithoutDetailAddress } = data;
    const updatedData = {
      ...data,
      address: fullAddress,
      startDate: formattedStartDate,
      totalPrice: totalPrice,
    };
    console.log(updatedData);
    setReservationSubmitted(true);
  };

  const pyeongVal = watch("pyeong");

  // 총 가격 계산
  const totalPrice =
    basicPrice +
    Object.values(selectedPrices).reduce((sum, price) => sum + price, 0) +
    pyeongVal * 10000;

  // 옵션 변경 처리
  const handleOptionChange = (productOptionId, optionPrice) => {
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
                    {...register("address")}
                    type="text"
                    className="addr"
                    id="address"
                    value={address}
                    readOnly
                  />
                  <button type="button" onClick={handlePostcodeSearch}>
                    주소검색
                  </button>
                </label>
                <label htmlFor="detailAddress">
                  <h4>상세주소</h4>
                  <input
                    {...register("detailAddress")}
                    type="text"
                    id="detailAddress"
                    placeholder="상세 주소를 입력해주세요"
                    value={detailAddress}
                    onChange={e => setDetailAddress(e.target.value)}
                  />
                  {errors.detailAddress && (
                    <p>{errors.detailAddress.message}</p>
                  )}
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
              <button className="confirm" type="submit">
                예약하기
              </button>
            </BtnAreaCustomDiv>
          </form>
        </ReserVationContDiv>
      </LayoutDiv>
    </ReservationDiv>
  );
}

export default Index;
