import { ExpertListPageDiv } from "../reservation-management/reservationMangement";
import { TiPlus } from "react-icons/ti";
import {
  PortfolioListDiv,
  PortfolioListItemDiv,
  TitleAreaDiv,
} from "./companyManagement";
import EditPortfolio from "../../../components/portfolio/EditPortfolio";

function Portfolio() {
  return (
    <ExpertListPageDiv>
      <TitleAreaDiv>
        <h2 className="tit">포트폴리오</h2>
        <button>
          <p>포트폴리오</p> <TiPlus />
        </button>
      </TitleAreaDiv>
      <PortfolioListDiv>
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button>수정하기</button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button>수정하기</button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button>수정하기</button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button>수정하기</button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
      </PortfolioListDiv>
      <EditPortfolio />
    </ExpertListPageDiv>
  );
}

export default Portfolio;
