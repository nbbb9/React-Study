/* eslint-disable */
import axios from "axios";
import { useState, FC } from "react";
import { baseURL } from '../../config/api';
import { Post } from "../../types/posts";
interface WriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onSave: (title: string, content: string, image: File | null) => void;
}

const initPost: Post = {
    title: "",
    content: "",
    imageUrl: ""
}

export const WriteModal: FC<WriteModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null; //조건부 랜더링(false일 경우 아무것도 랜더링하지 않음.)

    const [postValue, setPostValue] = useState<Post>(initPost);

    const [image, setImage] = useState<File | null>(null);//이미지 상태

    const handleSubmit = async () => {
        if (!postValue.title || !postValue.content) {
            alert('제목과 내용을 입력하세요.');
            return;
        }
    
        const formData = new FormData();
    
        formData.append('title', postValue.title);
        formData.append('content', postValue.content);
    
        if (image) formData.append('image', image); // 이미지 파일 포함
    
        try {
            const response = await axios.post(`${baseURL}/addpost`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // 인증 토큰 전달
                },
            });
    
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
                            value={postValue.title}
                            onChange={(e) => setPostValue({...postValue, title : e.target.value})}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 내용 입력 */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                        <textarea 
                            placeholder="내용을 입력하세요"
                            value={postValue.content}
                            onChange={(e) => setPostValue({...postValue, content : e.target.value})}
                            rows={5}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 이미지 업로드 */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">이미지 업로드</label>
                        <input 
                            type="file"//파일을 업로드 할 때 사용
                            accept="image/*"
                            onChange={(e) => setImage(e?.target?.files[0])}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        등록
                    </button>
                </div>
            </div>
        </div>
    )
};