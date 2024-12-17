/* eslint-disable */
//https://world-developer.tistory.com/85 >> 테일윈드 적용 안될 때 해결
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseURL } from '../config/api';

export const LoginPage: FC<{}> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();//페이지 이동을 위한 Hook

    const login = async () => {//로그인
        try {
            if (!email || !password) {
                alert('아이디(이메일) 또는 비밀번호를 입력하세요.');
                return;
            }
            const response = await axios.post(`${baseURL}/login`, { email, password }, { headers: { 'Content-Type': 'application/json' } } );// JSON 타입 명시;
            if (response.status === 200) {
                alert('로그인 성공!');
                navigate('/main');//로그인 성공 시 메인 페이지로 이동
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            } else {
                alert('서버에 문제가 발생했습니다.');
            }
        }
    };
    
    // useEffect(() => {
    //     alert('로그인 페이지입니다.');
    //   }, []);
    //컴포넌트가 화면 가장 처음에 렌더링 될 때 한 번만 실행하고 싶다면 deps 위치에 빈 배열을 넣는다.(마운트 될 때만 실행된다.)
    //배열을 생략한다면 리렌더링 될 때마다 실행된다.

    return (
        <>
            <section className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-full max-w-md p-8 space-y-4 bg-gray-50 rounded shadow-xl">
                    <h1 className="text-2xl font-bold text-center">LogIn</h1>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && login()}//엔터 키 입력 시 login 호출
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
                            onKeyDown={(e) => e.key === 'Enter' && login()}//엔터 키 입력 시 login 호출
                            placeholder="비밀번호를 입력하세요"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={login}
                        className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Login
                    </button>
                    <p className="text-sm text-center text-gray-500">
                        계정이 없으신가요?{" "}
                        <button 
                            onClick={() => navigate("/signup")}
                            className="text-blue-500 hover:underline">
                            회원가입
                        </button>
                    </p>
                    <p className="text-sm text-center text-gray-500">
                        아이디 또는 비밀번호를 잊으셨나요?{" "}
                        <button 
                            onClick={() => navigate("")}
                            className="text-blue-500 hover:underline">
                            계정찾기
                        </button>
                    </p>
                </div>
            </section>
        </>
    );
}