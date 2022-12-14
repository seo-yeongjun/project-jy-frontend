import React, {useEffect, useState} from 'react';
import {getSale, postSale, postSaleEdit} from "../api/sale";
import SelectBooks from "../component/SelectBooks";
import SelectLectures from "../component/SelectLectures";
import {Textarea} from "@mobiscroll/react-lite";
import ToastEditor from "../component/JYEditor";
import {useNavigate} from "react-router";
import useDebounce from "../hooks/useDebounce";
import {getBooksByName, getLecturesByName} from "../api/info";


const EditPage = ({isLogin, member, departments}) => {

    const [existBook, setExistBook] = useState(true)
    const [existLecture, setExistLecture] = useState(true)
    const [bookTitle, setBookTitle] = useState('')
    const [lectureTitle, setLectureTitle] = useState('')
    const [isPost, setIsPost] = useState(false)
    const id = window.location.pathname.split('/')[3]
    const [saleBook, setSaleBook] = React.useState({
        id: '', title: '',
        book: {author: "", code: "", id: '', publisher: "", thumbnail: "", title: ""}
        , connect: ""
        , content: ""
        , date: ""
        , lecture: {id: '', title: '', departmentId: ''}
        , member: {id: '', email: '', memberId: '', password: '', nickname: ''}
        , price: ''
        , soldOut: false
        , view: ''
    })
    const [books, setBooks] = useState([])
    const [lectures, setLectures] = useState([])
    const [book, setBook] = useState({author: "", code: "", id: '', publisher: "", thumbnail: "", title: ""})
    const [lecture, setLecture] = useState({id: '', title: '', departmentId: 1})
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSale(id, member.memberId, setSaleBook, setLoading)
    }, [member])

    useEffect(() => {
        if (loading) {
            setBook({...saleBook.book})
            setLecture({...saleBook.lecture})
            setContent(saleBook.content)
        }
    }, [loading])

    const titleHandler = (e) => {
        setSaleBook({...saleBook, title: e.target.value})
    }

    const connectHandler = (e) => {
        setSaleBook({...saleBook, connect: e.target.value})
    }

    const priceHandler = (e) => {
        setSaleBook({...saleBook, price: e.target.value})
    };

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
        if (bookValue.length === 0) {
            setBooks([])
        }
    }, [bookValue])


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
    }, [isLogin, navigate])
    useEffect(() => {
        if (loading)
            setBook({...saleBook.book})
    }, [loading])
    useEffect(() => {
        if (loading)
            setLecture({...saleBook.lecture})
    }, [loading])
    useEffect(() => {
        if (loading)
            setContent(saleBook.content)
    }, [loading])

    useEffect(() => {
        setSaleBook({...saleBook, book: {...book, thumbnail: book.image, code: book.isbn}})
    }, [book])
    useEffect(() => {
        setSaleBook({...saleBook, lecture: {...lecture}})
    }, [lecture])
    useEffect(() => {
        setSaleBook({...saleBook, content: content})
    }, [content])

    const submitHandler = (e) => {
        e.preventDefault()
        if (saleBook.book.title === '' || saleBook.lecture.title === '' || saleBook.title === '' || saleBook.content === '' || saleBook.connect === '' || saleBook.price === '') {
            if (saleBook.book.title === '') {
                alert('?????? ??????????????????.')
                return
            }
            if (saleBook.lecture.title === '') {
                alert('????????? ??????????????????.')
                return
            }
            if (saleBook.title === '') {
                alert('????????? ??????????????????.')
                return
            }
            if (saleBook.content === '') {
                alert('????????? ??????????????????.')
                return
            }
            if (saleBook.connect === '') {
                alert('???????????? ??????????????????.')
            }
            if (saleBook.price === '') {
                alert('????????? ??????????????????.')
            }
        } else {
            postSaleEdit(saleBook, setIsPost, member.memberId)
        }
    }
    useEffect(() => {
        if (isPost) {
            alert('?????????????????????.')
            navigate('/sale/history')
        }
    }, [isPost, navigate])
    if (loading) {
        return (/*??? ?????? ?????? ?????????*/
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-screen-lg">
                        <div className="bg-white bg-opacity-70 shadow-md rounded px-2 pt-4 pb-8 mb-4">
                            <div className="mb-2 font-bold text-lg">?????? ??????</div>
                            <div className="border p-2 rounded bg-white mb-2">
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        ????????? ??? ??????
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title" type="text" placeholder="ex) ????????? ??????, ?????????, ????????????"
                                        onChange={bookHandler}
                                        value={bookTitle}/>
                                    {
                                        (books.length > 0) ?
                                            <SelectBooks books={books} setBook={setBook} setExistBook={setExistBook}
                                                         setBookTitle={setBookTitle}></SelectBooks>
                                            : (bookTitle.length > 0) ?
                                                <div className="text-red-500">?????? ????????? ????????????.</div> : null}
                                </div>
                                {(existBook) ?
                                    <div>
                                        <div className="mb-4 font-bold">?????? ?????? ?????? ???</div>
                                        <div className="flex m-auto">
                                            <div className="w-1/3">
                                                <img className='w-full p-3 max-h-72 w-auto'
                                                     src={saleBook.book.thumbnail}
                                                     loading="lazy"
                                                     alt={saleBook.book.title}/>
                                            </div>
                                            <div className="w-2/3">
                                                <div className='text-start'>
                                                    <span className='text-start text-emerald-800'>?????? </span>
                                                    {saleBook.book.title.length > 20 ? saleBook.book.title.substring(0, 20) + '...' : saleBook.book.title}
                                                </div>
                                                <div className='mt-3'>
                                                    <div className='text-start'>{saleBook.book.author ?
                                                        <span
                                                            className='text-blue-500'>??????</span> : ''} {saleBook.book.author}</div>
                                                    <div className='text-start'><span
                                                        className='text-orange-500'>????????? </span>{saleBook.book.publisher}
                                                    </div>
                                                    <div className='text-start'><span
                                                        className='text-purple-500'>ISBN </span>{saleBook.book.code}
                                                    </div>
                                                    <div className='text-start'><span
                                                        className='text-amber-900'>????????? </span>{saleBook.book.pubdate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : <div className="mb-4"></div>}
                            </div>
                            <div className="border p-2 rounded bg-white mb-2">
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="lecture">
                                        ?????? ?????? ?????? ??????
                                    </label>
                                    <input onChange={lectureHandler} value={lectureTitle}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="lecture" type="text" placeholder="ex) ????????? ?????? ?????? ?????? '??????' ?????? ????????? ?????????."/>
                                    {
                                        (lectures.length > 0) ?
                                            <SelectLectures lectures={lectures} setLecture={setLecture}
                                                            setExistLecture={setExistLecture} departments={departments}
                                                            setLectureTitle={setLectureTitle}></SelectLectures>
                                            : (lectureValue !== '') ?
                                                <div className='text-center'>?????? ????????? ????????????.</div> : ''}
                                </div>
                                {existLecture ?
                                    <div>
                                        <div className="mb-4 font-bold">?????? ?????? ??????</div>
                                        <span>&lt;{departmentName(parseInt(saleBook.lecture.departmentId))}&gt; {saleBook.lecture.title}</span>
                                    </div> : <div className="mb-4"></div>}
                            </div>
                            <div className="border p-2 rounded bg-white mb-2">
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        ????????? ??????
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text" placeholder="??? ????????? ??????????????????." onChange={titleHandler}
                                        value={saleBook.title}/>
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        ?????? ??????
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number" placeholder="8000" onChange={priceHandler}
                                        value={saleBook.price}/>
                                </div>
                                <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    ??????
                                </label>
                                <ToastEditor setContent={setContent} memberId={member.memberId}
                                             content={content}></ToastEditor>
                            </div>
                            <div className="border p-2 rounded bg-white mb-2">
                                <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                    ?????????
                                </label>
                                <input type="text" id='phoneNumber' placeholder="?????? ?????????, ???????????? ??? ???????????? ??????????????????!"
                                       onChange={connectHandler}
                                       value={saleBook.connect}
                                       className="shadow appearance-none mt-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={submitHandler}
                                    className="bg-blue-500 hover:bg-blue-700 text-white w-1/2 m-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button">??????
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    } else {
        return <div></div>
    }
};

export default EditPage;
