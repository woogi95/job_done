# 잡던 (Job_Done)

## 링크들

## 사용한 도구들

## 1. 코딩 컨벤션

- 변수, 상수, 함수, 파일, 클레스명
  : camelCase(카멜케이스)
- 확장자 jsx, tsx
  : PascalCase(파스칼케이스)
- 화살표 함수 사용
  : context

## 2. 커밋 컨벤션

- feat : 새로운 기능 구현 및 추가
- fix : 오류 수정
- docs : readme.md, json 파일 등 수정, 라이브러리 설치(문서 관련)
- style : 공백, 세미콜론 및 스타일 수정
- refactor : 코드 리팩토링
- chore : 빌드 부분 혹은 패키지 매니저 수정 사항
- rename : 파일명, 폴더명 수정
- remove : 파일 삭제

## 3. 브랜치 전략

- main: 메인 서버 확인용
- develop : 메인에 들어가기 전 서브 확인용
- feature : 추가 기능 개발 확인용
- release : develop 을 release 로 옮긴 후 테스트를 진행용
- hotfix : 버그를 수정용

## 폴더구조

```
job_done
├─ .prettierrc
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ images
│  │  ├─ arrow-right.svg
│  │  ├─ b-logo.svg
│  │  ├─ event
│  │  │  ├─ event_banner_1.png
│  │  │  ├─ event_banner_2.jpg
│  │  │  └─ event_banner_3.jpg
│  │  ├─ logo.svg
│  │  └─ order
│  │     ├─ cleaning_icon.jpg
│  │     ├─ default_profile.jpg
│  │     ├─ Group 80.png
│  │     └─ Interior_1.jpg
│  ├─ kakao_login_large_wide.png
│  └─ vite.svg
├─ README.md
├─ server
│  └─ server.json
├─ src
│  ├─ apis
│  │  ├─ cookie.js
│  │  └─ login.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ atoms
│  │  ├─ businessAtom.js
│  │  ├─ categoryAtom.js
│  │  ├─ like.js
│  │  ├─ loginAtom.js
│  │  ├─ portfolioAtom.js
│  │  ├─ reservationAtom.js
│  │  ├─ reviewAtom.js
│  │  └─ statusAtom.js
│  ├─ components
│  │  ├─ expert-header
│  │  │  ├─ ExpertHeader.jsx
│  │  │  └─ header.js
│  │  ├─ expert-info
│  │  │  ├─ ExpertInfo.jsx
│  │  │  ├─ ExpertInfoEdit.jsx
│  │  │  ├─ Logo.jsx
│  │  │  └─ LogoEdit.jsx
│  │  ├─ expert-List
│  │  │  ├─ expertList.js
│  │  │  └─ ExportFilter.jsx
│  │  ├─ expert-side-menu
│  │  │  ├─ ExpertSideMenu.jsx
│  │  │  └─ sideMenu.js
│  │  ├─ ExpertLayout.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Header.jsx
│  │  ├─ Layout.jsx
│  │  ├─ LoadingPopup.jsx
│  │  ├─ MyPageLayout.jsx
│  │  ├─ papers
│  │  │  ├─ Estimate.jsx
│  │  │  ├─ ExpertReservation.jsx
│  │  │  ├─ papers.js
│  │  │  └─ UserReservation.jsx
│  │  ├─ pay.js
│  │  ├─ PaymentFailed.jsx
│  │  ├─ PaymentSuccess copy.jsx
│  │  ├─ PaymentSuccess.jsx
│  │  ├─ portfolio
│  │  │  ├─ AddPortfolio.jsx
│  │  │  ├─ EditPortfolio.jsx
│  │  │  └─ portfolio.js
│  │  ├─ ProfileImage.jsx
│  │  ├─ service
│  │  │  ├─ Filter.jsx
│  │  │  ├─ service.js
│  │  │  ├─ ServiceListItem.jsx
│  │  │  └─ ServiceListTop.jsx
│  │  ├─ serviceDetail
│  │  │  ├─ ContPortfolioList.jsx
│  │  │  ├─ ContReview.jsx
│  │  │  ├─ DetailContents.jsx
│  │  │  ├─ DetailTop.jsx
│  │  │  ├─ PfPopup.jsx
│  │  │  └─ serviceDetail.js
│  │  ├─ ServiceIcon.jsx
│  │  ├─ ServiceSkeleton.jsx
│  │  ├─ ui
│  │  │  ├─ Button.jsx
│  │  │  ├─ Popup.jsx
│  │  │  └─ ui.js
│  │  └─ UserLayout.jsx
│  ├─ context
│  │  └─ Context.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ auth
│  │  │  ├─ business
│  │  │  │  ├─ businessnumber.css
│  │  │  │  ├─ BusinessNumber.jsx
│  │  │  │  └─ Index.jsx
│  │  │  └─ login
│  │  │     ├─ emailpage.css
│  │  │     ├─ EmailPage.jsx
│  │  │     ├─ Index.css
│  │  │     ├─ Index.jsx
│  │  │     ├─ memo
│  │  │     ├─ memo.jsx
│  │  │     ├─ passwordedit.css
│  │  │     ├─ PasswordEdit.jsx
│  │  │     ├─ passwordemail.css
│  │  │     ├─ PasswordEmail.jsx
│  │  │     ├─ passwordemailcheck.css
│  │  │     ├─ PasswordEmailCheck.jsx
│  │  │     ├─ signupdone.css
│  │  │     ├─ SignUpDone.jsx
│  │  │     ├─ signuppage.css
│  │  │     └─ SignUpPage.jsx
│  │  ├─ company
│  │  │  ├─ Index.jsx
│  │  │  └─ ReservationPage.jsx
│  │  ├─ expert
│  │  │  ├─ company-management
│  │  │  │  ├─ CompanyInfo.jsx
│  │  │  │  ├─ companyManagement.js
│  │  │  │  ├─ EditCompanyInfo.jsx
│  │  │  │  ├─ EditDetailPage.jsx
│  │  │  │  ├─ ExpertDetailPage.jsx
│  │  │  │  └─ Portfolio.jsx
│  │  │  ├─ expertmain.css
│  │  │  ├─ ExpertMain.jsx
│  │  │  ├─ expertmainreservelist.js
│  │  │  ├─ ExpertMainReserveList.jsx
│  │  │  ├─ management
│  │  │  │  ├─ CompanyInfo.jsx
│  │  │  │  ├─ EditCompanyInfo.jsx
│  │  │  │  ├─ EditDetailPage.jsx
│  │  │  │  ├─ ExpertDetailPage.jsx
│  │  │  │  └─ Portfolio.jsx
│  │  │  ├─ message-center
│  │  │  │  └─ Index.jsx
│  │  │  ├─ payment-management
│  │  │  │  └─ Index.jsx
│  │  │  ├─ quotation
│  │  │  │  ├─ CreateQuotation.jsx
│  │  │  │  ├─ EditQuotation.jsx
│  │  │  │  └─ QuotationService.jsx
│  │  │  ├─ quote-management
│  │  │  │  ├─ EditQuotation.jsx
│  │  │  │  ├─ Index.jsx
│  │  │  │  ├─ qouteManagement.js
│  │  │  │  └─ QuotationForm.jsx
│  │  │  ├─ reservation-management
│  │  │  │  ├─ Index.jsx
│  │  │  │  └─ reservationMangement.js
│  │  │  ├─ review-center
│  │  │  │  ├─ index.css
│  │  │  │  ├─ Index.jsx
│  │  │  │  ├─ reviewview.css
│  │  │  │  └─ ReviewView.jsx
│  │  │  ├─ schedule-management
│  │  │  │  ├─ index.css
│  │  │  │  └─ Index.jsx
│  │  │  └─ statistics
│  │  │     └─ Index.jsx
│  │  ├─ Index.jsx
│  │  ├─ mypage
│  │  │  ├─ Index.jsx
│  │  │  ├─ MyMessage.jsx
│  │  │  ├─ MyReservation.jsx
│  │  │  ├─ ReviewPage.jsx
│  │  │  ├─ UsageDetails.jsx
│  │  │  ├─ UserReservLook.jsx
│  │  │  └─ Wishlist.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ page.js
│  │  ├─ Qna.jsx
│  │  ├─ reservation
│  │  │  ├─ Index.jsx
│  │  │  ├─ reservation.js
│  │  │  └─ ReservationHistory.jsx
│  │  └─ servicepage
│  │     ├─ ContactUs.jsx
│  │     ├─ Detail.jsx
│  │     ├─ Index.jsx
│  │     └─ servicepage.js
│  ├─ routers
│  │  └─ Root.jsx
│  ├─ types
│  │  └─ TypeBox.ts
│  ├─ utils
│  │  └─ Cookie.jsx
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```