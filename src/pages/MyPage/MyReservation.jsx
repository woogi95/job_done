import { useEffect, useState } from "react";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";
import { statusText } from "../../components/ServiceIcon";
import { Select } from "antd";
import { RxCross2 } from "react-icons/rx";

function MyReservation() {
  const [reservation, setReservation] = useState([]);
  const [resState, setResState] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [rating, setRating] = useState(5);
  const [previewImages, setPreviewImages] = useState([]);
  const [reviewContent, setReviewContent] = useState("");

  const handleReviewModalOpen = serviceId => {
    setSelectedServiceId(serviceId);
    setReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
  };

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...imageUrls]);
    e.target.value = "";
  };

  const handleRemoveImage = index => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
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
      // console.log("너 맞니? : ", res.data.resultData);
      setReservation(res.data.resultData);
      setResState(res.data.resultData);
      // console.log("잘 담김? : ", resState);
    } catch (error) {
      console.log(error);
    }
  };

  const reviewWrite = async serviceId => {
    try {
      const imagePromises = previewImages.map(async imageUrl => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });

      const base64Images = await Promise.all(imagePromises);

      const reviewData = {
        pics: [base64Images],
        p: {
          serviceId: serviceId,
          contents: reviewContent,
          score: rating,
        },
      };

      const res = await loginApi.post("/api/review", reviewData);
      console.log("리뷰 쓰기 결과 : ", res);

      setReviewContent("");
      setPreviewImages([]);
      setRating(5);
      handleReviewModalClose();
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
            <span className="flex justify-center items-center text-[20px]">
              리뷰 작성
            </span>
            <div className="h-[1px] my-[20px] bg-[#DBDBDB] max-w-[300px] w-full mx-auto"></div>
            <div className="flex justify-center items-center">
              <span className="flex justify-center items-center">
                솔직한 후기를 남겨보세요!
              </span>
            </div>
            <div className="flex justify-center items-center mt-[10px]">
              <div className="flex justify-between items-center gap-2 w-full max-w-[300px]">
                <Select
                  className="w-[150px]"
                  value={rating}
                  onChange={value => setRating(value)}
                  options={[
                    { value: 1, label: "⭐" },
                    { value: 2, label: "⭐⭐" },
                    { value: 3, label: "⭐⭐⭐" },
                    { value: 4, label: "⭐⭐⭐⭐" },
                    { value: 5, label: "⭐⭐⭐⭐⭐" },
                  ]}
                />
                <label className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                  이미지 추가
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center mt-[10px]">
              <textarea
                placeholder="리뷰를 작성해주세요"
                value={reviewContent}
                onChange={e => setReviewContent(e.target.value)}
                className="flex justify-center items-center w-full max-w-[400px] h-[150px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[10px] resize-none"
              />
            </div>
            <div className="flex justify-center items-center w-full max-w-[420px] min-h-[100px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[10px] mx-auto">
              <div className="flex flex-wrap gap-2 w-full min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-2">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative w-[80px] h-[80px]">
                    <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`preview ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                    >
                      <RxCross2 className="text-[16px]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <button
                onClick={handleReviewModalClose}
                className="mt-4 px-4 py-2 bg-[#3887FF] rounded text-white gap-[10px]"
              >
                보내기
              </button>
              <button
                onClick={handleReviewModalClose}
                className="mt-4 px-4 py-2 bg-gray-200 rounded"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </MyPageLayout>
  );
}

export default MyReservation;
