import { Button, Form, Input } from "antd";
import { useRecoilState } from "recoil";
import { joinUserState } from "../../../atoms/loginAtom";
import axios from "axios";

function EmailPage() {
  const userInfo = useRecoilState(joinUserState);
  const initialData = {
    email: "by5028@naver.com",
    authCode: "",
  };
  console.log(userInfo[0]);
  const onFinish = async data => {
    console.log(data);
    try {
      const result = await axios.put("/api/auth-check", data);
      if (result) {
        const header = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const res = await axios.post("/api/sign-up", userInfo[0], header);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form initialValues={initialData} onFinish={onFinish}>
        <Form.Item name={"email"} label="이메일">
          <div>{userInfo[0].email}</div>
        </Form.Item>
        <Form.Item
          name={"authCode"}
          label="인증번호"
          rules={[
            {
              required: true,
              message: "이메일로 전송된 인증번호를 입력해주세요.",
            },
          ]}
        >
          <Input placeholder="인증번호를 입력해주세요." />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">인증하기</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EmailPage;
