import styled from "@emotion/styled";

export const ModalDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;
export const LayerDiv = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #fff;
  min-height: 580px;
  border-radius: 12px;
  padding: 40px 50px;
  border: 1px solid rgba(53, 96, 177, 0.15);
  box-shadow:
    rgba(53, 96, 177, 0.2) 0px 10px 15px -3px,
    rgba(11, 22, 41, 0.05) 0px 4px 6px -2px;

  .tit {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }

  label {
    border: 1px solid #bbb;
    display: flex;
    margin-bottom: 12px;

    h2 {
      height: 38px;
      width: 80px;
      border-right: 1px solid #ccc;
      font-size: 15px;
      font-weight: 600;
      color: #555;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
export const PicDiv = styled.div`
  border: 1px solid red;
  .pic-list {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;

    li {
      border: 1px solid #bbb;
      width: 60px;
      height: 60px;
    }
  }
`;
