import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import {timeSince} from "../util/TimeSince";
import {getBookById, getDepartments, increaseViewCount} from "../api/info";
import Parser from 'html-react-parser';

const DetailPage = ({departments}) => {
    const location = useLocation();
    const pathId = location.pathname.split('/')[2];
    const [count, setCount] = useState(false);
    const [detail, setDetail] = useState({
        id: '',
        content: '',
        connect: '',
        date: '2022-09-24T15:27:45',
        view: '',
        lecture: {id: '', title: '', departmentId: '1'},
        book: {author: '', code: '', id: '', publisher: '', thumbnail: '', title: ''},
        member: {id: '', nickname: '', password: '', memberId: '', email: '', authority: ''}
    });
    const [detailDepartments, setDetailDepartments] = useState(departments);
    const [connectTemp, setConnectTemp] = useState(false);

    useEffect(() => {
        if (location.state !== null) {
            setDetail(location.state.detail)
        } else {
            getBookById(pathId, setDetail)
        }
        if (departments.length > 0) {
            setDetailDepartments(departments)
        } else {
            getDepartments(setDetailDepartments)
        }
    }, [])

    useEffect(() => {
        if (detail.id === '') {
            setCount(!count)
        } else {
            increaseViewCount(detail.id)
            setDetail({...detail, view: detail.view + 1})
        }
    }, [count])

    const departmentName = (optionId) => {
        if (detailDepartments.length > 0) {
            let department = detailDepartments.filter(department => department.id === optionId)
            return department[0].name
        }
    }
    return (<div>
        <div className="bg-white bg-opacity-70 p-4 w-full md:w-3/4 m-auto rounded shadow-2xl">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 bg-white p-2 bg-opacity-80 rounded">
                    <img src={detail.book.thumbnail} alt={detail.book.title} className="w-52 m-auto"/>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <div className='flex justify-between'>
                        <div className="text-xl font-bold text-start">{detail.title}</div>
                        <div className="text-sm text-start">조회수: {detail.view}</div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div
                            className="text-sm text-gray-600 text-start">판매자: {detail.member.nickname}</div>
                        <div
                            className="text-sm text-gray-600 text-start">등록날짜: {timeSince(detail.date)}</div>
                    </div>
                    <hr className='bg-black h-[1px]'/>
                    <div className='py-4 px-1'>
                        <div className="text-xl text-blue-600 font-bold text-start">{detail.price}원</div>
                        <div className='text-sm text-gray-600 my-1 text-start'><span
                            className='font-bold'>책 제목:</span> {detail.book.title}
                        </div>
                        <div className='flex my-1'>
                            <div className='text-sm text-gray-600 text-start'><span
                                className='font-bold'>저자:</span> {detail.book.author}</div>
                            <div className='text-sm text-gray-600 text-start mx-9'><span
                                className='font-bold'>출판사:</span> {detail.book.publisher}</div>
                        </div>
                        <div className='text-sm text-gray-600 my-1 text-start'><span
                            className='font-bold'>ISBN:</span> {detail.book.code}</div>
                        <hr className='bg-black h-[1px]'/>
                        <div className='text-sm text-gray-600 my-1 text-start'><span
                            className='font-bold'>과목:</span>&lt;{departmentName(parseInt(detail.lecture.departmentId))}&gt; {detail.lecture.title}
                        </div>
                    </div>
                    {connectTemp ? <div className='bg-white w-full py-2 rounded'>연락처: {detail.connect}</div> :
                        <button className='bg-blue-600 text-white w-full py-2 rounded'
                                onClick={() => setConnectTemp(true)}>연락처 보기</button>}
                </div>
            </div>
            <div className='text-xl font-bold mt-6 text-center'>상세설명</div>
            <div className='bg-white bg-opacity-80 p-2 border-[1px] shadow-2xl rounded border-black'>
                {Parser(detail.content)}
            </div>
        </div>
    </div>);
};

export default DetailPage;
