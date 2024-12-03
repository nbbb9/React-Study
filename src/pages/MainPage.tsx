/* eslint-disable */
import { useState } from 'react';
import BoardModal from "../modal/WriteModal";

function MainPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);//모달의 열림 상태

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    <h1 className="text-2xl font-bold">MainPage</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="#" className="hover:text-gray-200">Home</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-200">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-200">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="min-h-screen bg-gray-100 py-10">
                <div className="container mx-auto text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        게시글 작성하기
                    </button>
                </div>
            </section>

            {/* 모달 컴포넌트 */}
            <BoardModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
}

export default MainPage;