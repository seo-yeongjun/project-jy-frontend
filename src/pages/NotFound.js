import React from 'react';
import {useNavigate} from "react-router";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-white bg-opacity-70 py-5">
            <div className="flex flex-col justify-items-center items-center">
                <img src="https://remembermedisk.s3.ap-northeast-2.amazonaws.com/skhubookStatic/img/logo-width.svg" alt="logo"/>
                <div className="w-full">
                    <div className='bg-white pb-10 mb-4'>
                        <h1 className="text-[8rem]">404</h1>
                        <h2 className="font-bold text-gray-500">해당 <span className='text-blue-600'>상품 또는 페이지</span>를 찾을
                            수 없습니다.</h2>
                        <div className='mt-4'>
                            <div className="">아마도 삭제된 상품 이거나,</div>
                            <div>잘못된 url을 입력하신 것 같아요!</div>
                        </div>
                    </div>
                </div>
                <button
                    className='bg-gray-500 hover:bg-gray-100 text-white py-2 px-4 border border-gray-400 rounded shadow'
                    onClick={() => navigate('/')}>홈으로
                </button>
            </div>
        </div>
    );
};

export default NotFound;
