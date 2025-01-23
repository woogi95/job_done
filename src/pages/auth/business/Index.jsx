import React from "react";

function BusinessSignUp() {
  const initialData = {
    userId: 1,
    businessNum: "12245678910",
    businessName: "싹 박멸해",
    address: "만경관근처",
    serviceTypeId: 1,
    busiCreatedAt: "2019.06.08",
    tel: "0533836669",
  };
  return (
    <div className="signUpDiv">
      <Form
        initialValues={initData}
        style={{ width: 320, margin: "0 auto" }}
        onFinish={onSubmit}
      >
        <Form.Item
          name={"businessName"}
          label="업체 이름"
          rules={[{ required: true, message: "이름은 필수 항목입니다." }]}
        >
          <Input placeholder="이름을 입력하세요." />
        </Form.Item>
        <Form.Item
          name={"tel"}
          label="휴대폰"
          rules={[
            { required: true, message: "휴대폰 번호는 필수 항목입니다." },
            {
              pattern: /^0\d{10}$/,
              message: "번호 형식에 맞지 않습니다.",
            },
          ]}
        >
          <Input placeholder="휴대폰 번호를 입력하세요." />
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
          label="프로필 이미지"
          name={"pic"}
          rules={[{ required: false }]}
        >
          <Upload
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
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

export default BusinessSignUp;
