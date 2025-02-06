import { FaStar } from "react-icons/fa";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { ListItemDiv } from "./service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginUser } from "../../atoms/loginAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { likeStatusState } from "../../atoms/like";
import axios from "axios";
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
      const response = await axios.post("/api/like", {
        userId,
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
  useEffect(() => {
    if (likeStatus.businessId) {
      setLikeStatus({
        ...likeStatus,
        isLiked: likeStatus.isLiked,
        businessId,
      });
    }
  }, [businessId, setLikeStatus]);
  console.log("!! business", business);
  return (
    <ListItemDiv>
      {/* /service/detail?serviceId=1 */}
      <Link to={`/service/${business.businessId}`}>
        <div className="thum">
          <img src={business.pic} alt="" />
          <div
            className="like"
            onClick={e => {
              ToggleLike(e);
            }}
          >
            {likeStatus.isLiked ? (
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
