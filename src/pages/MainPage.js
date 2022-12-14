import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {getBookCount} from "../api/info";
import {SaleRow} from "../component/SaleRow";
import word from "../commonWord/word";


const MainPage = ({departments}) => {
    const navigate = useNavigate();
    const [bookCount, setBookCount] = useState(0);

    const saleHandler = () => {
        navigate('/sale')
    }

    useEffect(() => {
        getBookCount(setBookCount)
    }, [bookCount])
    return (<div>
        <div
            className="bg-opacity-60 rounded bg-white w-fit p-2 m-auto shadow-2xl">
            <div className="flex flex-col"><span><span className="text-2xl">π</span> {word.title}μ λ±λ‘ λ μ± <span
                className="text-2xl">π</span></span><span
                className="text-6xl text-gray-700">{bookCount}<span className="text-xl">κΆ</span></span></div>
            <button className="rounded p-0.5 bg-amber-500 opacity-70 py-1 px-1 text-white my-2 hover:bg-amber-300"
                    onClick={saleHandler}>νλ§€ νκΈ°
            </button>
        </div>
        <SaleRow departments={departments}></SaleRow>
    </div>)
}

export default MainPage
