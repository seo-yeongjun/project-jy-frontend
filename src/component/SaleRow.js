import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../api/axios";

export const SaleRow = () => {
    const [page, setPage] = useState(0);
    const [list, setList] = useState([]);
    const [isloding, setIsLoding] = useState(false);
    const [maxPage, setMaxPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    let children = list.map((li) =>
        <div key={li.id}>
            <div className="w-full">
                <div className="bg-white bg-opacity-90 rounded shadow-xl p-2 flex my-2">
                    <img className='max-h-40 max-w-[8rem] m-auto mx-2' src={li.book.thumbnail}
                         alt={li.book.title}/>
                    <div className='rounded border-2 w-full p-1 mt-2 text-start'>
                        <div className='mb-1'><span
                            className='text-sm text-blue-500'>판매 제목:</span><br/>{li.title}
                        </div>
                        <div className='my-1'><span
                            className='text-sm text-blue-500'>책 제목:</span><br/>{li.book.title}
                        </div>
                        <div><span
                            className='text-sm text-blue-500'>판매자: <br
                            className='sm:hidden inline'/></span>{li.member.nickname}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    useEffect(() => {
        fetchRow();
    }, [])

    const fetchRow = async () => {
        setIsLoding(true)
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
        setIsLoding(false)
    }
    return (
        <div className="min-h-[50vh] bg-white bg-opacity-50 rounded w-10/12 mx-auto mt-4 p-2">
            <div className='w-full'>
            <span className='font-bold'>
                😊현재 이런 책들이 판매되고 있어요.😊
            </span>
            </div>
            <InfiniteScroll next={fetchRow} hasMore={hasMore} dataLength={list.length} children={children}
                            endMessage={(
                                <div className='bg-white rounded w-fit m-auto px-5 py-1'>위 판매 글이 마지막 판매 글 이에요.</div>)}
                            loader={(<div>loading...</div>)}></InfiniteScroll>
        </div>
    )
}
