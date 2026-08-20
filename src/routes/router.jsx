import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import OnboardingPage from "@pages/Onboarding/OnboardingPage";
import SignUpPage from "@pages/SignUp/SignUpPage";
import LoginPage from "@pages/Login/LoginPage";
import SettingsHomePage from "@pages/MyHome/SettingsHomePage";
import EditProfilePage from "@pages/MyHome/EditProfilePage";
import CommunityPage from "@pages/community/CommunitiyPage";
import PostDetailPage from "@pages/community/PostDetailPage";
import PostWritePage from "@pages/community/PostWritePage";
import CommunityProvider from "@hooks/community/CommunityProvider";
import ClosetPage from "@pages/closet/ClosetPage";
import ProductRegisterPage from "@pages/closet/ProductRegisterPage";
import ProductDetailPage from "@pages/closet/ProductDetailPage";
import CareGuidePage from "@pages/closet/CareGuidePage";
import ChatPage from "@pages/chatbot/ChatPage";
import StoreVisitPage from "@pages/chatbot/StoreVisitPage";
import StoreVisitDetailPage from "@pages/chatbot/StoreVisitDetailPage";
import StoreListPage from "@pages/chatbot/StoreListPage";
import CarePage from "@pages/care/CarePage";
import DiagnosisHistoryPage from "@pages/care/DiagnosisHistoryPage";
import DiagnosisResultPage from "@pages/care/DiagnosisResultPage";
import ReservationPage from "@pages/care/ReservationPage";
import StoreSelectPage from "@pages/care/StoreSelectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <OnboardingPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/mypage",
        element: <SettingsHomePage />,
      },
      {
        path: "/mypage/edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "/chatbot",
        element: <ChatPage />,
      },
      {
        path: "/chatbot/store-visit",
        element: <StoreVisitPage />,
      },
      {
        path: "/chatbot/store-visit/:cardId",
        element: <StoreVisitDetailPage />,
      },
      {
        path: "/chatbot/store-list",
        element: <StoreListPage />,
      },
      {
        path: "/community",
        element: (
          <CommunityProvider>
            <Outlet />
          </CommunityProvider>
        ),
        children: [
          {
            index: true,
            element: <CommunityPage />,
          },
          {
            path: "write",
            element: <PostWritePage />,
          },
          {
            path: ":postId",
            element: <PostDetailPage />,
          },
        ],
      },
      {
        path: "/closet",
        element: <ClosetPage />,
      },
      {
        path: "/closet/register",
        element: <ProductRegisterPage />,
      },
      {
        path: "/closet/:productId",
        element: <ProductDetailPage />,
      },
      {
        path: "/closet/:productId/care",
        element: <CareGuidePage />,
      },
      {
        path: "/care",
        element: <CarePage />,
      },
      {
        path: "/care/history",
        element: <DiagnosisHistoryPage />,
      },
      {
        path: "/care/result",
        element: <DiagnosisResultPage />,
      },
      {
        path: "/care/reservation",
        element: <ReservationPage />,
      },
      {
        path: "/care/reservation/stores",
        element: <StoreSelectPage />,
      },
    ],
  },
]);

export default router;
