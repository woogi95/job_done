import { useEffect, useState } from "react";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";
import { statusText } from "../../components/ServiceIcon";
import { Select } from "antd";

function MyReservation() {
  const [reservation, setReservation] = useState([]);
  const [resState, setResState] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const handleReviewModalOpen = serviceId => {
    setSelectedServiceId(serviceId);
    setReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
  };

  const reservationData = async () => {
    try {
      const res = await loginApi.get("/api/service", {
        params: {
          status: 3,
          page: 1,
          size: 10,
        },
      });
      console.log("너 맞니? : ", res.data.resultData);
      setReservation(res.data.resultData);
      setResState(res.data.resultData);
      console.log("잘 담김? : ", resState);
    } catch (error) {
      console.log(error);
    }
  };

  const reviewWrite = async serviceId => {
    try {
      const res = await loginApi.post("/api/review", {
        pics: [""],
        p: {
          serviceId: serviceId,
          contents: "",
          score: 0,
        },
      });
      console.log("리뷰 쓰기 결과 : ", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reservationData();
  }, []);

  return (
    <MyPageLayout>
      <div className="flex flex-col justify-center items-center gap-y-[20px]">
        <span className="flex justify-center items-center text-[24px] font-normal">
          예약현황
        </span>
        <div className="w-full max-w-[800px]">
          {reservation.map(item => (
            <div key={item.id} className="mb-[15px]">
              <div className="flex flex-col gap-[10px] px-[55px]">
                <div className="flex justify-between">
                  <span>예약일 : {item.createdAt}</span>
                  <button onClick={() => window.open("", "_blank")}>
                    상세보기
                  </button>
                </div>
                <div className="flex">{item.businessName}</div>
                <div className="flex">{item.productName}</div>
                <div className="flex justify-between">
                  <span>{item.price.toLocaleString()}원</span>
                  <span className="text-[#FF3044]">
                    {statusText[item.completed] || "알 수 없음"}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-[15px]">
                  <button
                    disabled={[0, 1, 6].includes(item.completed)}
                    onClick={() =>
                      ![0, 1, 6].includes(item.completed) &&
                      [7, 8, 9].includes(item.completed) &&
                      handleReviewModalOpen(item.id)
                    }
                    className={`flex justify-center items-center max-w-[340px] w-full h-[40px] rounded-lg border-[#ABABAB] border-[1px]
                      ${
                        [0, 1, 6].includes(item.completed)
                          ? "bg-[#D9D9D9] cursor-not-allowed text-[#C3C3C3]"
                          : "bg-[#3887FF] hover:bg-[#2d6cd9] text-[#FFFFFF]"
                      }`}
                  >
                    {[7, 8, 9].includes(item.completed)
                      ? "리뷰쓰기"
                      : "결제하기"}
                  </button>
                  <button className="flex justify-center items-center max-w-[340px] w-full h-[40px] text-[#1e1e1e] bg-[#ffffff] rounded-lg border-[#ABABAB] border-[1px]">
                    {[7, 8, 9].includes(item.completed)
                      ? "문의하기"
                      : "예약취소"}
                  </button>
                </div>
              </div>
              <div className="h-[1px] bg-slate-900 mx-auto my-[20px] w-[85%] flex justify-center items-center"></div>
            </div>
          ))}
        </div>
      </div>

      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col justify-center bg-white p-6 rounded-lg w-[500px]">
            <span className="flex justify-center items-center text-[20px] mb-4">
              리뷰 작성
            </span>
            <div className="flex justify-center items-center h-[1px] my-[10px] bg-[#DBDBDB] max-w-[200px]"></div>
            <div className="flex justify-center items-center">
              <span className="flex justify-center items-center">
                솔직한 후기를 남겨보세요!
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center">
                <Select
                  className="max-w-[100px] w-full"
                  placeholder="별점"
                  options={[{ value: 1, label: 1 }]}
                />
                <button>이미지 추가</button>
              </div>
            </div>
            <button
              onClick={handleReviewModalClose}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </MyPageLayout>
  );
}

export default MyReservation;
