/* eslint-disable */
import { FC, useState } from 'react';
import axios from "axios";
import { baseURL } from '../../config/api';

interface FindAccountModalProps {
    onClose: () => void; // 모달 닫기
    type: 'email' | 'password'; // 이메일 찾기 또는 비밀번호 찾기
}

export const FindAccountModal: FC<FindAccountModalProps> = ({ onClose, type }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    {type === 'email' ? '이메일 찾기' : '비밀번호 찾기'}
                </h2>
                {type === 'email' ? (
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
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
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
                )}
                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        닫기
                    </button>
                    <button
                        onClick={() => alert('정보를 제출합니다.')}
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};