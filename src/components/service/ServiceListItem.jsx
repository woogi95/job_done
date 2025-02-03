import { FaStar } from "react-icons/fa";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { ListItemDiv } from "./service";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const ServiceListItem = ({ business }) => {
  const [isLike, setIsLike] = useState(false);
  const { id } = useParams();
  const ToggleLike = e => {
    e.preventDefault();
    setIsLike(!isLike);
  };

  useEffect(() => {
    if (business.like === 1) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [business.like]);
  return (
    <ListItemDiv>
      <Link to="/service/${business.businessId}">
        <div className="thum">
          <img src={business.pic} alt="" />
          <div
            className="like"
            onClick={e => {
              ToggleLike(e);
            }}
          >
            {isLike ? <BsHeartFill /> : <BsHeart style={{ color: "gray" }} />}
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
