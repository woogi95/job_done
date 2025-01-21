const SignUpPage = () => {
  return (
    <div>
      <form>
        <div className="login-box-div">
          <input
            className="login-box"
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
          />
          <input
            className="login-box"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
          <input
            className="login-box"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
          <input
            className="login-box"
            id="number"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
