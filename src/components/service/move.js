import styled from "@emotion/styled";

// 레이아웃(임시)
export const LayoutDiv = styled.div`
  max-width: 1280px;
  border: 1px solid #eee;
  margin: 0 auto;
`;

// 서브페이지 - 탑
export const PageTopDiv = styled.div`
  height: 320px;
  background-color: #fbfbfb;
  display: flex;
  justify-content: center;
  align-item: center;

  .inner {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    span {
      display: block;
      text-align: center;
      color: #bbb;
      margin-top: 2px;
      font-size: 14px;
      font-weight: 300;
    }

    ul {
      /* border: 1px solid #eee; */
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 28px 0 14px;
      a {
        background-color: #eee;
        padding: 10px 12px;
        min-width: 100px;
        display: block;
        border-radius: 20px;
        color: #555;
      }
      li a.active {
        background-color: #35c5f0;
        color: #fff;
        font-weight: 700;
        text-shadow: 1px 1px 1px #35c5f0;
      }
    }
    .search {
      /* border: 1px solid #000; */
      width: 420px;
      position: relative;
      height: 40px;
      em {
        position: absolute;
        width: 40px;
        height: 14px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        font-size: 24px;
        color: #35c5f0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 2px solid #35c5f050;
        z-index: 2;
      }
      input {
        width: calc(100% - 82px);
        height: 40px;
        position: absolute;
        left: -1px;
        text-indent: 50px;
        border-radius: 4px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
        /* border: 1px solid #000; */
      }
      input::placeholder {
        color: #bbb;
      }
      button {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 20px;
        height: 40px;
        background-color: #3887ff;
        color: #fff;
      }
    }
  }
`;

// 서브페이지 - 컨텐츠
export const ServiceListContentDiv = styled.div`
  border: 1px solid #eee;
  padding: 80px 0 160px;

  .filter-area {
    display: flex;
    justify-content: end;
    .filter {
      height: 42px;
      min-width: 145px;
      border-radius: 30px;
      background-color: #323232;
      padding: 7px 16px 9px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .list {
    /* border: 1px solid #eee; */
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 50px 20px;
  }
`;

// 서비스 리스트 아이템
export const ListItemDiv = styled.div`
  border: 1px solid #eee;
  width: calc((100% - 60px) / 4);

  /* width: 265px; */
  overflow: hidden;
  border-radius: 8px;
  .thum {
    width: 100%;
    height: 265px;
    background-color: #eee;
    position: relative;
  }

  .like svg {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    color: red;
  }

  .info {
    > em {
      font-size: 14px;
      color: #777;
      margin-bottom: 3px;
    }
    h4 {
      font-size: 15px;
      color: #111;
      line-height: 1.2em;
      margin-bottom: 10px;
    }
    p {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  .countStar {
    display: flex;
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
  }
`;
