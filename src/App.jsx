import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BusinessNumber from "./pages/auth/business/BusinessNumber";
import BusinessSignUp from "./pages/auth/business/Index";
import EmailPage from "./pages/auth/login/EmailPage";
import LoginPage from "./pages/auth/login/Index";
import SignUpDone from "./pages/auth/login/SignUpDone";
import SignUpPage from "./pages/auth/login/SignUpPage";
import Index from "./pages/mainpage/Index";
import NotFound from "./pages/NotFound";
import EmailPassword from "./pages/auth/login/EmailPassword";
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
import ExpertMain from "./pages/expert/ExpertMain";
import CompanyInfo from "./pages/expert/management/CompanyInfo";
import ExpertDetailPage from "./pages/expert/management/ExpertDetailPage";
import EditCompanyInfo from "./pages/expert/management/EditCompanyInfo";
import EditDetailPage from "./pages/expert/management/EditDetailPage";
import Portfolio from "./pages/expert/management/Portfolio";
import CreateQuotation from "./pages/expert/quotation/CreateQuotation";
import EditQuotation from "./pages/expert/quotation/EditQuotation";
import QuotationService from "./pages/expert/quotation/QuotationService";
import Payment from "./pages/expert/reservation/Payment";
import Reservation from "./pages/expert/reservation/Reservation";
import MoveDetail from "./pages/mainpage/move/Detail";
import Layout from "./components/Layout";

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
          <Route path=":id" element={<MoveDetail />} />
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
        {/* 전문가 페이지 */}
        <Route path="/expert">
          {/* 관리자 */}
          <Route index element={<ExpertMain />} />
          <Route path="management" element={<CompanyInfo />} />
          <Route path="edit" element={<EditCompanyInfo />} />
          <Route path="editdetail" element={<EditDetailPage />} />
          <Route path="detail" element={<ExpertDetailPage />} />
          <Route path="portfolio" element={<Portfolio />} />

          {/* 견적서 */}
          <Route path="create" element={<CreateQuotation />} />
          <Route path="quotation" element={<EditQuotation />} />
          <Route path="service" element={<QuotationService />} />
          {/* 예약 */}
          <Route path="payment" element={<Payment />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
