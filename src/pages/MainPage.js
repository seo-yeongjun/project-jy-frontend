import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {getBookCount} from "../api/info";
import {SaleRow} from "../component/SaleRow";


const MainPage = ({isLogin, member}) => {
    const navigate = useNavigate();
    const [bookCount, setBookCount] = useState(0);
    const saleHandler = () => {
        navigate('/sale')
    }
    useEffect(() => {
        getBookCount(setBookCount)
    },[bookCount])
    return (<div>
        <div
            className="bg-opacity-60 rounded bg-white w-1/2 sm:w-1/3 md:w-1/4 m-auto shadow-xl">
            <div className="flex flex-col"><span><span className="text-2xl">📚</span> 판매 중인 책 <span
                className="text-2xl">📚</span></span><span
                className="text-6xl text-gray-700">{bookCount}<span className="text-xl">권</span></span></div>
            <button className="rounded p-0.5 bg-amber-500 opacity-70 py-1 px-1 text-white my-2 hover:bg-amber-300"
                    onClick={saleHandler}>판매 하기
            </button>
        </div>
        <SaleRow></SaleRow>
    </div>)
}

export default MainPage
