//react app

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import ToastEditor from "../component/JYEditor";
import {getBooksByName, getDepartments, getLecturesByName} from "../api/info";
import SelectBooks from "../component/SelectBooks";
import useDebounce from "../hooks/useDebounce";
import SelectLectures from "../component/SelectLectures";

const SalePage = ({isLogin, member}) => {
    const [content, setContent] = useState('')
    const [existBook, setExistBook] = useState(false)
    const [existLecture, setExistLecture] = useState(false)
    const [bookTitle, setBookTitle] = useState('')
    const [lectureTitle, setLectureTitle] = useState('')
    const [book, setBook] = useState({title: '', author: '', publisher: '', price: '', isbn: '', image: ''})
    const [books, setBooks] = useState([])
    const [lectures, setLectures] = useState([])
    const [lecture, setLecture] = useState({title: ''})
    const [departments, setDepatments] = useState([])

    useEffect(() => {
        getDepartments(setDepatments)
    }, [])

    const navigate = useNavigate()

    const departmentName = (optionId) =>{
        let department = departments.filter(department => department.id === optionId)
        return department[0].name
    }

    const bookHandler = (e) => {
        setBookTitle(e.target.value)
    }
    let bookValue = useDebounce(bookTitle, 500)
    useEffect(() => {
        if (bookValue.length > 0) {
            getBooksByName(setBooks, bookValue)
        }
    }, [bookValue])
    useEffect(() => {
        if (bookTitle.length === 0) {
            setBooks([])
        }
    }, [bookTitle])

    const lectureHandler = (e) => {
        setLectureTitle(e.target.value)
    }
    let lectureValue = useDebounce(lectureTitle, 500)
    useEffect(() => {
        if (lectureValue.length > 0) {
            getLecturesByName(setLectures, lectureValue)
            console.log(lectures)
        }
    }, [lectureValue])
    useEffect(() => {
        if (lectureTitle.length === 0) {
            setLectures([])
        }
    }, [lectureTitle])

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
    })

    return (/*책 판매 등록 페이지*/
        <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-screen-lg">
                    <form className="bg-white bg-opacity-70 shadow-md rounded px-2 pt-6 pb-8 mb-4">
                        <div className="border p-2 rounded bg-white mb-2">
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    판매할 책 찾기
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="title" type="text" placeholder="ex) 수학의 정석, 홍성대, 성지출판" onChange={bookHandler}
                                    value={bookTitle}/>
                                {
                                    (books.length > 0) ?
                                        <SelectBooks books={books} setBook={setBook} setExistBook={setExistBook}
                                                     setBookTitle={setBookTitle}></SelectBooks>
                                        : (bookTitle.length > 0) ?
                                            <div className="text-red-500">검색 결과가 없습니다.</div> : null}
                            </div>
                            {existBook ?
                                <div>
                                    <div className="mb-4 font-bold">선택 하신 판매 책</div>
                                    <div className="flex m-auto">
                                        <div className="w-1/3">
                                            <img className='w-full p-3 max-h-72 w-auto'
                                                 src={book.image}
                                                 loading="lazy"
                                                 alt={book.title}/>
                                        </div>
                                        <div className="w-2/3">
                                            <div className='text-start'>
                                                <span className='text-start text-emerald-800'>제목 </span>
                                                {book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title}
                                            </div>
                                            <div className='mt-3'>
                                                <div className='text-start'>{book.author ?
                                                    <span className='text-blue-500'>저자</span> : ''} {book.author}</div>
                                                <div className='text-start'><span
                                                    className='text-orange-500'>출판사 </span>{book.publisher}</div>
                                                <div className='text-start'><span
                                                    className='text-purple-500'>ISBN </span>{book.isbn}</div>
                                                <div className='text-start'><span
                                                    className='text-amber-900'>출간일 </span>{book.pubdate}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : <div className="mb-4"></div>}
                        </div>
                        <div className="border p-2 rounded bg-white mb-2">
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="lecture">
                                    판매 책의 강의 찾기
                                </label>
                                <input onChange={lectureHandler} value={lectureTitle}
                                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="lecture" type="text" placeholder="ex) 채플"/>
                                {
                                    (lectures.length > 0) ?
                                        <SelectLectures lectures={lectures} setLecture={setLecture}
                                                        setExistLecture={setExistLecture} departments={departments}
                                                        setLectureTitle={setLectureTitle}></SelectLectures>
                                        : (lectureValue !== '') ? <div className='text-center'>검색 결과가 없습니다.</div> : ''}
                            </div>
                            {existLecture ?
                                <div>
                                    <div className="mb-4 font-bold">선택 하신 강의</div>
                                    <span>&lt;{departmentName(parseInt(lecture.departmentId))}&gt; {lecture.title}</span>
                                </div> : <div className="mb-4"></div>}

                        </div>
                        <div className="border p-2 rounded bg-white mb-2">
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    판매글 제목
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="글 제목을 입력해주세요."/>
                            </div>
                            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                설명
                            </label>
                            <ToastEditor setContent={setContent}></ToastEditor>
                        </div>
                        <div className="border p-2 rounded bg-white mb-2">
                            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                연락처
                            </label>
                            <input type="text" id='phoneNumber' placeholder="010-0000-0000"
                                   className="shadow appearance-none mt-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mt-6">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white w-1/2 m-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">등록
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default SalePage;
