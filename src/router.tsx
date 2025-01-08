/* eslint-disable */
import { RouteObject } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { MainPage } from "./pages/MainPage";
// import { PhotoTestPage } from "./pages/test/PhotoTestPage";

const AppRouter : RouteObject[] =  [
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/main",
        element: <MainPage />
    },
    // {
    //     path: "/phototest",
    //     element: <PhotoTestPage />
    // },

];

export default AppRouter;