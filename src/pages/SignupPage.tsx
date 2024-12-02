import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/reactstudy"

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // 백엔드로 POST 요청
            const response = await axios.post(`${baseURL}/signup`, {
                name,
                email,
                password,
            });

            if (response.status === 200) {
                alert("회원가입 성공!");
                navigate("/login"); // 회원가입 후 로그인 페이지로 이동
            }
        } catch (error) {
            console.error("회원가입 에러:", error);
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <>
            <section className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-full max-w-md p-8 space-y-4 bg-gray-50 rounded shadow-xl">
                    <h1 className="text-2xl font-bold text-center">SignUp</h1>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름을 입력하세요"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호를 다시 입력하세요"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleSignup}
                        className="w-full py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Signup
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        이미 계정이 있으신가요?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="text-blue-500 hover:underline"
                        >
                            로그인
                        </button>
                    </p>
                </div>
            </section>
        </>
    );
}

export default SignupPage;