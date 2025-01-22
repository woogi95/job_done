import { Button, Form, Input } from "antd";
import { useRecoilState } from "recoil";
import {
  countDownCheck,
  joinUserState,
  openModalEmail,
} from "../../../atoms/loginAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./EmailPage.css";

function EmailPage() {
  const userInfo = useRecoilState(joinUserState);
  const [isEmail, setIsEmail] = useRecoilState(openModalEmail);
  const [countDown, setCountDown] = useRecoilState(countDownCheck);
  const navigate = useNavigate();

  // 네비게이트
  const goCancle = () => {
    navigate("/login");
  };
  // 폼 데이터
  const initialData = {
    email: "by5028@naver.com",
    authCode: "",
  };
  // 이메일인증완료버튼
  const handleEmailModal = async () => {
    setIsEmail(false);
    try {
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/sign-up", userInfo[0], header);
      navigate("/login/signupdone");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 폼 onFinish
  const onFinish = async data => {
    console.log(data);
    try {
      const result = await axios.put("/api/auth-check", data);
      if (result) {
        setIsEmail(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 다시 전송 버튼
  const repeatPost = async () => {
    try {
      const res = await axios.post("/api/email-check", {
        email: `${userInfo[0].email}`,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  // 카운트 다운

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timer); // 클린업
    }
  }, [countDown]);
  return (
    <div>
      <Form
        initialValues={initialData}
        onFinish={onFinish}
        style={{ width: 320, margin: "0 auto" }}
      >
        <Form.Item
          className="email"
          name={"email"}
          style={{ display: "block" }}
        >
          <div>{userInfo[0].email} 로 인증 코드를 발송 했습니다.</div>
        </Form.Item>
        <Form.Item
          className="checkingBox"
          name={"authCode"}
          label="인증코드 입력"
          rules={[
            {
              required: true,
              message: "인증코드를 확인해주세요",
            },
          ]}
        >
          <Input
            placeholder="인증번호를 입력해주세요."
            suffix={
              (countDown > 0 && <span>{countDown}</span>) || (
                <span>인증시간 만료</span>
              )
            }
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
          <span>혹시 인증코드가 발송되지 않았나요?</span>
          <button
            onClick={() => repeatPost()}
            style={{ color: "red", textDecoration: "underLine" }}
          >
            인증코드 재전송
          </button>
        </div>
        <Form.Item className="clickbuttons">
          <button className="cancle" onClick={() => goCancle()}>
            취소
          </button>
          <Button htmlType="submit" className="checkingTry">
            인증하기
          </Button>
        </Form.Item>
      </Form>
      {isEmail && (
        <div className="emailModal">
          <h1>이메일인증이 완료 되었습니다.</h1>
          <button onClick={() => handleEmailModal()}>확인</button>
        </div>
      )}
    </div>
  );
}

export default EmailPage;
