/* eslint-disable */
import { FC, useEffect, useState } from "react";
import { WriteModal } from "../components/modal/WriteModal";
import axios from "axios";
import { baseURL } from "../config/api";
import { Post } from "../types/posts";

export const MainPage: FC<{}> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림 상태
    const [posts, setPosts] = useState<Post[]>([]); // 게시글 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const postsPerPage = 6; // 페이지당 게시글 수

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${baseURL}`);
            setPosts(response.data);
        } catch (error) {
            alert("서버에 문제가 발생했습니다.");
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="flex">
            {/* 사이드바 */}
            <aside className="h-screen w-64 bg-blue-500 text-white fixed top-0 left-0 shadow-md">
                <div className="text-2xl font-bold text-center py-6">ReactStudy</div>
                <ul className="mt-6 space-y-2">
                    <li className="py-2 px-4 hover:text-2xl cursor-pointer">Post</li>
                    <li className="py-2 px-4 hover:text-2xl cursor-pointer">MyPage</li>
                    <li className="py-2 px-4 hover:text-2xl cursor-pointer">menu</li>
                    <li className="py-2 px-4 hover:text-2xl cursor-pointer">menu</li>
                    <li className="py-2 px-4 hover:text-2xl cursor-pointer">menu</li>
                </ul>
            </aside>

            {/* 메인 컨텐츠 */}
            <main className="ml-64 w-full">
                    {/* 상단 헤더 */}
                    <div className="fixed top-0 left-64 flex">
                        <div className="mx-auto flex items-center justify-between pt-6 py-4 px-6">
                            <h1 className="text-2xl font-bold text-blue-500">Post</h1>
                        </div>
                        {/* 게시글 작성 버튼 */}
                        <div className="flex justify-end items-center pt-2">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-16 h-16 bg-blue-500 text-white font-bold rounded-full shadow-md flex items-center justify-center text-3xl hover:bg-blue-600 hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                +
                            </button>
                        </div>
                    </div>

                <div className="pt-20 px-6">
                    {/* 게시글 리스트 */}
                    <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {currentPosts.map((post, index) => (
                            <div key={index} className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-blue-300">
                                <div className="h-48 bg-gray-300 flex items-center justify-center">
                                    이미지
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
                </div>

                {/* 모달 컴포넌트 */}
                <WriteModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        fetchPosts();
                    }}
                />
            </main>
        </div>
    );
};