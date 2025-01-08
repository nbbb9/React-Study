// /* eslint-disable */
// import { useDropzone } from "react-dropzone";
// import noImg from "@/assets/img/no-image.png";

// export const SingleImageDragUpload = ({
//     // url,
//     currentUrl,//현재 표시할 이미지 URL
//     setImage,//업로드된 이미지의 URL을 상위 컴포넌트에 전달하는 콜백 함수
//     setFile,//업로드된 파일 객체를 상위 컴포넌트에 전달하는 콜백 함수
//     height = "220px", //업로드 영역의 높이
//     editable = true,//이미지 업로드 가능 여부
//     defualtImage = noImg,//이미지가 없을 때 표시할 기본 이미지
// }) => {
//     const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({//useDropzone 훅을 통해 파일이 드롭되면 acceptedFile에 이미지 파일이 전달됨.
//         onDrop: (acceptedFile) => {//onDrop이벤트에서 이미지 파일을 받아온다.
//             if (!editable) return;
//             const imageUrl = URL.createObjectURL(acceptedFile[0]);//URL.createObjectURL메서드를 사용해 로컬 이미지 미리보기 URL 생성
//             setImage(imageUrl);//미리보기 URL을 상위 컴포넌트에 전달
//             setFile(acceptedFile[0]);//파일 객체를 전달
//         },
//         accept: {//허용할 파일 유형 지정
//             "image/*": [".jpeg", ".jpg", ".png"],
//         },
//     });

//     return (
//         <div className="h-full">
//             <div className="flex flex-row items-center">
//                 {/* <ArticleTitle title={title} />
//                 {isToolTip && (
//                     <Tooltip title="이미지 사이즈는 알맞게 조절됩니다." arrow>
//                         <div className="w-[25px] h-[25px]">
//                             <IoMdInformationCircle className="text-2xl text-my-soft-green" />
//                         </div>
//                     </Tooltip>
//                 )} */}
//             </div>

//             <div
//                 {...getImageRootProps({
//                     className: "border-2 flex justify-center items-center rounded-xl text-center bg-white",
//                     style: { height },
//                 })}
//             >
//                 {/* <input {...getImageInputProps()} readOnly={editable} /> */}
//                 <input {...getImageInputProps()} />
//                 {currentUrl && (
//                     <img
//                         id="img"
//                         className="object-scale-down w-full"
//                         style={{ height: "100%" }}
//                         src={currentUrl} // || `${baseURL}/${url}`
//                         onError={(e) => ((e.target as HTMLImageElement).src = noImg)}
//                     />
//                 )}
//                 {!currentUrl && (//불러온 이미지가 없다면 안전 이미지로 변경
//                     <img
//                         id="img"
//                         className="object-scale-down w-full"
//                         style={{ height: "100px" }}
//                         src={defualtImage} // || `${baseURL}/${url}`
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };
