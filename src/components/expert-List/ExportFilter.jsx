import React from "react";
import { EFilterDiv } from "./expertList";

const ExportFilter = () => {
  return (
    <EFilterDiv>
      <ul className="btn-area">
        <li>
          <button>취소</button>
        </li>
        <li>
          <button>대기</button>
        </li>
        <li>
          <button>완료</button>
        </li>
        <li>
          <button>거절</button>
        </li>
      </ul>
      <div className="search-bar">
        <label htmlFor="">
          <em></em>
          <input type="text" />
        </label>
        <button>검색</button>
      </div>
    </EFilterDiv>
  );
};

export default ExportFilter;
