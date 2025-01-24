import React from "react";
import { useNavigate } from "react-router-dom";
import "./signuppage.css";
function SignUpDone() {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate("/login");
  };
  return (
    <div style={{ width: 320, alignItems: "center", justifyContent: "center" }}>
      <button className="loginButton" onClick={goLoginPage}>
        로그인 하기
      </button>
    </div>
  );
}

export default SignUpDone;
