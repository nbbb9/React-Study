/* eslint-disable */
import { useEffect, useState } from 'react';
import BoardModal from "../modal/WriteModal";
import axios from 'axios';

const baseURL = "http://localhost:8080/api/v1/reactstudy";

function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);//모달의 열림 상태 (초기값 false)
    const [posts, setPosts] = useState([]);//게시글 상태
    const [currentPage, setCurrentPage] = useState(1);//현재 페이지 상태
    const postsPerPage = 6; // 페이지당 게시글 수

    const indexOfLastPost = currentPage * postsPerPage;//마지막 게시글의 인덱스. 페이지당 게시글이 6개이고 현재 페이지가 1이면 6
    const indexOfFirstPost = indexOfLastPost - postsPerPage;//첫 번째 게시글의 인덱스. 페이지당 게시글이 6개이고 현재 페이지가 1이면 0
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);//게시글 배열에서 현재 페이지에 해당하는 게시글들만 잘라낸 배열.

    const paginate = (pageNumber : number) => setCurrentPage(pageNumber);

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
                {/* <div className="container mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                </div> */}
                {/* 게시글 리스트 */}
                <div className="container mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map((post, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md overflow-hidden h-[320px] w-[330px] mx-auto">
                            {/* 이미지 영역 */}
                            <div className="h-[230px] bg-gray-300 flex items-center justify-center">
                                {post.imageUrl ? (
                                    <img
                                        src={`${baseURL}${post.imageUrl}`}
                                        className="object-cover h-full w-full"
                                    />
                                ) : (
                                    <span className="text-gray-500">이미지 없음</span>
                                )}
                            </div>
                            {/* 텍스트 영역 */}
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
                            {/* 전체 페이지 수만큼 배열을 만든다. 게시글이 15개이고 postPerPage가 6이라면 [1,2,3]이라는 배열이 생성된다.*/}
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
                onClose={() => {
                    setIsModalOpen(false)
                    fetchPosts()
                }} 
            />
        </>
    );
}

export default MainPage;