import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "@pages/Home/HomePage";
import OnboardingPage from "@pages/Onboarding/OnboardingPage";
import SignUpPage from "@pages/SignUp/SignUpPage";
import LoginPage from "@pages/Login/LoginPage";
import SettingsHomePage from "@pages/MyHome/SettingsHomePage";

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
    ],
  },
]);

export default router;
