import React, {useState} from 'react';
import word from "../commonWord/word";
import {login} from "../api/auth";
import {useNavigate} from "react-router";

const LoginPage = ({setIsLogin, setExpireTime, setAccessToken}) => {
    const [memberId, setMemberId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const memberIdHandler = (e) => {
        setMemberId(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        login(memberId, password).then(() => {
            setIsLogin(true)
            setAccessToken(localStorage.getItem('accessToken'))
            setExpireTime(localStorage.getItem('tokenExpiresIn'))
            navigate(-1)
        }).catch(() => {
            console.log("로그인 실패")
        })
    }
    return (
        <div
            className="m-auto border rounded  w-11/12 sm: w-11/12 md:w-1/2 lg:w-1/3 p-6 border-amber-500 shadow-xl bg-white bg-opacity-90">
            <h1 className="text-3xl mb-3 font-bold">로그인</h1>
            <h3 className="mb-9">{word.title}에 오신걸 환영합니다.</h3>
            <form className="flex flex-col">
                <input onChange={memberIdHandler} className="border border-black rounded mb-2 p-1" type="text"
                       placeholder="아이디"/>
                <input onChange={passwordHandler} type="password" className="border border-black rounded mb-2 p-1"
                       placeholder="비밀번호"/>
                <button onClick={onSubmit}
                        className="mt-3 text-white bg-amber-300 hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">로그인
                </button>
                <p className="mt-4">회원이 아니신가요? <button className="text-blue-500">회원가입</button></p>
            </form>
        </div>
    )
}

export default LoginPage
