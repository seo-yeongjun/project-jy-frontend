import React, {useEffect, useState} from 'react';
import word from "../commonWord/word";
import {join,existMemberId,existNickname,existEmail} from "../api/auth";

const JoinPage = () => {
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [memberId, setMemberId] = useState("")
    const [passwordInfo, setPasswordInfo] = useState([])
    const [passwordEqual, setPasswordEqual] = useState(true)
    const [memberIdChecker, setMemberIdChecker] = useState(false)
    const [nicknameChecker, setNicknameChecker] = useState(false)
    const [emailChecker, setEmailChecker] = useState(false)

    const memberIdHandler = (e) => {
        setMemberId(e.target.value)
    }
    const nicknameHandler = (e) => {
        setNickname(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const password2Handler = (e) => {
        setPassword2(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let message = []
        if (!memberIdChecker) {
            message = [...message, "아이디 중복체크를 해주세요."]
        }
        if (password !== password2) {
            message = [...message, "비밀번호가 일치하지 않습니다."]
        }
        if (!emailChecker) {
            message = [...message, "이메일 중복체크를 해주세요."]
        }
        if (!nicknameChecker) {
            message = [...message, "닉네임 중복체크를 해주세요."]
        }

        if (message.length > 0) {
            alert(message.join("\n"))
            return
        }

        const res =join(email, password, memberId, nickname)
        console.log(res)
    }


    const memberIdInput = React.createRef();
    const nicknameInput = React.createRef();
    const emailInput = React.createRef();


    //아이디 중복 확인
    const check = {
        memberIdCheck: (e) => {
            e.preventDefault()
            existMemberId(memberId,setMemberIdChecker,memberIdInput)
        },
        nicknameCheck: (e) => {
            e.preventDefault()
         existNickname(nickname,setNicknameChecker,nicknameInput)

        }, emailCheck:  (e) => {
            e.preventDefault()
            existEmail(email,setEmailChecker,emailInput)
        }
    }


    //비밀번호 체크
    useEffect(() => {
        let result = []
        if (password === "") {
            setPasswordInfo([]);
            return
        }
        if (password.length < 10 || password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) < 0) {
            if (password.length < 10) {
                result = [...result, (<span className="text-xs text-red-400 block">10자 이상 이어야 합니다.</span>)]
                setPasswordInfo(result)
            }
            if (password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) < 0) {
                result = [...result, (<span className="text-xs text-red-400 block">특수 문자가 포함되어야 합니다.</span>)]
                setPasswordInfo(result)
            }
        } else {
            setPasswordInfo([])
        }
    }, [password])

    //비밀번호 일치 확인
    useEffect(() => {
        if (password2 === "") {
            setPasswordEqual(true)
            return
        }
        if (password2 !== password) {
            setPasswordEqual(false)
        } else {
            setPasswordEqual(true)
        }
    }, [password, password2])

    return (

        <div
            className="m-auto border rounded  w-full sm:w-11/12 md:w-1/2 lg:w-1/3 py-4 px-2 border-amber-500 shadow-xl bg-white bg-opacity-90">
            <h1 className="text-3xl mb-3 font-bold">회원가입</h1>
            <h3 className="mb-9">{word.title}에 오신걸 환영합니다.</h3>
            <form>
                <div>
                    <label htmlFor="memberId"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">아이디
                    </label>
                    <div className="flex w-full">
                        <input type="text" id="memberId" ref={memberIdInput}
                               className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="아이디 입력" required="" value={memberId} onChange={memberIdHandler}/>
                        <button onClick={check.memberIdCheck}
                                className="w-1/5 border rounded ml-2 bg-blue-300 text-white text-sm hover:bg-blue-200">중복
                            확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">이메일
                    </label>
                    <div className="w-full flex">
                        <input type="text" id="email" ref={emailInput}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="이메일 입력" value={email} onChange={emailHandler} required=""/>
                        <button onClick={check.emailCheck}
                                className="w-1/5 border rounded ml-2 bg-blue-300 text-white text-sm hover:bg-blue-200">중복
                            확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="nickname"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">닉네임
                    </label>
                    <div className="w-full flex">
                        <input type="text" id="nickname" ref={nicknameInput}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="닉네임 입력" value={nickname} onChange={nicknameHandler} required=""/>
                        <button onClick={check.nicknameCheck}
                                className="w-1/5 border rounded ml-2 bg-blue-300 text-white text-sm hover:bg-blue-200">중복
                            확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">비밀번호
                    </label>
                    <input type="password" id="password"
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="비밀번호 입력" value={password} onChange={passwordHandler} required=""/>
                </div>
                <div className="my-3">{passwordInfo}</div>
                <div>
                    <label htmlFor="password2"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">비밀번호 재입력
                    </label>
                    <input type="password" id="password2"
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="비밀번호 재입력" value={password2} onChange={password2Handler} required=""/>
                </div>
                {passwordEqual ? null : <span className="text-xs text-red-400">입력하신 비밀번호와 다릅니다.</span>}
                <div className="flex items-start mb-6 mt-4">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value=""
                               className="w-4 h-4 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                               required=""/>
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">정보
                        처리 방침에 동의합니다. <button className="text-blue-600 hover:underline dark:text-blue-500">전문
                            보기</button>.</label>
                </div>
                <button type="submit" onSubmit={onSubmit} onClick={onSubmit}
                        className="text-white bg-amber-300 hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">회원가입
                </button>
            </form>
        </div>)
}

export default JoinPage
