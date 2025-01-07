/* eslint-disable */
import { FC, useState } from 'react';
import axios from "axios";
import { baseURL } from '../../config/api';
import { exist } from '../../types/user';

interface FindAccountModalProps {
    onClose: () => void; // 모달 닫기
    type: 'email' | 'password'; // 이메일 찾기 또는 비밀번호 찾기
}

export const FindAccountModal: FC<FindAccountModalProps> = ({ onClose, type }) => {
    const [name, setName] = useState('');

    const [isExistUser, setIsExistUser] = useState<exist>({//비밀번호 찾기 전 존재하는 사용자인지 찾기위한 상태
        name: "",
        email: ""
    });

    const findEmail = async () => {//이메일 찾기
        if (!name) {
            alert('이메일을 찾기위해선 이름을 입력하세요.');
            return;
        }
        try {
            const response = await axios.get(`${baseURL}/findMyEmail?name=${name}`);
            if (response.status === 200) {
                alert(name + '님의 아이디(이메일)은 "' + response.data + '" 입니다.');
            } else {
                alert('존재하지 않는 사용자입니다.');
            }
        } catch (error) {
            alert('요청 중 문제가 발생했습니다.');
        }
    }

    const modPassword = async () => {//비밀번호 변경
        if (!isExistUser.name) {
            alert('비밀번호를 찾기 위해서는 이름을 입력하세요.');
            return;
        } else if (!isExistUser.email) {
            alert('비밀번호를 찾기 위해서는 가입한 이메일(아이디)를 입력하세요.');
            return;
        }
        try {
            const queryParams = new URLSearchParams({
                name: isExistUser.name,
                email: isExistUser.email,
            }).toString();//객체로 Get을 수행하기 위해 URLSearchParams를 통해 값을 넘겨줘야함.
            const IsExistResponse = await axios.get(`${baseURL}/existUser?${queryParams}`);//비밀번호 변경 전 존재하는 사용자인지 판단
            if (IsExistResponse.data === "exist") {
                alert('가입 여부가 확인되었습니다. 비밀번호를 변경해주세요.');
            } else {
                alert('존재하지 않는 사용자 또는 틀린 정보입니다.');
            }
        } catch (error) {
            console.error(error);
            alert('요청 중 문제가 발생했습니다.');
        }
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    {type === 'email' ? 'Find Email' : 'Change Password'}
                </h2>
                {/* 입력부. 이메일 찾기인지 비밀번호 변경인지에 따라 다르게 출력 */}
                {type === 'email' ? (//이메일 찾기라면
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">이름</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름을 입력하세요"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                ) : (//비밀번호 찾기라면
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                            <input
                                type="email"
                                value={isExistUser.email}
                                onChange={(e) => 
                                    setIsExistUser({
                                        ...isExistUser,
                                        email: e.target.value
                                    })
                                }
                                placeholder="이메일을 입력하세요"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">이름</label>
                            <input
                                type="text"
                                value={type === "password" ? isExistUser.name : name}
                                onChange={ (e) => {
                                    if (type === "password") {
                                        setIsExistUser({
                                            ...isExistUser,
                                            name: e.target.value
                                        })
                                    } else {
                                        setName(e.target.value)
                                    }
                                }}
                                placeholder="이름을 입력하세요"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                )}
                {/* 버튼부 */}
                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        닫기
                    </button>
                    <button
                        onClick={() => {
                            if(type === "email"){
                                findEmail();
                            }else{
                                modPassword();
                            }
                        }}
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};