import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import PhotoTestPage from "./pages/PhotoTestPage";

function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<LoginPage />} />

                {/* 회원가입 페이지 */}
                <Route path="/signup" element={<SignupPage />} />

                {/* 메인 페이지 */}
                <Route path="/main" element={<MainPage />} />

                {/* 사진 테스트 페이지 */}
                <Route path="/phototest" element={<PhotoTestPage />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
