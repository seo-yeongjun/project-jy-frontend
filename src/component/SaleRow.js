import axios from "../api/axios";
import {useState, useEffect, useRef, useCallback} from "react";

export const SaleRow = () => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const preventRef = useRef(true);
    const obsRef = useRef(null);

    useEffect(() => {
        getBooks();
        console.log(page)
        const observer = new IntersectionObserver(obsHandler, {threshold: 0.5});
        if (obsRef.current) observer.observe(obsRef.current);
        return () => {
            observer.disconnect();
        }
    }, [])

    useEffect(() => {
        if (page < totalPages) {
            getBooks();
        }
    }, [page])

    const obsHandler = ((entries) => {
        const target = entries[0];
        if (target.isIntersecting && preventRef.current) {
            if (page < totalPages) {
                preventRef.current = false;
                setPage(prev => prev + 1);
            }
        }
    })

    const getBooks = useCallback(async () => { //책 불러오기
        setLoad(true); //로딩 시작
        const res = await axios({method: 'GET', url: `/info/book/page/${page}`});
        if (res.data) {
            setTotalPages(res.data.totalPages)
            if (page <= totalPages) {
                setList(prev => [...prev, ...res.data.content]); //리스트 추가
                preventRef.current = true;
            }
        } else {
        }
        setLoad(false); //로딩 종료
        console.log(list)
    }, [page]);

    return (
        <div className="min-h-[50vh] bg-white bg-opacity-50 rounded w-10/12 m-auto p-2">
            <div className="grid grid-cols-4 grid-cols-1 gap-4">
                {
                    list &&
                    <>
                        {
                            list.map((li) =>
                                <div key={li.id}>
                                    <div className="w-full">
                                        <div className="bg-white bg-opacity-90 rounded shadow-xl p-2 flex">
                                            <img className='max-h-40 m-auto mx-2' src={li.book.thumbnail}
                                                 alt={li.book.title}/>
                                            <div className='rounded border-2 w-full p-1 mt-2 text-start'>
                                                <div className='mb-1'><span className='text-sm text-blue-500'>판매 제목:</span><br/>{li.title}
                                                </div>
                                                <div className='my-1'><span
                                                    className='text-sm text-blue-500'>책 제목:</span><br/>{li.book.title}
                                                </div>
                                                <div><span
                                                    className='text-sm text-blue-500'>판매자: <br className='sm:hidden inline'/></span>{li.member.nickname}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                }
            </div>
            {
                load ?
                    <div className="py-3 bg-blue-500 text-center">로딩 중</div>
                    :
                    <></>
            }
            <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">옵저버 Element</div>
        </div>
    )
}

