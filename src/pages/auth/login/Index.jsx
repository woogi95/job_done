import { Button, Form, Input } from "antd";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUser } from "../../../atoms/loginAtom";
import UserLayout from "../../../components/UserLayout";
import "./Index.css";

function LoginPage() {
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
  const navigate = useNavigate();
  const userInfoValue = useRecoilValue(loginUser);

  const initData = {
    email: "",
    upw: "",
  };
  const loginTry = async data => {
    console.log("로그인 요청:", data);
    try {
      const res = await axios.post("/api/user/sign-in", data);
      console.log("서버 응답:", res.data);

      if (res.data.resultData && res.data.resultData.accessToken) {
        const { businessId } = res.data.resultData;

        setUserInfo(prev => {
          const newState = {
            ...prev,
            resultData: res.data.resultData,
            isLogind: true,
          };
          console.log("업데이트 후 userInfo:", newState);
          return newState;
        });

        // ✅ 사용자 상태 업데이트
        setUserInfo({
          userId: res.data.resultData.userId,
          name: res.data.resultData.name,
          email: res.data.resultData.email,
          pic: res.data.resultData.pic,
          accessToken: res.data.resultData.accessToken,
          businessId: res.data.resultData.businessId,
          isLogind: true,
        });

        // localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("businessId", businessId);

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

  console.log(userInfoValue.resultData);

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <UserLayout />
      </div>
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
            // {
            //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            //   message:
            //     "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            // },
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
