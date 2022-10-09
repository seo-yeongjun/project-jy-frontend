import './App.css';
import {Outlet, Route, Routes, useLocation} from "react-router";
import Header from './component/Header';
import ProfileBar from './component/ProfileBar';
import Footer from './component/Footer'
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import SalePage from "./pages/SalePage";
import React, {useEffect, useState} from "react";
import {getMemberInfo, logout} from "./api/auth";
import axios from "./api/axios";
import ScrollToTop from "./component/ScrollToTop";
import ReviewPage from "./pages/ReviewPage";
import {getDepartments} from "./api/info";
import HistoryPage from "./pages/HistoryPage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import EditPage from "./pages/EditPage";


const Layout = ({isLogin, logoutHandler, member}) => {
    const [isVisible, setIsVisible] = useState(false);
    const path = useLocation()
    return (<div>
        <Header isLogin={isLogin} logoutHandler={logoutHandler} setIsVisible={setIsVisible} isVisible={isVisible}
                member={member}/>
        <ProfileBar member={member} isLogin={isLogin} isVisible={isVisible} setIsVisible={setIsVisible}/>
        {/* <Header isLogin={isLogin} logoutHandler={logoutHandler}/> */}
        <div className='headerBg'
             style={{backgroundImage: 'url(https://remembermedisk.s3.ap-northeast-2.amazonaws.com/skhubookStatic/bg-books.jpg)'}}>
            <div className={path.pathname === '/' ? 'pt-32 pb-24' : 'pt-36 pb-24'}
                 style={window.innerWidth < 768 ? {paddingTop: '2rem'} : {}}>
                <Outlet/>
            </div>
        </div>
        <Footer/>
    </div>)

}

function App() {
    const [departments, setDepartments] = useState([])
    const [member, setMember] = useState({nickname: '', email: '', memberId: ''});
    const [isLogin, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
    const [expireTime, setExpireTime] = useState(localStorage.getItem('tokenExpiresIn'))
    const [loadDepartments, setLoadDepartments] = useState(false)
    const [loadMember, setLoadMember] = useState(false)

    useEffect(() => {
        getDepartments(setDepartments)
        setLoadDepartments(true)
    }, [])


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
        setLoadMember(true)
    }, [isLogin, accessToken, expireTime]);

    const logoutHandler = () => logout(setIsLogin, setMember, setAccessToken, setExpireTime);

    return (<div className="App">
        {loadDepartments && loadMember &&
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Layout isLogin={isLogin} logoutHandler={logoutHandler} member={member}/>}>
                        <Route index element={<MainPage isLogin={isLogin} member={member}
                                                        departments={departments}/>}></Route>
                        <Route path="login" element={<LoginPage setIsLogin={setIsLogin} setExpireTime={setExpireTime}
                                                                setAccessToken={setAccessToken}
                                                                isLogin={isLogin}/>}></Route>
                        <Route path="join" element={<JoinPage/>}></Route>
                        <Route path="sale"
                               element={<SalePage isLogin={isLogin} member={member}
                                                  departments={departments}/>}></Route>
                        <Route path="sale/history"
                               element={<HistoryPage isLogin={isLogin} member={member}></HistoryPage>}></Route>
                        <Route path="saleBook/update/:id" element={<EditPage member={member} departments={departments}
                                                                             isLogin={isLogin}/>}></Route>
                        <Route path="review" element={<ReviewPage departments={departments}/>}></Route>
                        <Route path="saleBook/:id" element={<DetailPage departments={departments}/>}></Route>
                        <Route path="profile"
                               element={<ProfilePage member={member} setMember={setMember} setIsLogin={setIsLogin}
                                                     isLogin={isLogin}/>}></Route>
                        <Route path="*" element={<NotFound/>}></Route>
                        <Route path="notFound" element={<NotFound/>}></Route>
                    </Route>
                </Routes>
            </ScrollToTop>}
    </div>);
}

export default App;
