import styled from "@emotion/styled";
import { LayoutDiv } from "../service/move";
export const DetailLayout = styled(LayoutDiv)`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
export const DetailTopDiv = styled.div`
  background-color: #f3fcfe;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  .inner {
    max-width: 1280px;
    width: 100%;
    > em {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 5px 0 16px;
    }

    /* 회사 정보 */
    .companyInfo {
      /* border: 1px solid #000; */
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      .logo {
        width: 50px;
        height: 50px;
        background-color: #eee;
        border-radius: 3px;
      }
      .txt {
        display: flex;
        justify-content: center;
        gap: 5px;
        flex-direction: column;
        h3 {
          font-size: 18px;
          font-weight: 700;
          em {
            font-size: 13px;
            font-weight: 400;
            color: #555;
          }
        }
        b {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }

    .desc {
      border: 1px solid rgb(100, 210, 244);
      background-color: #fff;
      border-radius: 5px;
      max-width: 600px;
      padding: 10px 0;
      display: flex;
      .box {
        border-right: 2px solid rgba(100, 210, 244, 0.27);
        max-width: 200px;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 6px;
        &:last-child {
          border-right-color: transparent;
        }
        b {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
        }
        div {
          font-weight: 600;
        }
      }
    }
  }
`;

export const CountStarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  svg {
    font-size: 16px;
    color: #ff9d00;
  }
  em {
    font-size: 15px;
    color: #333;
  }
  span {
    font-size: 14px;
    color: #bbb;
    font-weight: 500;
  }
`;
// 왼쪽 - DetailContents
export const DetailContentsDiv = styled.div`
  max-width: 830px;
  width: 100%;

  nav {
    // position: "fixed",
    top: 80px;
    background-color: #fff;
    width: 100%;
    z-index: 2;
    padding: 25px 0;
    border-bottom: 1px solid #eee;
    ul {
      display: flex;
      gap: 40px;
      li a {
        cursor: pointer;
      }
    }
  }
`;
export const DContsDiv = styled.div`
  /* border: 1px solid #bbb; */
  /* height: 100vh; */
  .box {
    padding: 0px 0 30px;

    &:nth-of-type(2) {
      border-top: 4px solid #3887ff;
      border-bottom: 4px solid #3887ff;
    }

    h2 {
      border-bottom: 2px solid #3887ff80;
      font-size: 20px;
      font-weight: 600;
      padding: 20px 0;
    }

    p {
      padding: 20px 10px;
      color: #333;
      line-height: 1.5em;
      color: #333;
    }
    > img {
      padding: 0px 10px;
    }
  }
`;
export const PortfolioSwiperDiv = styled.div`
  padding: 20px 10px;
  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.13);
    border-radius: 100%;
  }
  .swiper-button-prev {
    left: 0;
    transform: translateX(-50%);
  }
  .swiper-button-next {
    right: 0;
    transform: translateX(50%);
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: normal;
    content: "";
    width: 30px;
    height: 30px;
    background: url("../images/arrow-right.svg") no-repeat center / 12px;
    transform: translate(0.5px, -1px);
  }

  .swiper-button-prev:after {
    transform: rotate(180deg) translate(0.5px, -1px);
  }
`;

// 포트폴리오 컨텐츠 스와이퍼
export const PortfolioListItem = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;

  .imgbox {
    position: absolute;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }

    &::after {
      content: "";
      display: block;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3) 62%,
        rgba(0, 0, 0, 0.7)
      );
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
    }
  }
  h3 {
    color: #fff;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 18px;
  }
`;

// 오른쪽
export const SummaryDiv = styled.div`
  top: 0px;
  right: 0;
  z-index: 3;
  position: absolute;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .inner {
    width: 330px;
    min-height: 380px;
    padding: 40px 30px;
    position: relative;

    .top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        /* line-height: 1.5em; */
      }

      .like svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        width: 22px;
        height: 22px;
        color: red;
        cursor: pointer;
      }
    }
    .tit {
      word-break: keep-all;
      font-size: 22px;
      font-weight: 600;
      line-height: 1.23em;
      margin: 15px 0 8px;
    }

    .desc {
      /* border: 1px solid #eee; */
      display: flex;
      align-items: center;
      gap: 6px;

      .box {
        border-radius: 15px;
        gap: 10px;
        background-color: #c3eefb65;
        color: #0062eb;
        font-weight: 600;
        padding: 5px 10px;
        font-size: 11px;
        display: flex;
        justify-content: space-between;
        div {
          color: #064153;
        }
      }
    }
    .btn-area {
      position: absolute;
      bottom: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      & > * {
        border: 2px solid #34c5f0;
        width: 80%;
        height: 40px;
        line-height: 36px;
        font-size: 15px;
        text-align: center;
        border-radius: 5px;
      }
      button {
        background-color: #34c5f0;
        color: #fff;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
      }
      a {
        color: #34c5f0;
      }
    }
  }
`;
export const CountStarCustomDiv = styled(CountStarDiv)`
  /* border: 1px solid; */
  margin: 3px 0 12px;
  justify-content: start;
  em {
    font-size: 12px;
    margin: 0 2px 0 3px;
  }
  span {
    font-size: 12px;
  }
`;
