import React from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Button, Form, Input } from "antd";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const initData = {
    email: "",
    upw: "",
  };
  const loginTry = async data => {
    console.log(data);
    try {
      const res = await axios.post("/api/user/sign-in", data);
      console.log(res.data);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUpButton = () => {
    navigate("/login/signup");
  };
  return (
    <div className="login-div">
      {/* 로그인, 비밀번호 */}
      <Form
        initialValues={initData}
        style={{ width: 320, margin: "0 auto" }}
        onFinish={loginTry}
      >
        <Form.Item
          name={"email"}
          label="이메일"
          rules={[
            { required: true, message: "이메일은 필수 항목입니다." },
            { type: "email", message: "유효한 이메일 주소를 입력해주세요." },
          ]}
        >
          <Input
            style={{ alignItems: "center" }}
            placeholder="이메일을 입력하세요."
          />
        </Form.Item>
        <Form.Item
          name={"upw"}
          label="비밀번호"
          rules={[
            { required: true, message: "비밀번호는 필수 항목입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>
        <Button
          className="bg-blue-500 border border-gray-400 w-80 h-11 rounded-lg mb-2"
          htmlType="submit"
        >
          로그인
        </Button>
        <div className="justify-between flex text-gray-500 mb-10">
          <input
            type="checkbox"
            id="logining"
            name="logining"
            // checked={}
            // onChange={}
          />
          <label htmlFor="iogining">로그인 상태 유지</label>
          <Link to={"/email"} className="text-gray-500">
            아이디•비밀번호 찾기
          </Link>
        </div>
        <div>
          <div style={{ marginBottom: 10 }}>
            <button
              type="button"
              className="bg-amber-300 border border-gray-400 w-80 h-11 rounded-lg flex items-center justify-center"
            >
              <RiKakaoTalkFill style={{ fontSize: 30 }} />
              카카오 로그인
            </button>
          </div>
          <div style={{ marginBottom: 10 }}>
            <button
              type="button"
              onClick={() => signUpButton()}
              className="bg-white-500 border border-gray-400 w-80 h-11 rounded-lg "
            >
              회원가입
            </button>
          </div>
        </div>
      </Form>
      <div style={{ width: 320, justifyContent: "center" }}></div>
    </div>
  );
}

export default LoginPage;
