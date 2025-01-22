import { Button, Form, Input, Upload } from "antd";
import { useRecoilState } from "recoil";
import {
  isOpenModalUpw,
  joinUserState,
  upwCheck,
} from "../../../atoms/loginAtom";
import "./Index.css";
import "./signuppage.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [match, setMatch] = useRecoilState(upwCheck);
  const [isUpw, setIsUpw] = useRecoilState(isOpenModalUpw);
  const [file, setFile] = useState(null); // 파일 상태 관리
  const [upwForm] = Form.useForm();
  const [userInfo, setUserInfo] = useRecoilState(joinUserState);
  const navigate = useNavigate();

  const initData = {
    name: "홍길동",
    email: "by5028@naver.com",
    upw: "Qkqhdi12",
    upwConfirm: "Qkqhdi12",
    phone: "01012345678",
    pic: "",
  };
  //취소버튼
  const goCancle = () => {
    navigate("/login");
  };
  // 비밀번호 확인
  const handleChangePassword = () => {
    const pw = upwForm.getFieldValue("upw");
    const pwConfirm = upwForm.getFieldValue("upwConfirm");
    if (pwConfirm) {
      setMatch(pw === pwConfirm);
    }
  };

  // 파일 변경 핸들러
  const handleFileChange = ({ file }) => {
    setFile(file.originFileObj);
  };

  // 폼 제출
  const onSubmit = async data => {
    console.log(data);
    try {
      setUserInfo(prev => ({
        ...prev,
        ...data,
      }));
      const res = await axios.post("/api/email-check", {
        email: `${data.email}`,
      });
      // console.log(res);
      // console.log(userInfo);

      navigate("/login/email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signUpDiv">
      <Form
        form={upwForm}
        initialValues={initData}
        style={{ width: 320, margin: "0 auto" }}
        onFinish={onSubmit}
      >
        <Form.Item
          name={"name"}
          label="이름"
          rules={[{ required: true, message: "이름은 필수 항목입니다." }]}
        >
          <Input placeholder="이름을 입력하세요." />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="이메일"
          rules={[
            { required: true, message: "이메일은 필수 항목입니다." },
            { type: "email", message: "유효한 이메일 주소를 입력해주세요." },
          ]}
        >
          <Input placeholder="이메일을 입력하세요." />
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
          <Input.Password
            placeholder="비밀번호를 입력하세요."
            onChange={handleChangePassword}
          />
        </Form.Item>
        <Form.Item
          name={"upwConfirm"}
          label="비밀번호 확인"
          rules={[
            { required: true, message: "비밀번호 확인은 필수 항목입니다." },
          ]}
        >
          <Input.Password
            placeholder="비밀번호를 확인하세요."
            onChange={handleChangePassword}
          />
        </Form.Item>
        <Form.Item
          name={"phone"}
          label="휴대폰"
          rules={[
            { required: true, message: "휴대폰 번호는 필수 항목입니다." },
            {
              pattern: /^010\d{8}$/,
              message: "휴대폰 형식에 맞지 않습니다. (예: 010-1234-5678)",
            },
          ]}
        >
          <Input placeholder="휴대폰 번호를 입력하세요." />
        </Form.Item>
        <Form.Item label="프로필 이미지" rules={[{ required: false }]}>
          <Upload
            beforeUpload={() => false} // 파일 업로드를 막고 선택만 허용
            onChange={handleFileChange}
            maxCount={1} // 파일 하나만 선택 가능
          >
            <Button>이미지 선택</Button>
          </Upload>
        </Form.Item>
        <Form.Item className="clickbuttons">
          <button className="cancle" onClick={() => goCancle()}>
            취소
          </button>
          <Button htmlType="submit" className="nextButton">
            다음
          </Button>
        </Form.Item>
      </Form>

      {isUpw && (
        <div className="upwModal">
          <h1>비밀번호를 확인해주세요.</h1>
          <button onClick={() => setIsUpw(false)}>확인</button>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
