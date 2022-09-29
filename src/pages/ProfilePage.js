import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {getCountSale, getCountViews} from "../api/sale";
import {changeEmail, changeNickname, changePassword, deleteMember, getMemberInfo, logout} from "../api/auth";
const ProfilePage = ({member, isLogin, setMember, setIsLogin}) => {

        const navigate = useNavigate()
        const [nickname, setNickname] = React.useState('')
        const [originPassword, setOriginPassword] = React.useState('')
        const [password, setPassword] = React.useState('')
        const [passwordCheck, setPasswordCheck] = React.useState('')
        const [email, setEmail] = React.useState('')
        const [isNickname, setIsNickname] = React.useState(false)
        const [isPassword, setIsPassword] = React.useState(false)
        const [isEmail, setIsEmail] = React.useState(false)
        const [countViews, setCountViews] = React.useState(0)
        const [countSale, setCountSale] = React.useState(0)
        const [emailError, setEmailError] = React.useState('')
        const [passwordError, setPasswordError] = React.useState('')
        const [nicknameError, setNicknameError] = React.useState('')
        const [response, setResponse] = React.useState('')
        const [showModal, setShowModal] = React.useState(false)


        useEffect(() => {
            if (!isLogin) {
                navigate('/login', {state: {from: '/profile'}})
            }
        }, [isLogin, navigate])

        useEffect(() => {
            if (response !== '') {
                alert(response)
                getMemberInfo(setMember, setIsLogin)
                setResponse('')
                setPasswordError('')
                setEmailError('')
                setNicknameError('')
                if (response.includes("성공")) {
                    setNickname('')
                    setPassword('')
                    setPasswordCheck('')
                    setEmail('')
                    setOriginPassword('')
                }
            }
        }, [response])

        useEffect(() => {
            getCountViews(setCountViews, member.memberId)
            getCountSale(setCountSale, member.memberId)
        }, [member.memberId])

        const handleIs = (npe) => {
            if (npe === 'nickname') {
                setIsNickname(true)
                setIsPassword(false)
                setIsEmail(false)
            }
            if (npe === 'password') {
                setIsNickname(false)
                setIsPassword(true)
                setIsEmail(false)
            }
            if (npe === 'email') {
                setIsNickname(false)
                setIsPassword(false)
                setIsEmail(true)
            }
        }

        const handleNickname = (e) => {
            setNickname(e.target.value)
        }

        const handleOriginPassword = (e) => {
            setOriginPassword(e.target.value)
        }

        const handlePassword = (e) => {
            setPassword(e.target.value)
        }

        const handlePasswordCheck = (e) => {
            setPasswordCheck(e.target.value)
        }

        const handleEmail = (e) => {
            setEmail(e.target.value)
        }

        const handleNicknameSubmit = (e) => {
            e.preventDefault()
            if (nickname === '') {
                setNicknameError('닉네임을 입력해주세요.')
            } else {
                changeNickname(member.memberId, nickname, setResponse)
            }
        }

        const handlePasswordSubmit = (e) => {
            e.preventDefault()
            if (originPassword === '') {
                setPasswordError('기존 비밀번호를 입력해주세요.')
            } else if (password === '') {
                setPasswordError('새 비밀번호를 입력해주세요.')
            } else if (passwordCheck === '') {
                setPasswordError('새 비밀번호를 한번 더 입력해주세요.')
            } else if (password !== passwordCheck) {
                setPasswordError('비밀번호가 일치하지 않습니다.')
            } else {
                changePassword(member.memberId, originPassword, password, setResponse)
            }
        }

        const handleEmailSubmit = (e) => {
            e.preventDefault()
            if (email === '') {
                setEmailError('이메일을 입력해주세요.')
            } else {
                changeEmail(member.memberId, email, setResponse)
            }
        }

        const handleDelete = () => {
            setShowModal(false)
            deleteMember(member.memberId, originPassword, setResponse)
            if(response.includes("성공")){
                logout()
            }
        };
        return (
            <div>
                <div
                    className="flex flex-col items-center justify-center w-full md:w-4/5 mx-auto h-full bg-white bg-opacity-70 p-2 py-4">
                    <div className='text-xl mb-3'>🗒️️ {member.nickname}님의 회대책방 기록 ✍️</div>
                    <div className='grid grid-cols-2 w-full md:w-4/5 rounded bg-white bg-opacity-70 divide-black divide-x'>
                        <div className='col-span-1 flex flex-col'>
                            <span className='font-bold text-2xl'>{countSale}권 📖</span>
                            책을 등록 했어요.
                        </div>
                        <div className='col-span-1 w-full flex flex-col'>
                            <span className='font-bold text-2xl'>{countViews}회 👀</span>
                            조회수가 발생 했어요.
                        </div>
                    </div>
                    <div>
                        <div className='mt-3 mb-1'>
                            <button onClick={() => navigate('/sale/history')}
                                    className='ml-2 border bg-white bg-opacity-70 border-blue-500 border-[2px] hover:bg-blue-400 text-black font-bold py-1 px-3 rounded'>판매
                                내역 📦 바로가기
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col items-center justify-center w-full md:w-4/5 mx-auto h-full bg-white bg-opacity-70 p-2 mt-4 py-8">
                    <div className='text-xl mb-3'>👤️ {member.nickname}님의 회원정보 👤️️</div>
                    <div
                        className='grid grid-cols-1 md:grid-cols-3 w-full md:w-4/5 rounded bg-white bg-opacity-70 p-2 flex justify-items-start md:justify-items-center'>
                        <div className='col-span-1 mt-3 md:mt-0 w-full flex justify-between md:block'>
                            <div className='inline md:block mr-2'>
                                <span className='font-bold'>이메일 </span>
                                {member.email}
                            </div>
                            <button onClick={() => handleIs('email')}
                                    className="py-1 px-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">이메일
                                변경
                            </button>
                        </div>
                        <div className='col-span-1 mt-3 md:mt-0 w-full flex justify-between md:block'>
                            <div className='inline md:block mr-2'>
                                <span className='font-bold'>닉네임 </span>
                                {member.nickname}
                            </div>
                            <button onClick={() => handleIs('nickname')}
                                    className="py-1 px-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">닉네임
                                변경
                            </button>
                        </div>
                        <div className='col-span-1 mt-3 md:mt-0 w-full flex justify-between md:block'>
                            <div className='inline md:block mr-2 font-bold'>비밀번호 변경</div>
                            <button onClick={() => handleIs('password')}
                                    className="py-1 px-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">비밀번호
                                변경
                            </button>
                        </div>
                    </div>

                    {isEmail ?
                        <div className='w-full md:w-4/5 p-2 bg-white bg-opacity-70'>
                            <input className='w-2/3 p-1 border-[1.5px] border-gray-200 rounded' type="email"
                                   onChange={handleEmail} value={email} placeholder="변경할 이메일을 입력해주세요."/>
                            <button type="button" onClick={handleEmailSubmit}
                                    className="inline-block px-3 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-2">변경
                            </button>
                            {emailError && <div className='text-red-500'>{emailError}</div>}
                        </div> : ''}
                    {isNickname ?
                        <div className='w-full md:w-4/5 p-2 bg-white bg-opacity-70'>
                            <input className='w-2/3 p-1 border-[1.5px] border-gray-200 rounded' type="text"
                                   onChange={handleNickname} value={nickname} placeholder="변경할 닉네임을 입력해주세요."/>
                            <button type="button" onClick={handleNicknameSubmit}
                                    className="inline-block px-3 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-2">변경
                            </button>
                            {nicknameError && <div className='text-red-500'>{nicknameError}</div>}
                        </div> : ''}
                    {isPassword ?
                        <div className='w-full md:w-4/5 p-2 bg-white bg-opacity-70'>
                            <div>
                                <input className='w-2/3 p-1 mt-2 border-[1.5px] border-gray-200 rounded'
                                       onChange={handleOriginPassword} value={originPassword} type="password"
                                       placeholder="현재 비밀번호"/>
                                <input className='w-2/3 p-1 mt-2 border-[1.5px] border-gray-200 rounded' type="password"
                                       onChange={handlePassword} value={password} placeholder="새 비밀번호"/>
                                <input className='w-2/3 p-1 mt-2 border-[1.5px] border-gray-200 rounded' type="password"
                                       onChange={handlePasswordCheck} value={passwordCheck} placeholder="새 비밀번호 확인"/>
                            </div>
                            <button type="button" onClick={handlePasswordSubmit}
                                    className="inline-block px-3 py-2 mt-3 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-2">변경
                            </button>
                            {passwordError && <div className='text-red-500'>{passwordError}</div>}
                        </div> : ''}
                    <div
                        className='w-full md:w-4/5 rounded bg-white bg-opacity-70 p-2 mt-2'>
                        <div className='flex justify-center items-center'>
                            <span className='mx-1 font-bold'>회원 탈퇴</span>
                        </div>
                        <div className='my-2 text-xs md:text-sm'>
                            회원 탈퇴를 하시면 모든 판매글이 삭제 되며 복구 할 수 없습니다.
                        </div>
                        <button onClick={() => setShowModal(true)}
                                className="bg-red-500 hover:bg-red-700 text-white w-fit px-2 py-1 mx-1 font-bold rounded focus:outline-none focus:shadow-outline mt-1">회원
                            탈퇴
                        </button>
                    </div>
                </div>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div
                                    className="border-0 rounded-lg shadow-lg z-40 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div
                                        className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            회원 탈퇴 ✂️
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                    <span
                        className="bg-transparent text-black opacity-30 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative px-6 py-5 flex-auto">
                                        <div className="mt-4 text-slate-500 text-lg leading-relaxed">
                                            회원 탈퇴를 하시면, 등록 하신 모든 판매글이 삭제됩니다.<br/>
                                            그리고, 복구 할 수 없습니다.<br/>
                                        </div>
                                    </div>
                                    <span className='font-bold text-lg'>정말 탈퇴 하시겠습니까?</span>
                                    {/*footer*/}
                                    <div
                                        className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <input className='w-2/3 p-1 my-auto border-[1.5px] border-gray-200 rounded' onChange={handleOriginPassword} value={originPassword}
                                               type="password" placeholder="비밀번호 입력"/>
                                        <button
                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 ml-5 py-2 my-auto rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => handleDelete()}
                                        >
                                            탈퇴 하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-20 bg-black"
                                 onClick={() => setShowModal(false)}></div>
                        </div>
                    </>
                ) : null}
            </div>
        )
    }
;

export default ProfilePage;
