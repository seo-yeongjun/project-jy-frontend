import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
//profile management page password change nickname change withdrawal page react, tailwindcss, firebase
const ProfilePage = ({member, isLogin}) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            navigate('/login', {state: {from: '/profile'}})
        }
    }, [isLogin, navigate])

    return (
        <div>
            <div
                className="flex flex-col items-center justify-center w-full md:w-4/5 mx-auto h-full bg-white bg-opacity-70 p-2">
                <div className='text-xl mb-3'>🗒️️ {member.nickname}님의 회대책방 기록 ✍️</div>
                <div className='grid grid-cols-2 w-full md:w-4/5 rounded bg-white bg-opacity-70 divide-black divide-x'>
                    <div className='col-span-1 flex flex-col'>
                        <span className='font-bold'>13권 📖</span>
                        책을 등록 했어요.
                    </div>
                    <div className='col-span-1 w-full flex flex-col'>
                        <span className='font-bold'>13회 👀</span>
                        조회수가 발생 했어요.
                    </div>
                </div>
            </div>
            <div
                className="flex flex-col items-center justify-center w-full md:w-4/5 mx-auto h-full bg-white bg-opacity-70 p-2 mt-4">
                <div className='text-xl mb-3'>📝️️ {member.nickname}님의 정보 📝️</div>
                <div
                    className='grid grid-cols-1 md:grid-cols-3 w-full md:w-4/5 rounded bg-white bg-opacity-70 p-2 flex items-center justify-items-start md:justify-items-center'>
                    <div className='col-span-1 mt-3 md:mt-0'>
                        <div className='inline md:block mr-2'>
                            <span className='font-bold'>이메일 </span>
                            {member.email}
                        </div>
                        <button
                            className="py-1 px-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">이메일
                            변경
                        </button>
                    </div>
                    <div className='col-span-1 mt-3 md:mt-0'>
                        <div className='inline md:block mr-2'>
                            <span className='font-bold'>닉네임 </span>
                            {member.nickname}
                        </div>
                        <button
                            className="py-1 px-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">닉네임
                            변경
                        </button>
                    </div>
                    <div className='col-span-1 mt-3 md:mt-0'>
                        <div className='inline md:block mr-2 font-bold'>판매내역</div>
                        <button
                            className="py-1 px-1 text-xs mr-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">바로가기
                        </button>
                    </div>
                </div>
                <div
                    className='w-full md:w-4/5 rounded bg-white bg-opacity-70 p-2 mt-2'>
                    <div className='flex justify-center items-center'>
                        <span className='mx-1 font-bold'>회원 탈퇴</span>
                    </div>
                    <div className='my-2 text-xs md:text-sm'>
                        회원 탈퇴를 하시면 모든 판매글이 삭제 되며 복구 할 수 없습니다.
                    </div>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white w-fit px-2 py-1 mx-1 font-bold rounded focus:outline-none focus:shadow-outline mt-1">회원
                        탈퇴
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ProfilePage;
