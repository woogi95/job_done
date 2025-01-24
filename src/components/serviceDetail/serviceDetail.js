import styled from "@emotion/styled";
import { LayoutDiv } from "../service/move";
export const DetailLayout = styled(LayoutDiv)`
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
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
  border: 1px solid;
  max-width: 780px;
  width: 100%;

  nav {
    // position: "fixed",
    top: 0;
    background-color: #fff;
    width: 100%;
    z-index: 1000;
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
      border: 1px solid #bbb;
    }
  }
`;
export const SummaryDiv = styled.div`
  border: 1px solid;
  left: 60%;
  top: 15px;
  z-index: 1001;
  width: 420px;
  height: 500px;
  padding: 30px;

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
      top: 10px;
      right: 10px;
      width: 22px;
      height: 22px;
      color: red;
      cursor: pointer;
    }
  }
  .tit {
    font-size: 26px;
    font-weight: 600;
    line-height: 1.12em;
  }
`;
