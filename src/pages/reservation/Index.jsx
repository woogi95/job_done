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
const schema = yup.object({
  name: yup.string().required("이름은 필수입니다."),
  email: yup
    .string()
    .email("올바른 이메일 형식이 아닙니다.")
    .required("이메일은 필수입니다."),
  address: yup.string().required("주소는 필수입니다."),
  time: yup.string().required("예약 시간을 선택해주세요."),
  pyeong: yup
    .number()
    .required("평수를 입력해주세요.")
    .positive("0보다 큰 값이어야 합니다."),
});
// icon
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import UserReservation from "../../components/papers/UserReservation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
// 다음포스트
// import { useDaumPostcodePopup } from "react-daum-postcode";

function Index() {
  const initData = {
    userId: 0,
    productId: 1,
    totalPrice: 0,
    lat: 0,
    lng: 0,
    address: "",
    comment: "",
    startDate: "",
    pyeong: "",
    options: [
      {
        optionDetailId: 0,
      },
    ],
    mstartTime: "",
  };
  const [formData, setFormData] = useState(initData);
  const [startDate, setStartDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [selectOptions, setSelectOptions] = useState({});
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;

  const getOptionList = async businessId => {
    try {
      const res = await axios.get(`/api/product?businessId=${businessId}`, {
        params: { businessId: businessId },
      });
      console.log("여기", res.data.resultData.optionList);
      setOptionList(res.data.resultData.optionList);
      setProductPrice(res.data.resultData.productPrice);
      setTotalPrice(res.data.resultData.productPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOptionList(businessId);
  }, [businessId]);

  const handleOptionChange = (
    productOptionId,
    optionDetailId,
    optionDetailPrice,
  ) => {
    // 선택된 옵션을 저장
    const updatedSelectOptions = {
      ...selectOptions,
      [productOptionId]: optionDetailId,
    };

    setTotalPrice(updatedTotalPrice);
    setSelectOptions(updatedSelectOptions); // selectOptions를 업데이트
    console.log(selectOptions);

    // 금액 계산 함수 호출
    updateTotalPrice(updatedSelectOptions);
  };

  const handlePyeongChange = e => {
    const pyeong = parseFloat(e.target.value) || 0;
    setFormData({
      ...formData,
      pyeong: e.target.value,
    });
    updateTotalPrice(selectOptions, pyeong);
  };

  const updateTotalPrice = (
    updatedSelectOptions = selectOptions,
    pyeong = formData.pyeong,
  ) => {
    let updatedTotalPrice = productPrice;

    // 평수 금액 계산 (평수에 따른 추가 금액)
    const roomPrice = pyeong * 10000; // 평수 * 10,000원
    updatedTotalPrice += roomPrice;

    // 옵션 금액 추가
    Object.keys(updatedSelectOptions).forEach(optionId => {
      const selectedOption = optionList.find(
        option => option.productOptionId === optionId,
      );

      // selectedOption과 optionDetailList가 존재하는지 체크
      if (selectedOption && selectedOption.optionDetailList) {
        selectedOption.optionDetailList.forEach(item => {
          if (item.optionDetailId === updatedSelectOptions[optionId]) {
            updatedTotalPrice += item.optionDetailPrice;
          }
        });
      }
    });

    // totalPrice 상태 업데이트
    setTotalPrice(updatedTotalPrice);
  };

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = "";
        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }
        setAddress(addr);
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
    return () => {
      document.head.removeChild(script);
    };
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      time: "",
      pyeong: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    setReservationSubmitted(true);
  };

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
                  selected={startDate}
                  onChange={date => {
                    setStartDate(moment(date).format("YYYY-MM-DD"));

                    console.log(moment(date).format("YYYY-MM-DD"));
                  }}
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  inline
                />
              </DateDiv>
              <TimeDiv>
                <h3>시간 선택</h3>
                <div>
                  {rsvTime.map((item, index) => (
                    <div key={index}>
                      <input
                        {...register("time")}
                        type="radio"
                        name="mstartTime"
                        id={`mstartTime-${index}`}
                        value={item}
                      />
                      <label htmlFor={`mstartTime-${index}`}>{item}</label>
                    </div>
                  ))}
                </div>
                {errors.time && <p>{errors.time.message}</p>}
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
                {errors.address && <p>{errors.address.message}</p>}
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
                </label>
                <RoomSizeDiv>
                  <h3>평수입력</h3>
                  <p>
                    <b>*</b>평당 10,000원 입니다.
                  </p>
                  <label>
                    <h4>평수</h4>
                    <input
                      {...register("pyeong")}
                      type="text"
                      placeholder="평수를 숫자로 입력해주세요."
                      value={formData.pyeong}
                      onChange={handlePyeongChange}
                    />
                  </label>
                  {errors.pyeong && <p>{errors.pyeong.message}</p>}
                </RoomSizeDiv>
              </ReservationInfoDiv>
            </LeftContDiv>
            <RightContDiv>
              <SelectOptionDiv>
                <h3>옵션선택</h3>
                <div>
                  {optionList.map(option => (
                    <div key={option.productOptionId}>
                      <h4>{option.optionName}</h4>
                      <div className="option-list">
                        {option.optionDetailList.map(item => (
                          <label
                            htmlFor={item.optionDetailId}
                            key={item.optionDetailId}
                          >
                            <input
                              {...register("option")}
                              type="radio"
                              name={option.productOptionId}
                              id={item.optionDetailId}
                              value={item.optionDetailId}
                              onChange={() =>
                                handleOptionChange(
                                  option.productOptionId,
                                  item.optionDetailId,
                                  item.optionDetailPrice,
                                )
                              }
                              checked={
                                selectOptions[option.productOptionId] ===
                                item.optionDetailId
                              }
                            />
                            <em>
                              <i>
                                {selectOptions[option.productOptionId] ===
                                item.optionDetailId ? (
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
                  name=""
                  id=""
                  placeholder="궁금한 점이나 업체에 남기고 싶은 말을 적어주세요."
                ></textarea>
              </div>
            </BottomContDiv>
            <BtnAreaCustomDiv>
              <button className="cancel" type="button">
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
