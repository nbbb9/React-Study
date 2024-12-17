/* eslint-disable */
import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseURL } from '../config/api';

export const PhotoTestPage: FC<{}> = () => {
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file); // 파일 상태 저장
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result); // 미리보기 설정
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('이미지를 선택하세요.');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile); // 파일 추가

        try {
            const response = await axios.post(`${baseURL}images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('이미지 업로드 성공: ' + response.data.imageUrl);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('업로드 실패');
        }
    };

    return (
        <>
            <section>
                <h1>PhotoTest</h1>
            </section>
            <section>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">이미지 업로드</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleImageUpload}
                    />
                </div>
                {preview && (
                    <div className="mt-4">
                        <h2 className="text-lg font-medium">이미지 미리보기</h2>
                        <img src={preview} alt="Uploaded Preview" className="mt-2 w-full max-w-md border rounded-md" />
                    </div>
                )}
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    업로드
                </button>
            </section>
        </>
    );
}