import { LayerDiv, ModalDiv, PicDiv } from "./portfolio";

const EditPortfolio = () => {
  return (
    <ModalDiv>
      <LayerDiv>
        <div className="tit">포트폴리오 등록</div>
        <label htmlFor="">
          <h2>타이틀</h2>
          <input type="text" />
        </label>
        <div>
          <label htmlFor="">
            <h2>소요시간</h2>
            <input type="text" />
          </label>
          <label htmlFor="">
            <h2>가격대</h2>
            <input type="text" />
          </label>
        </div>
        <PicDiv>
          <h2>작업물</h2>
          <ul className="pic-list">
            <li>
              <input type="file" />
            </li>
            <li>
              <div></div>
            </li>
            <li>
              <div></div>
            </li>
            <li>
              <div></div>
            </li>
            <li>
              <div></div>
            </li>
          </ul>
        </PicDiv>
        <div>
          <h2>간단설명</h2>
          <textarea name="" id=""></textarea>
        </div>
        <div className="btn-area">
          <button>취소</button>
          <button>등록</button>
        </div>
      </LayerDiv>
    </ModalDiv>
  );
};

export default EditPortfolio;
