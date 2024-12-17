/* eslint-disable */
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from '../config/api';
import { Account } from "./users/type";

const initAccount: Account = {//회원가입 입력창 초기값
    name: "",
    email: "",
    password: "",
}

export const SignupPage: FC<{}> = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [makeAccount, setMakeAccount] = useState<Account>(initAccount);
    const navigate = useNavigate();//페이지 이동을 위한 Hook

    const Signup = async () => {//회원가입
        if (!makeAccount.name || !makeAccount.email || !makeAccount.password || !confirmPassword) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        if (makeAccount.password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const response = await axios.post(`${baseURL}/signup`, makeAccount);
            if (response.status === 200) {
                alert("회원가입 성공!");
                navigate("/login");//회원가입 후 로그인 페이지로 이동
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
                    <h1 className="text-2xl font-bold text-center mb-5">SignUp</h1>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            value={makeAccount.name}
                            onChange={(e) => setMakeAccount({ ...makeAccount, name: e.target.value })}
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
                            value={makeAccount.email}
                            onChange={(e) => setMakeAccount({...makeAccount, email: e.target.value})}
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
                            value={makeAccount.password}
                            onChange={(e) => setMakeAccount({...makeAccount, password: e.target.value})}
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
                            className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 
                                ${confirmPassword && (confirmPassword === makeAccount.password 
                                    ? 'border-green-500 focus:ring-green-500' 
                                    : 'border-red-500 focus:ring-red-500')}`}
                        />
                        {confirmPassword && confirmPassword !== makeAccount.password && (
                            <p className="mt-1 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
                        )}
                        {confirmPassword && confirmPassword === makeAccount.password && (
                            <p className="mt-1 text-sm text-green-500">비밀번호가 일치합니다.</p>
                        )}
                    </div>
                    <button
                        onClick={Signup}
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