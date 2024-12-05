/* eslint-disable */
import { useEffect, useState } from 'react';
import BoardModal from "../modal/WriteModal";
import axios from 'axios';

const baseURL = "http://localhost:8080/api/v1/reactstudy";

function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림 상태 (초기값 false)
    const [posts, setPosts] = useState([]); // 게시글 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const postsPerPage = 6; // 페이지당 게시글 수

    const fetchPosts = async () => { // 게시글 조회
        try {
            const response = await axios.get(`${baseURL}`);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber : number) => setCurrentPage(pageNumber);

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
                        onClick={() => setIsModalOpen(true)} // 버튼을 누르면 setIsModalOpen 상태에 true 입력
                        className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        게시글 작성하기
                    </button>
                </div>

                {/* 게시글 리스트 */}
                <div className="container mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map((post, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md overflow-hidden h-[320px] w-[330px] mx-auto">
                            <div className="h-[230px] bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-500">이미지 공간</span>
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
                                <p className="text-gray-600 mt-2">{post.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex space-x-2">
                            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => i + 1).map(pageNumber => (
                                <li key={pageNumber}>
                                    <button
                                        onClick={() => paginate(pageNumber)}
                                        className={`px-4 py-2 rounded-md shadow-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
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