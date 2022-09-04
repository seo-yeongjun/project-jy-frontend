import React, {useEffect, useState} from 'react';
import word from "../commonWord/word";

const JoinPage = () => {
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [memberId, setMemberId] = useState("")
    const [passwordInfo, setPasswordInfo] = useState([])
    const [passwordEqual, setPasswordEqual] = useState(true)

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
    useEffect(() => {
        if (password2 !== password) {
            setPasswordEqual(false)
        } else {
            setPasswordEqual(true)
        }
    }, [password2])

    return (
        <div className="m-auto border rounded  w-4/5 sm: w-1/2 md:w-1/2 lg:w-1/3 p-6 border-amber-500 mt-10 shadow-xl">
            <h1 className="text-3xl mb-3 font-bold">회원가입</h1>
            <h3 className="mb-9">{word.title}에 오신걸 환영합니다.</h3>
            <form>
                <div>
                    <label htmlFor="memberId"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">아이디
                    </label>
                    <div className="flex w-full">
                        <input type="text" id="memberId"
                               className=" bg-amber-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-amber-50 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="아이디 입력" required="" value={memberId} onChange={memberIdHandler}/>
                        <button
                            className="w-1/5 border rounded ml-2 bg-blue-300 text-white text-sm hover:bg-blue-200">중복 확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">비밀번호
                    </label>
                    <input type="password" id="password"
                           className="bg-amber-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-amber-50 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="비밀번호 입력" value={password} onChange={passwordHandler} required=""/>
                </div>
                <div className="my-3">{passwordInfo}</div>
                <div>
                    <label htmlFor="password2"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">비밀번호 재입력
                    </label>
                    <input type="password" id="password2"
                           className="bg-amber-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-amber-50 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="비밀번호 재입력" value={password2} onChange={password2Handler} required=""/>
                </div>
                {passwordEqual ? null : <span className="text-xs text-red-400">입력하신 비밀번호와 다릅니다.</span>}
                <div>
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">이메일
                    </label>
                    <input type="text" id="email"
                           className="bg-amber-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-amber-50 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="이메일 입력" value={email} onChange={emailHandler} required=""/>
                </div>
                <div>
                    <label htmlFor="nickname"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">닉네임
                    </label>
                    <input type="text" id="nickname"
                           className="bg-amber-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-amber-50 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="닉네임 입력" value={nickname} onChange={nicknameHandler} required=""/>
                </div>
                <div className="flex items-start mb-6 mt-4">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value=""
                               className="w-4 h-4 bg-amber-100 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-amber-50 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                               required=""/>
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">정보
                        처리 방침에 동의합니다. <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">전문 보기</a>.</label>
                </div>
                <button type="submit"
                        className="text-white bg-amber-300 hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">회원가입
                </button>
            </form>

        </div>)
}

export default JoinPage
