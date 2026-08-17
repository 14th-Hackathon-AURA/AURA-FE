import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import HomePage from "@pages/Home/HomePage";
import OnboardingPage from "@pages/Onboarding/OnboardingPage";
import SignUpPage from "@pages/SignUp/SignUpPage";
import LoginPage from "@pages/Login/LoginPage";
import SettingsHomePage from "@pages/MyHome/SettingsHomePage";
import EditProfilePage from "@pages/MyHome/EditProfilePage";
import CommunityPage from "@pages/community/CommunitiyPage";
import PostDetailPage from "@pages/community/PostDetailPage";
import PostWritePage from "@pages/community/PostWritePage";
import CommunityProvider from "@hooks/community/CommunityProvider";
import ChatPage from "@pages/chatbot/ChatPage";

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
        path: "/home",
        element: <HomePage />,
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
    ],
  },
]);

export default router;
