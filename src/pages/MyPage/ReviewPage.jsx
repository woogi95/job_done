import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";
import { Select, Pagination } from "antd";
import { RxCross2 } from "react-icons/rx";

function ReviewPage() {
  const picURL = "http://112.222.157.156:5224";
  const [review, setReview] = useState([]);
  const [correctModalOpen, setCorrectModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const reviewList = async () => {
    try {
      const res = await loginApi.get("/api/review", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setReview(Array.isArray(res.data.resultData) ? res.data.resultData : []);
      console.log(
        "리뷰 데이터의 pics:",
        res.data.resultData.map(item => item.pics),
      );
    } catch (error) {
      console.error("리뷰 목록 조회 실패:", error.response || error);
      setReview([]);
    }
  };

  const correctReview = async () => {
    if (!selectedReview) return;

    try {
      const reviewData = {
        reviewId: selectedReview.reviewId,
        contents: reviewContent,
        score: rating,
      };

      const reviewRes = await loginApi.put(
        `/api/review/${selectedReview.reviewId}`,
        reviewData,
      );
      console.log("리뷰 수정 성공:", reviewRes);

      if (selectedImages.length > 0) {
        await loginApi.put("/api/review/state", {
          reviewId: selectedReview.reviewId,
        });

        const formData = new FormData();
        selectedImages.forEach(image => {
          if (image instanceof File) {
            formData.append("files", image);
          }
        });
        formData.append("reviewId", selectedReview.reviewId);

        const imageRes = await loginApi.post("/api/review/pics", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("이미지 업로드 성공:", imageRes);
      }

      alert("리뷰가 수정되었습니다.");
      handleReviewModalClose();
      reviewList();
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  const correctReviewImg = async () => {
    try {
      const res = await loginApi.put("/api/review/state");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReview = async reviewId => {
    try {
      const res = await loginApi.delete(`/api/review`, {
        params: {
          reviewId: reviewId,
        },
      });
      if (res.status === 200) {
        alert("리뷰가 삭제되었습니다.");
        reviewList();
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      alert("리뷰 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    reviewList();
  }, []);

  const handleImageUpload = event => {
    const files = Array.from(event.target.files);
    setSelectedImages(prevImages => [...prevImages, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviews]);
    console.log("선택된 이미지:", files);
  };

  const handleRemoveImage = index => {
    const newSelectedImages = [...selectedImages];
    const newPreviewImages = [...previewImages];

    newSelectedImages.splice(index, 1);
    newPreviewImages.splice(index, 1);

    setSelectedImages(newSelectedImages);
    setPreviewImages(newPreviewImages);
  };

  const handleReviewModalOpen = review => {
    setSelectedReview(review);
    setRating(review.score);
    setReviewContent(review.contents);
    if (review.pics && Array.isArray(review.pics)) {
      const filteredPics = review.pics.filter((_, index) => index % 2 === 0);
      const previews = filteredPics.map(pic => `${picURL}${pic}`);
      setPreviewImages(previews);
      setSelectedImages(filteredPics);
    }
    setCorrectModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setCorrectModalOpen(false);
    setSelectedReview(null);
    setRating(0);
    setReviewContent("");
    setPreviewImages([]);
    setSelectedImages([]);
  };

  const handleDeleteModalOpen = reviewId => {
    setSelectedReviewId(reviewId);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setSelectedReviewId(null);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = review.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <MyPageLayout>
      <div className="flex flex-col justify-center items-center gap-y-[20px]">
        <span className="flex justify-center items-center text-[24px] font-normal pb-[20px]">
          작성한 리뷰
        </span>
        {currentReviews.map((item, index) => (
          <div key={index} className="w-full max-w-[600px] h-[130px]">
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-[5px]">
                <div>
                  <img
                    src={`${picURL}${item?.writerPic}` || ""}
                    alt="로고"
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <div className="flex justify-center items-center gap-[5px]">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < item?.score
                              ? "text-[#FF9D00]"
                              : "text-[#DBDBDB]"
                          }`}
                        />
                      ))}
                      <span className="ml-1">{item?.score}점</span>
                    </div>
                    <div className="text-[#A8A8A8] text-[14px] flex justify-center items-center">
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex">
                    {item?.name
                      ? item.name.charAt(0) + "*".repeat(item.name.length - 1)
                      : ""}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-[10px]">
                <button
                  onClick={() => handleReviewModalOpen(item)}
                  className="flex justify-center items-center font-semibold text-[#1e1e1e] underline"
                >
                  리뷰수정
                </button>
                <button
                  onClick={() => handleDeleteModalOpen(item.reviewId)}
                  className="font-semibold text-[#F53A3A]"
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="flex justify-between py-[10px]">
              <div className="text-[16px] font-medium">{item.contents}</div>
              <div className="flex gap-2 mt-2">
                {Array.isArray(item.pics) &&
                  item.pics
                    .filter((_, picIndex) => picIndex % 2 === 0)
                    .slice(0, 2)
                    .map((pic, picIndex) => (
                      <img
                        key={picIndex}
                        src={`${picURL}${pic}`}
                        alt={`리뷰 이미지 ${picIndex + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center h-[1px] bg-[#DBDBDB] max-w-[600px] w-full"></div>

        {/* 페이지네이션 컴포넌트 추가 */}
        <div className="my-4">
          <Pagination
            current={currentPage}
            total={review.length}
            pageSize={reviewsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      {correctModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col justify-center bg-white p-6 rounded-lg w-[500px]">
            <span className="flex justify-center items-center text-[20px]">
              리뷰 수정
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
                      className="absolute -top-2 -right-2 bg-[#F53A3A] text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                    >
                      <RxCross2 className="text-[16px]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <button
                onClick={correctReview}
                className="mt-4 px-4 py-2 bg-[#3887FF] rounded text-white gap-[10px]"
              >
                수정하기
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

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col justify-center bg-white p-6 rounded-lg w-[400px]">
            <span className="flex justify-center items-center text-[20px] mb-4">
              리뷰 삭제
            </span>
            <p className="text-center mb-6">
              정말로 이 리뷰를 삭제하시겠습니까?
            </p>
            <div className="flex justify-center items-center gap-[10px]">
              <button
                onClick={() => deleteReview(selectedReviewId)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                삭제
              </button>
              <button
                onClick={handleDeleteModalClose}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </MyPageLayout>
  );
}

export default ReviewPage;
