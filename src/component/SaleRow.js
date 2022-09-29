import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../api/axios";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {timeSince} from "../util/TimeSince";

export const SaleRow = ({departments}) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let q = useQuery().get('q');

    const [page, setPage] = useState(0);
    const [list, setList] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [maxPage, setMaxPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [soldOutChange, setSoldOutChange] = useState(false);
    const [value, setValue] = useState(useQuery().get('q'));

    useEffect(() => {
        setSoldOutChange(false)
        setHasMore(true);
        setList([]);
        setPage(0);
        setMaxPage(1);
        setValue(q);
    }, [q])

    const handleSoldOutChange = () => {
        setSoldOutChange(!soldOutChange)
    }

    const departmentName = (optionId) => {
        let department = departments.filter(department => department.id === optionId)
        return department[0].name
    }

    const item = (li) =>
        <Link to={`/sale/${li.id}`} state={{detail: li}}>
            <div className="w-full relative bg-white bg-opacity-90 hover:bg-gray-200 rounded shadow my-2">
                {li.soldOut ? <div
                    className='bg-red-500 left-[2rem] text-sm sm:text-xl top-[7%] rounded p-1 text-white text-center font-bold absolute z-10'>거래
                    완료</div> : ''}
                <div className='text-sm text-right mr-2 text-gray-600 pt-1'><span className='text-blue-500 mr-2'>조회수: {li.view}</span> {timeSince(li.date)}</div>
                <div className={li.soldOut ? 'opacity-40 rounded shadow-xl p-2 flex ' : 'rounded shadow-xl px-2 pb-2 flex'}>
                    <img className='max-h-40 max-w-[8rem] m-auto mx-2' src={li.book.thumbnail}
                         alt={li.book.title}/>
                    <div className='rounded border-2 w-full p-1 mt-2 text-start'>
                        <div className='mb-1'><span
                            className='text-sm text-blue-500'>판매 제목:</span> {li.title}
                        </div>
                        <div className='my-1'><span
                            className='text-sm text-blue-500'>책 제목:</span> {li.book.title}
                        </div>
                        <div className='my-1'><span
                            className='text-sm text-blue-500'>수업명:</span> &lt;{departmentName(parseInt(li.lecture.departmentId))}&gt; {li.lecture.title}
                        </div>
                        <div className='my-1'><span
                            className='text-sm text-blue-500'>희망 가격:</span> {li.price}원
                        </div>
                        <div><span
                            className='text-sm text-blue-500'>판매자: <br
                            className='sm:hidden inline'/></span>{li.member.nickname}
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    let children = list.map((li) =>
        <div key={li.id}>
            {!soldOutChange ?
                item(li) :
                !li.soldOut ? item(li) : ''
            }
        </div>
    )
    useEffect(() => {
        //search가 있을 경우
        if (value === undefined || value === '' || value == null) {
            fetchRow()
        } else {
            searchRow(value)
        }
    }, [value]);

    const fetchRow = async () => {
        setIsLoading(true)
        await axios({method: 'GET', url: `/info/book/page/${page}`}).then((res) => {
            if (res.data.content.length === 0) {
                setHasMore(false)
            } else {
                setList(prev => {
                    if (prev.length === 0 || (prev.length > 0 && prev[0].id !== res.data.content[0].id)) {
                        return [...prev, ...res.data.content]
                    } else
                        return prev
                }); //리스트 추가
                setMaxPage(res.data.totalPages);
                setPage(prev => prev + 1);
                if (page === maxPage) {
                    setHasMore(false)
                }
            }
        })
        setIsLoading(false)
    }

    const searchRow = async (value) => {
        setIsLoading(true)
        await axios({method: 'GET', url: `/info/book/search/${value}/${page}`}).then((res) => {
            if (res.data.content.length === 0) {
                setHasMore(false)
            } else {
                setList(prev => {
                    if (prev.length === 0 || (prev.length > 0 && prev[0].id !== res.data.content[0].id)) {
                        return [...prev, ...res.data.content]
                    } else
                        return prev
                }); //리스트 추가
                setMaxPage(res.data.totalPages);
                setPage(prev => prev + 1);
                if (page === maxPage) {
                    setHasMore(false)
                }
            }
        })
        setIsLoading(false)
    }

    return (
        <div className="min-h-[50vh] bg-white bg-opacity-50 rounded w-full md:w-10/12 mx-auto mt-4 p-2 shadow-2xl">
            <div className='w-full'>
                <div className='font-bold text-center'>
                    {//search가 있을 경우
                        value === undefined || value === '' || value == null ? '😊현재 이런 책들이 판매되고 있어요.😊' : `🔎 ${value}에 대한 검색 값이에요! 🔍`}</div>
                <div className='text-start mx-1 mt-2 bg-orange-50 w-fit px-2 rounded'>
                    <label htmlFor='soldOutChecker'>구매 가능한 책만 보기 </label>
                    <input id='soldOutChecker' onChange={handleSoldOutChange} checked={soldOutChange} type="checkbox"/>
                </div>
            </div>
            { //list가 없을 경우
                (list.length === 0 && !isloading) ?
                    <div className="w-fit min-h-[20vh] mx-auto bg-white bg-opacity-90 my-3 rounded p-3">
                        <div className='text-center text-xl font-bold'>🤔 아직 등록된 책이 없어요. 🤔</div>
                        <div className='mt-4 flex flex-col w-full items-center justify-center'>
                            <a className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2'
                               href={`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Used&SearchWord=${value || ''}&x=0&y=0`}
                               target="_blank" rel="noopener noreferrer">
                                {`알라딘 중고매장에서 ${value || ''} 찾아보기`}
                            </a>
                            <a className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded my-2'
                               href={`http://m.yes24.com/Search?query=%${value || ''}&domain=USED_GOODS&viewMode=&page=1&size=24`}
                               target="_blank" rel="noopener noreferrer">
                                {`yes24 중고매장에서 ${value || ''} 찾아보기`}
                            </a>
                            <a className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded my-2'
                               href={`https://search.kyobobook.co.kr/web/search?vPstrKeyWord=${value || ''}&orderClick=&collName=USED&searchPcondition=1`}
                               target="_blank" rel="noopener noreferrer">
                                {`교보문고 중고매장에서 ${value || ''} 찾아보기`}
                            </a>
                        </div>
                    </div>
                    : ''}
            <InfiniteScroll next={(value === undefined || value === '' || value == null) ? fetchRow : searchRow}
                            hasMore={hasMore}
                            dataLength={list.length} children={children}
                            endMessage={(
                                <div className='bg-white rounded w-fit m-auto px-5 py-1'>위 판매 글이 마지막 판매 글 이에요.</div>)}
                            loader={(<div>loading...</div>)}></InfiniteScroll>
        </div>
    )
}
