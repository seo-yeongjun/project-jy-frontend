import React, {useEffect, useState} from 'react';
import './header.css';
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


const Header = ({isLogin, logoutHandler, setIsVisible, isVisible, member}) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [windowSize])

    const handleResize = () => {
        setWindowSize(window.innerWidth);
    }

    const onClickMenuBars = () => {
        setIsVisible(!isVisible)
    }
    if ((windowSize < 768))
        return (
            <header className='mobile_header'>
                <div className='mobile_upperPart'>
                    <div onClick={() => navigate('/')}>
                        <button>
                            <img className="logo" src="/img/logo-width.svg" alt="logo"/>
                        </button>
                    </div>

                    <div className='mobile_userSection'>
                        <div className='signInBtn'>
                            {/* <FaUser className='FaUser' /> */}
                            {!isLogin && <button className="hover:cursor-pointer"
                                                 onClick={() => navigate('/login')}>로그인</button>}
                            {isLogin && <button className="hover:cursor-pointer" onClick={logoutHandler}>로그아웃</button>}
                        </div>


                        <div className='signUpBtn'>
                            {/* <FaSignInAlt className='FaSignInAlt' /> */}
                            {!isLogin && <button className="hover:cursor-pointer"
                                                 onClick={() => navigate('/join')}>회원가입</button>}
                            {isLogin ?? <div>zzz</div>}
                        </div>

                        <a><FontAwesomeIcon style={{fontSize: '20px'}} icon={faBars} onClick={onClickMenuBars}/></a>
                    </div>
                </div>
                <div className='mobile_lowerPart'>
                    <div className='mobile_searchInput'>
                        <input className='mobile_searchInput_input'/>
                        <button className='mobile_searchInput-btn'><FaSearch/></button>
                    </div>
                </div>
            </header>
        )
    else
        return (
            <div>
                <div className="header">
                    <div>
                        <button onClick={() => navigate('/')}><img className="logo" src="/img/logo-width.svg"
                                                                   alt="logo"/></button>
                    </div>
                    <div className='searchInput'>
                        <input className='searchInput_input'/>
                        <button className='searchInput-btn'><FaSearch/></button>
                    </div>
                    <div>
                        <div className='userSection'>
                            <div className='signInBtn'>
                                {/* <FaUser className='FaUser' /> */}
                                {!isLogin && <button className="hover:cursor-pointer"
                                                     onClick={() => navigate('/login')}>로그인</button>}
                                {isLogin &&
                                    <button className="hover:cursor-pointer" onClick={logoutHandler}>로그아웃</button>}
                            </div>

                            <div className='signUpBtn'>
                                {/* <FaSignInAlt className='FaSignInAlt' /> */}
                                {!isLogin && <button className="hover:cursor-pointer"
                                                     onClick={() => navigate('/join')}>회원가입</button>}
                                {isLogin && <span className='flex items-center' style={{fontFamily:'Sunflower, sans-serif'}}>
                                                <img className="userIcon" src="/img/pngwing.com.svg" alt="userIcon"/>
                                             <span className='text-sm'>  {member.nickname}님</span>
                                </span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Header
