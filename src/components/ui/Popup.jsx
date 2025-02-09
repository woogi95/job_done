import { useNavigate } from "react-router-dom";
import { PopupContDiv, PopupDiv } from "./ui";

export const Popup = ({
  isOpen,
  onClose,
  title,
  message,
  onCancel,
  showCancelButton,
  showConfirmButton,
  cancelLink,
  confirmLink,
}) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  // 확인 네비
  const handleConfirmClick = () => {
    if (confirmLink) {
      navigate(confirmLink);
    } else if (onClose) {
      onClose();
    }
  };
  // 취소 네비
  const handleCancelClick = () => {
    if (cancelLink) {
      navigate(cancelLink);
    } else if (onCancel) {
      onCancel();
    }
  };
  return (
    <PopupDiv>
      <PopupContDiv>
        {title && <h4>{title}</h4>}

        {message && <span>{message}</span>}

        <div className="btn-area">
          {showCancelButton && (
            <button type="button" onClick={handleCancelClick}>
              취소
            </button>
          )}

          {showConfirmButton && (
            <button type="button" onClick={handleConfirmClick}>
              확인
            </button>
          )}
        </div>
      </PopupContDiv>
    </PopupDiv>
  );
};
