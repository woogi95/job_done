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
  border: 1px solid rgba(53, 96, 177, 0.15);
  box-shadow:
    rgba(53, 96, 177, 0.2) 0px 10px 15px -3px,
    rgba(11, 22, 41, 0.05) 0px 4px 6px -2px;
`;
