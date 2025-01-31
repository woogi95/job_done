import styled from "@emotion/styled";
import { EListContDiv } from "../reservation-management/reservationMangement";

export const TitleAreaDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    height: 35px;
    gap: 5px;
    background-color: #11b1e1;
    box-shadow: -1px 3px 4px rgba(9, 126, 161, 0.6);
    transition: all 0.3s;
    color: #fff;
    &:hover {
      background-color: rgb(12, 145, 185);
    }
    svg {
      transform: translateY(1px);
    }
  }
`;
// 포트폴리오리스트
export const PortfolioListDiv = styled(EListContDiv)`
  border: 1px solid #eee;
  display: flex;
  gap: 30px;
  max-height: calc(100% - 100px);
  overflow: auto;
`;
export const PortfolioListItemDiv = styled.div`
  width: calc((100% - 90px) / 4);
  height: 213px;
  border: 1px solid #ddd;
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  position: relative;

  .thum {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fdfdfd;
    img {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: cover;
    }
  }
  .txt-area {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    h4 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .btn-area {
      /* border: 1px solid; */
      display: flex;
      align-items: center;
      gap: 10px;
      button {
        height: 30px;
        text-align: center;
        width: 50%;
        border-radius: 3px;
        background-color: #eee;
        font-size: 14px;
      }
    }
  }
`;
