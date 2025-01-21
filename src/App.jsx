import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BusinessNumber from "./pages/business/BusinessNumber";
import BusinessSignUp from "./pages/business/Index";
import EmailPage from "./pages/login/EmailPage";
import LoginPage from "./pages/login/Index";
import SignUpDone from "./pages/login/SignUpDone";
import SignUpPage from "./pages/login/SignUpPage";
import Index from "./pages/mainpage/Index";
import NotFound from "./pages/NotFound";
import EmailPassword from "./pages/login/EmailPassword";
import DetailPage from "./pages/company/Index";
import ReservationPage from "./pages/company/ReservationPage";
import MovePage from "./pages/mainpage/move/Index";
import CarWashPage from "./pages/mainpage/carwash/Index";
import MyPage from "./pages/mypage/Index";
import ReviewPage from "./pages/mypage/ReviewPage";
import Wishlist from "./pages/mypage/Wishlist";
import MyMessage from "./pages/mypage/MyMessage";
import UsageDetails from "./pages/mypage/UsageDetails";
import CleaningPage from "./pages/mainpage/cleaning/Index";

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
          <Route path="epw" element={<EmailPassword />} />
        </Route>
        {/* 사업자 등록*/}
        <Route path="/business">
          <Route index element={<BusinessSignUp />} />
          <Route path="number" element={<BusinessNumber />} />
        </Route>
        {/* 업체 페이지 */}
        <Route path="/company">
          <Route index element={<DetailPage />} />
          <Route path="reservation" element={<ReservationPage />} />
        </Route>
        {/* 세차 페이지 */}
        <Route path="/carwash">
          <Route index element={<CarWashPage />} />
        </Route>
        {/* 청소 페이지 */}
        <Route path="/cleaning">
          <Route index element={<CleaningPage />} />
        </Route>
        {/* 이사 페이지 */}
        <Route path="/move">
          <Route index element={<MovePage />} />
        </Route>
        {/* 세차 페이지 */}
        <Route path="/carwash">
          <Route index element={<CarWashPage />} />
        </Route>
        {/* 마이페이지 */}
        <Route path="/mypage">
          <Route index element={<MyPage />} />
          <Route path="message" element={<MyMessage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="usage" element={<UsageDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
