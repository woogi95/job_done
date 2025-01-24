import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FilterDiv } from "./move";

const Filter = () => {
  const [selectOption, setSelectOption] = useState("최신순");
  const [optionOpen, setOptionOpen] = useState(false);
  const options = ["최신순", "리뷰순", "별점많은순", "최저가순"];

  const handleOptionCheck = item => {
    setSelectOption(item);
    setOptionOpen(false);
  };

  return (
    <FilterDiv>
      <div className="select" onClick={() => setOptionOpen(!optionOpen)}>
        <p>{selectOption}</p>
        <IoIosArrowDown />
      </div>
      {optionOpen && (
        <div className="options">
          {options.map(item => (
            // JSX를 반환하도록 수정
            <div
              key={item}
              onClick={() => {
                handleOptionCheck(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </FilterDiv>
  );
};

export default Filter;
