import { FaStar } from "react-icons/fa";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { ListItemDiv } from "./service";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
const ServiceListItem = () => {
  const [isLike, setIsLike] = useState(false);
  const { id } = useParams();
  const ToggleLike = e => {
    e.preventDefault();
    setIsLike(!isLike);
  };
  return (
    <ListItemDiv>
      <Link to="/service/id">
        <div className="thum">
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
          <em>업체명</em>
          <h4>두 줄 타이틀입니다. 두 줄 타이틀입니다. 두 줄 타이틀입니다.</h4>
          <p>50,000 ~</p>
          <div className="countStar">
            <FaStar />
            <em>4.2</em>
            <span>(7500)</span>
          </div>
        </div>
      </Link>
    </ListItemDiv>
  );
};
export default ServiceListItem;
