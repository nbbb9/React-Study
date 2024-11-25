import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/" element={<LoginPage />} />

                {/* 회원가입 페이지 */}
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
