/* eslint-disable */
//https://world-developer.tistory.com/85 >> 테일윈드 적용 안될 때 해결
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/reactstudy"

function LoginPage() {
    /*
    let [title, titleChange] = useState(['남자 코트 추천', '강남 우동 맛집', '롯데월드 추천 맛집']);
    let [likes, likeAdd] = useState(0);
    function changeTitle() {
        let newArray = [...title]; //<Array, Object state 데이터 변경 방법> deep copy => 새로운 복사본을 만들어야함. [...~~] 문법 중요. ES6 문법. State안의 데이터를 건들이는것은 좋지않음.
        newArray[0] = '여자 코트 추천';

        let temp = newArray[0];
        newArray[0] = newArray[2];
        newArray[2] = temp;
        titleChange(newArray);
    }*/

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // 페이지 이동을 위한 Hook

    const login = async () => {
        try {
            if (!email || !password) {
                alert('아이디(이메일) 또는 비밀번호를 입력하세요.');
                return;
            }

            console.log(email, password);

            const response = await axios.post(`${baseURL}/login`, { email, password }, { headers: { 'Content-Type': 'application/json' } } );// JSON 타입 명시;

            if (response.status === 200) {
                alert('로그인 성공!');
                navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
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
                </div>
            </section>
        </>
    );
}

function Modal() {//component만드는 방법. 1. 이름은 대괄호(랜더링 안됨) 2. return()안에 태그는 하나로 묶어야함.(div쓰기 싫으면 <> </>으로.)
    return (
        <>
            <div>
                <h2>제목</h2>
                <p>날짜</p>
                <p>상세내용</p>
            </div>
        </>
    );
}

export default LoginPage;