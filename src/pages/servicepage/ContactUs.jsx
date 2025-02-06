import React, { useEffect, useState } from "react";
import axios from "axios";

import { FiSend } from "react-icons/fi";
import { MessageBoxDiv } from "./servicepage";
import { MessageDetail } from "../../components/ServiceIcon";

import { CiImageOn } from "react-icons/ci";

function ContactUs() {
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState(null);

  //메시지 전송
  const handleSendMessage = async () => {
    try {
      const res = await axios.post("/api/chat", {
        pics: [],
        p: {
          roomId: roomId,
          contents: message,
          flag: 1,
        },
      });
      console.log("메시지 전송 성공?:", res.data);
      setMessage("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  //채팅방 조회
  useEffect(() => {
    const fetchChatRooms = async () => {
      const storedUserId = localStorage.getItem("userId");

      // if (!storedUserId) {
      //   console.error("userId가 localStorage에 없습니다.");
      //   return;
      // }

      try {
        const res = await axios.get("/api/room", {
          params: {
            userId: storedUserId,
          },
        });
        console.log("채팅방 데이터?:", res.data);
        if (res.data && res.data.resultData && res.data.resultData.length > 0) {
          setRoomId(res.data.resultData[0].roomId);
        }
      } catch (error) {
        console.error("채팅방 조회 실패:", error);
      }
    };
    fetchChatRooms();
  }, []);

  return (
    <MessageBoxDiv>
      {/* 상세 메시지 */}
      {MessageDetail.map(item => (
        <div key={item.resultData[0].roomId} className="layer">
          {/* 업체 정보 */}
          <div className="tit ">
            <img src={item.resultData[0].pic} alt="업체 이미지" />
            <h2>{item.resultData[0].companyName}</h2>
          </div>
          {/* 채팅내용 */}
          <div className="chat-box">
            <div className="date">
              <span>{item.resultData[0].roomCreatedAt}</span>
            </div>
            {/* 업체챗 */}
            <div className="chat expert-chat">
              <img src={item.resultData[0].pic} alt="업체로고" />
              <div className="bubble">
                <span>{item.resultData[0].companyChat}</span>
                <em>{item.resultData[0].sendTime}</em>
              </div>
            </div>
            {/* 유저쳇 */}
            <div className="chat user-chat">
              <div className="bubble">
                <span>
                  {item.resultData[0].companyChat}
                  <img src={item.resultData[0].pic} alt="" />
                </span>
                <em>{item.resultData[0].sendTime}</em>
              </div>
            </div>
          </div>
          {/* 메시지 입력 */}
          <div className="input-bar">
            <div className="input-value">
              <input
                type="text"
                placeholder="메시지를 입력해주세요."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && message.trim()) {
                    e.preventDefault();
                    handleSendMessage();
                    setMessage("");
                  }
                }}
              />
            </div>
            <div className="btn-area">
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="imageUpload">
                <CiImageOn />
              </label>

              <button
                onClick={() => {
                  if (message.trim()) {
                    handleSendMessage();
                    setMessage("");
                  }
                }}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      ))}
    </MessageBoxDiv>
  );
}

export default ContactUs;
