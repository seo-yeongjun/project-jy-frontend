import './App.css';
import {Outlet, Route, Routes} from "react-router";
import Header from './component/Header';
import ProfileBar from './component/ProfileBar';
import Footer from './component/Footer'
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import React, {useEffect, useState} from "react";
import {getMemberInfo, logout} from "./api/auth";
import axios from "./api/axios";



const Layout = ({isLogin, logoutHandler,member}) => {
    return (<div>
         <Header isLogin={isLogin} logoutHandler={logoutHandler}/>
        <ProfileBar member={member} isLogin={isLogin}/>
         {/* <Header isLogin={isLogin} logoutHandler={logoutHandler}/> */}
        <div className='headerBg' style={{backgroundImage: 'url(/img/bg-books.jpg)'}}>
            <div className="pt-48 pb-24">
                <Outlet/>
            </div>
        </div>
        <Footer/>
    </div> )

}

function App() {
    const [member, setMember] = useState({nickname: '', email: '', memberId: ''});
    const [isLogin, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
    const [expireTime, setExpireTime] = useState(localStorage.getItem('tokenExpiresIn'))

    useEffect(() => { //로그인 처리
        if (accessToken == null || expireTime == null || Date.now() >= expireTime) {
            logout(setIsLogin, setMember, setAccessToken, setExpireTime)
            setIsLogin(false)
        } else if (accessToken) {
            setIsLogin(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            getMemberInfo(setMember, setIsLogin)
            setTimeout(logoutHandler, expireTime - Date.now());
        }
    }, [isLogin, accessToken, expireTime]);

    const logoutHandler = () => logout(setIsLogin, setMember, setAccessToken, setExpireTime);

    return (<div className="App">
        <Routes>
            <Route path="/" element={<Layout isLogin={isLogin} logoutHandler={logoutHandler} member={member}/>}>
                <Route index element={<MainPage isLogin={isLogin} member={member}/>}></Route>
                <Route path="login" element={<LoginPage setIsLogin={setIsLogin} setExpireTime={setExpireTime}
                                                        setAccessToken={setAccessToken}/>}></Route>
                <Route path="join" element={<JoinPage/>}></Route>
            </Route>
        </Routes>
    </div>);
}

export default App;
