//react app

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import ToastEditor from "../component/JYEditor";
import {getBooksByName, getLecturesByName} from "../api/info";
import SelectBooks from "../component/SelectBooks";
import useDebounce from "../hooks/useDebounce";
import SelectLectures from "../component/SelectLectures";
import {postSale} from "../api/sale";
import {Textarea} from "@mobiscroll/react-lite";

const SalePage = ({isLogin, member, departments}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [lecture, setLecture] = useState({title: '', departmentId: ''})
    const [review, setReview] = useState('')
    const [book, setBook] = useState({title: '', author: '', publisher: '', price: '', isbn: '', image: ''})
    const [connect, setConnect] = useState('')

    const [existBook, setExistBook] = useState(false)
    const [existLecture, setExistLecture] = useState(false)
    const [bookTitle, setBookTitle] = useState('')
    const [lectureTitle, setLectureTitle] = useState('')
    const [books, setBooks] = useState([])
    const [lectures, setLectures] = useState([])

    const [isPost, setIsPost] = useState(false)


    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const connectHandler = (e) => {
        setConnect(e.target.value)
    }

    const reviewHandler = (e) => {
        setReview(e.target.value)
    }

    const navigate = useNavigate()

    const departmentName = (optionId) => {
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
        }
    }, [lectureValue])
    useEffect(() => {
        if (lectureTitle.length === 0) {
            setLectures([])
        }
    }, [lectureTitle])

    useEffect(() => {
        if (!isLogin) {
            navigate('/login', {state: {from: '/sale'}})
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        if (book.title === '' || lecture.title === '' || title === '' || content === '' || connect === '') {
            if (book.title === '') {
                alert('책을 선택해주세요.')
                return
            }
            if (lecture.title === '') {
                alert('강의를 선택해주세요.')
                return
            }
            if (title === '') {
                alert('제목을 입력해주세요.')
                return
            }
            if (content === '') {
                alert('내용을 입력해주세요.')
                return
            }
            if (connect === '') {
                alert('연락처를 입력해주세요.')
            }
        } else {
            const sale = {
                book: {
                    title: book.title,
                    publisher: book.publisher,
                    author: book.author,
                    code: book.isbn,
                    thumbnail: book.image
                },
                lecture: {
                    title: lecture.title,
                    department: lecture.departmentId,
                    id: lecture.id
                },
                saleBook: {
                    content: content,
                    title: title,
                    soldOut: false,
                    connect: connect

                },
                lectureReview: {
                    lectureId: lecture.id,
                    content: review,
                },
                memberId: member.memberId
            }
            postSale(sale, setIsPost)
        }
    }
    useEffect(() => {
        if (isPost) {
            alert('등록되었습니다.')
            navigate('/')
        }
    }, [isPost,navigate])
    return (/*책 판매 등록 페이지*/
        <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-screen-lg">
                    <div className="bg-white bg-opacity-70 shadow-md rounded px-2 pt-4 pb-8 mb-4">
                        <div className="mb-2 font-bold text-lg">판매 등록</div>
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
                            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="review">
                                과목 후기
                            </label>
                            <Textarea id='review' rows='3' className='shadow appearance-none border rounded w-full'
                                      placeholder='다른 학우들을 위해 과목 후기를 작성해 주시겠어요?&#13;&#10;원치 않으시면 빈칸으로 두시면 됩니다.'
                                      onChange={reviewHandler} value={review}></Textarea>
                        </div>
                        <div className="border p-2 rounded bg-white mb-2">
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    판매글 제목
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="글 제목을 입력해주세요." onChange={titleHandler} value={title}/>
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
                            <input type="text" id='phoneNumber' placeholder="010-0000-0000" onChange={connectHandler}
                                   value={connect}
                                   className="shadow appearance-none mt-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={submitHandler}
                                className="bg-blue-500 hover:bg-blue-700 text-white w-1/2 m-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">등록
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SalePage;
