import { FaStar } from "react-icons/fa";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { ListItemDiv } from "./service";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { likeStatusState } from "../../atoms/like";


const ServiceListItem = ({ business, onClick }) => {
  const [likeStatus] = useRecoilState(likeStatusState);
  const currentLikeStatus = likeStatus[business.businessId] || {
    isLiked: false,

import axios from "axios";
import { loginApi } from "../../apis/login";
const ServiceListItem = ({ business }) => {
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);
  const businessDetail = useRecoilValue(businessDetailState);
  const loginUserState = useRecoilValue(loginUser);
  const userId = loginUserState.userId;
  const businessId = businessDetail.businessId;

  const ToggleLike = async e => {
    e.preventDefault();
    // setLikeStatus({
    //   ...likeStatus,
    //   isLiked: !likeStatus.isLiked,
    //   businessId,
    // });
    setLikeStatus({ businessId: businessId, isLiked: !likeStatus.isLiked });

    try {
      // POST 요청 보내기
      const response = await loginApi.post("/api/like", {
        businessId,
      });

      if (response.status === 200) {
        console.log("success:", response.data);
      } else {
        console.log("Failed:", response.data);
      }
    } catch (error) {
      console.error(error);
    }

  };
  console.log("!! business", business);
  return (
    <ListItemDiv>
      {/* /service/detail?serviceId=1 */}
      <Link to={`/service/${business.businessId}`}>
        <div className="thum">
          <img src={business.pic} alt={business.businessName} />
          <div
            className="like"
            onClick={e => {
              e.preventDefault();
              onClick();
            }}
          >
            {currentLikeStatus.isLiked ? (
              <BsHeartFill />
            ) : (
              <BsHeart style={{ color: "gray" }} />
            )}
          </div>
        </div>
        <div className="info">
          <em>{business.businessName}</em>
          <h4>{business.title}</h4>
          <p>{business.price.toLocaleString()} ~</p>
          <div className="countStar">
            <FaStar />
            <em>{business.scoreAvg}</em>
            <span>({business.reviewCount.toLocaleString()})</span>
          </div>
        </div>
      </Link>
    </ListItemDiv>
  );
};
export default ServiceListItem;
