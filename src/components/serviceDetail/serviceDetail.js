import styled from "@emotion/styled";
import { LayoutDiv } from "../service/move";
export const DetailLayout = styled(LayoutDiv)`
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
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
    /* border: 1px solid; */
    > em {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 5px 0 16px;
    }

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
// DetailContents
export const DetailContentsDiv = styled.div`
  /* border: 1px solid; */
  max-width: 780px;
  width: 100%;

  nav {
    // position: "fixed",
    top: 80px;
    background-color: #fff;
    width: 100%;
    z-index: 2;
    padding: 17px 0;
    ul {
      display: flex;
      gap: 40px;
      li a {
        cursor: pointer;
      }
    }
  }
  .cont {
    div {
      height: 100vh;
      /* border: 1px solid #bbb; */
    }
  }
`;
export const SummaryDiv = styled.div`
  top: 0px;
  right: 0;
  z-index: 3;
  position: absolute;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .inner {
    width: 400px;
    height: 500px;
    padding: 30px;
    position: relative;

    .top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 24px;
        font-weight: 700;
      }

      .like svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        width: 24px;
        height: 24px;
        color: red;
        cursor: pointer;
      }
    }
    .tit {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.1em;
      margin: 10px 0;
    }

    .desc {
      /* border: 1px solid #eee; */
      display: flex;
      align-items: center;
      gap: 10px;

      .box {
        border-radius: 15px;
        gap: 10px;
        background-color: #c3eefb;
        color: #0062eb;
        font-weight: 600;
        padding: 5px 10px;
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
        height: 45px;
        line-height: 41px;
        text-align: center;
        border-radius: 5px;
      }
      button {
        background-color: #34c5f0;
        color: #fff;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
      }
      a {
        color: #34c5f0;
      }
    }
  }
`;
export const CountStarCustomDiv = styled(CountStarDiv)`
  /* border: 1px solid; */
  margin: 8px 0 20px;
  justify-content: start;
`;
