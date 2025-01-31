import React from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginUser } from "../../../atoms/loginAtom";
import { loginApi } from "../../../apis/login";

function LoginPage() {
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
  const navigate = useNavigate();
  const initData = {
    email: "",
    upw: "",
  };
  const loginTry = async data => {
    console.log("로그인 요청:", data);
    try {
      const res = await loginApi.post("/api/user/sign-in", data, {
        withCredentials: true,
      });

      console.log("서버 응답:", res.data);

      if (res.data.resultData && res.data.resultData.accessToken) {
        const { accessToken } = res.data.resultData;

        // ✅ accessToken을 localStorage에 저장
        localStorage.setItem("accessToken", accessToken);

        // ✅ 사용자 상태 업데이트
        setUserInfo(prev => ({
          ...prev,
          ...data,
          isLogind: true,
        }));

        // ✅ 로그인 성공 후 메인 페이지로 이동
        navigate("/");
      } else {
        alert("로그인 실패: 서버 응답 오류");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const signUpButton = () => {
    navigate("/login/signup");
  };
  return (
    <div>
      {/* 로그인, 비밀번호 */}
      <Form
        initialValues={initData}
        style={{ width: 320, margin: "0 auto" }}
        onFinish={loginTry}
      >
        <Form.Item
          name={"email"}
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
          <div>
            <input type="checkbox" id="logining" name="logining" />
            <label htmlFor="iogining">로그인 상태 유지</label>
          </div>

          <Link to={"/email"} className="text-gray-500">
            아이디•비밀번호 찾기
          </Link>
        </div>
        <div>
          <div style={{ marginBottom: 10 }}>
            <button
              type="button"
              className="bg-amber-300 border border-gray-400 w-80 h-11 rounded-lg flex items-center justify-center mb-3"
            >
              <RiKakaoTalkFill style={{ fontSize: 30 }} />
              카카오 로그인
            </button>
            <button
              type="button"
              className="bg-white border border-gray-400 w-80 h-11 rounded-lg flex items-center justify-center"
            >
              <FcGoogle style={{ fontSize: 30 }} />
              구글 로그인
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
