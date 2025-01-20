import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BusinessNumber from "./pages/business/BusinessNumber";
import BusinessSignUp from "./pages/business/Index";
import EmailPage from "./pages/login/EmailPage";
import LoginPage from "./pages/login/Index";
import SignUpDone from "./pages/login/SignUpDone";
import SignUpPage from "./pages/login/SignUpPage";
import Index from "./pages/mainpage/Index";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<Index />} />
        {/* 로그인 및 회원가입 */}
        <Route path="/login">
          <Route index element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="email" element={<EmailPage />} />
          <Route path="signupdone" element={<SignUpDone />} />
        </Route>
        {/* 사업자 등록*/}
        <Route path="/business">
          <Route index element={<BusinessSignUp />} />
          <Route path="number" element={<BusinessNumber />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
