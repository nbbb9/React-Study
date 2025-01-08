/* eslint-disable */
import axios from "axios";
import { useState, FC } from "react";
import { baseURL } from '../../config/api';
import { Post } from "../../types/posts";
interface WriteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const initPost: Post = {//게시글 Form 초기값
    title: "",
    content: ""
}

export const WriteModal: FC<WriteModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;//조건부 랜더링(false일 경우 아무것도 랜더링하지 않음.)

    // const [image, setImage] = useState<File | null>(null);//이미지 상태
    const [postForm, setPostForm] = useState<Post>(initPost);

    const savePost = async () => {//게시글 등록
        if (!postForm.title) {
            alert('제목을 입력하세요.');
            return;
        } else if (!postForm.content) {
            alert('내용을 입력하세요.');
            return;
        }
        //if (image) postForm.append('image', image); // 이미지 파일 포함
        try {
            const response = await axios.post(`${baseURL}/addpost`, postForm);
            if (response.status === 200) {
                alert('게시글이 성공적으로 저장되었습니다.');
                onClose();
            }
        } catch (error) {
            console.error('게시글 등록 중 오류 발생:', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[90%] max-w-3xl rounded-lg shadow-lg">
                {/* 헤더 */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">게시글 작성</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        &times;
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {/* 제목 입력 */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
                        <input 
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={postForm.title}
                            onChange={(newValue) => 
                                setPostForm({
                                    ...postForm, title : newValue.target.value
                                })
                            }
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* 내용 입력 */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                        <textarea 
                            placeholder="내용을 입력하세요"
                            value={postForm.content}
                            onChange={(newValue) => 
                                setPostForm({
                                    ...postForm, content : newValue.target.value
                                })
                            }
                            rows={5}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* 이미지 업로드 */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">이미지 업로드</label>
                        {/* <input 
                            type="file"//파일을 업로드 할 때 사용
                            accept="image/*"
                            onChange={(e) => setImage(e?.target?.files[0])}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        /> */}
                    </div>
                </div>
                {/* 하단 버튼 */}
                <div className="flex justify-end p-4 border-t">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        닫기
                    </button>
                    <button 
                        onClick={savePost}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        등록
                    </button>
                </div>
            </div>
        </div>
    )
};