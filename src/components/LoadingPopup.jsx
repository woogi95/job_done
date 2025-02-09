import { LoadingDiv } from "./pay";

const LoadingPopup = () => {
  return (
    <LoadingDiv>
      <div className="loading-spinner"></div>
      <p>로딩 중...</p>
    </LoadingDiv>
  );
};

export default LoadingPopup;
