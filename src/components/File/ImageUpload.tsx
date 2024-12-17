import React, { FC, useRef } from "react";

interface IProps {
    defaultImage?: string;
    readonly?: boolean;
    imageUrl?: string;
    /**
     * 이미지 높이
     * @default 100px
     */
    height?: string;
    onChange?: (file: File, url?: string) => void;
}

/**
 * @author 2
 * @function ImageUpload
 **/

export const ImageUpload: FC<IProps> = ({ readonly, imageUrl, height = "100px", defaultImage, onChange }) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (readonly) return;
        fileRef.current?.click();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onChange?.(file, URL.createObjectURL(file));
    };

    return (
        <div
            style={{ height }}
            onClick={handleClick}
            className="flex flex-row items-center justify-center w-full border border-gray-200 rounded-md cursor-pointer"
        >
            {imageUrl ? (
                <div
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    className="w-full h-full bg-center bg-no-repeat bg-contain"
                ></div>
            ) : (
                <>
                    {defaultImage ? (
                        <div
                            style={{ backgroundImage: `url(${defaultImage})` }}
                            className="w-full h-full bg-center bg-no-repeat bg-contain"
                        ></div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-200 ">
                            <span className="text-gray-500">이미지를 업로드해주세요.</span>
                        </div>
                    )}
                </>
            )}
            <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleFileUpload} />
        </div>
    );
};