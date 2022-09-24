import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {getSaleList, postSaleComplete} from "../api/sale";
import {timeSince} from "../util/TimeSince";

const HistoryPage = ({member, isLogin}) => {
    const [saleList, setSaleList] = useState([]);
    const [soldOutChange, setSoldOutChange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate('/login', {state: {from: '/sale/history'}})
        }
    }, [isLogin, navigate])

    useEffect(() => {
        if (member.memberId !== '') {
            getSaleList(setSaleList, member.memberId)
        }
        setSoldOutChange(false)
    }, [isLogin, member.memberId, soldOutChange])

    const handleSoldOut =(id) => {
        postSaleComplete(id,member.memberId,setSoldOutChange)
    }

    return (
        <div className='container m-auto'>
            <div className='bg-white bg-opacity-70 p-4 rounded'>
                <div className='text-2xl font-bold mb-4'>📚 {member.nickname}님의 판매 내역 🛒</div>
                {saleList.map((sale) => (
                    <div className='relative bg-white shadow-md rounded-lg mb-4' key={sale.id}>
                            {sale.soldOut ? <div className='bg-red-500 left-[7%] text-xl sm:text-2xl top-[5%] rounded p-1 text-white text-center font-bold absolute z-10'>판매 완료</div> : ''}
                        <div className='p-2'>
                            <div className='flex justify-between'>
                                <div className={sale.soldOut ? 'opacity-40' : ''}>
                                    <div className='flex flex-col text-start'>
                                        <div className='text-sm text-gray-600'>{timeSince(sale.date)}</div>
                                        <div className='text-lg font-bold'><span
                                            className='text-blue-600'>판매 제목: </span>{sale.title}</div>
                                        <div className='text-sm text-gray-600'>판매 가격: {sale.price}원</div>
                                        <div className='flex mt-5'>
                                            <img src={sale.book.thumbnail}
                                                      className='max-w-[5rem] max-h-[7rem]'/>
                                            <div className='mx-2 text-start'>
                                                <div className=''><span
                                                    className='font-bold'>책 제목: </span>{sale.book.title}</div>
                                                <div className=''><span
                                                    className='font-bold'>저자: </span>{sale.book.author}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col text-end min-w-fit border-2 rounded p-1'>
                                    <div className='text-sm text-gray-600 text-start'>판매 상태: <span
                                        className='font-bold block'>{sale.soldOut ? '판매 완료' : '판매 중'}</span></div>
                                    {sale.soldOut ?
                                        <button onClick={()=>handleSoldOut(sale.id)}
                                            className='rounded p-0.5 bg-amber-500 opacity-70 py-1 px-1 text-white my-2 hover:bg-amber-300'>다시
                                            판매</button>
                                        : <button onClick={()=>handleSoldOut(sale.id)}
                                            className='rounded p-0.5 bg-amber-500 opacity-70 py-1 px-1 text-white my-2 hover:bg-amber-300'>거래
                                            완료</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryPage;
