import React, { useState } from "react";
import MyPageLayout from "../../components/MyPageLayout";
import { MessageDetail, MessageTest } from "../../components/ServiceIcon";

function MyMessage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  return (
    <MyPageLayout>
      <div className="flex justify-center items-center pb-[50px]">
        <span className="text-[24px] font-normal">메시지함</span>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-between items-start w-[780px]">
          <div className="flex justify-center w-[280px] h-[800px] bg-[#ffffff]">
            {/* 메시지 리스트 */}
            <div className="flex flex-col gap-[10px]">
              {MessageTest.map(item => (
                <div>
                  <div
                    key={item.resultData[0].roomId}
                    className="flex justify-center items-center p-[20px]"
                  >
                    <button className="flex gap-[10px]">
                      <img
                        src={item.resultData[0].pic}
                        alt="업체 이미지"
                        className="w-[50px] h-[50px] rounded-full"
                      />
                      <div className="flex flex-col gap-[5px] text-left w-full">
                        <span className="text-[12px] font-semibold text-left">
                          {item.resultData[0].companyName}
                        </span>
                        <div className="truncate font-[14px] text-left">
                          {item.resultData[0].title.length > 15
                            ? `${item.resultData[0].title.slice(0, 15)}...`
                            : item.resultData[0].title}
                        </div>
                        <div className="text-[12px] text-[#B8B8B8] text-left">
                          {item.resultData[0].roomCreatedAt}
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex justify-center items-center h-[1px] bg-[#DBDBDB] w-[85%]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 상세 메시지 */}
          <div className="flex flex-col h-[800px] w-[500px] bg-[#F5F5F5] ml-0">
            {MessageDetail.map(item => (
              <div key={item.resultData[0].roomId} className="w-full">
                {/* 업체 정보 */}
                <div className="flex p-[10px] items-center h-[80px] w-full bg-[#EEEEEE] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]">
                  <img
                    src={item.resultData[0].pic}
                    alt="업체 이미지"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <span className="text-[24px] font-semibold pl-[10px]">
                    {item.resultData[0].companyName}
                  </span>
                </div>
                {/* 채팅내용 */}
                <div className="flex flex-col items-center w-full p-[20px]">
                  <div>
                    <div className="flex justify-center items-center border rounded-full w-full h-[24px] bg-[#ECEDF0] text-[12px] text-[#A2A2A2]">
                      <span className="text-center m-3">
                        {item.resultData[0].roomCreatedAt}
                      </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={item.resultData[0].pic}
                      alt="업체 이미지"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </div>
                </div>
                {/* 메시지 입력 */}
                <div className="flex justify-center items-center w-full h-[70px] bg-[#EDF0F8]">
                  <input
                    type="text"
                    placeholder="메시지를 입력해주세요."
                    className="flex justify-center items-center w-[70%] h-[40px] border rounded-full shadow-[0_3px_3px_-3px_rgba(0,0,0,0.2)] p-[15px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MyPageLayout>
  );
}

export default MyMessage;
