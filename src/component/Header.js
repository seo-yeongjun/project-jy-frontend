import React, {memo, useEffect, useState} from 'react';
import './header.css';
import {FaSearch} from 'react-icons/fa';
import {useLocation, useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


const Header = memo(({isLogin, logoutHandler, setIsVisible, isVisible, member}) => {
    {
        const [windowSize, setWindowSize] = useState(window.innerWidth);
        const [searchValue, setSearchValue] = useState("");
        const navigate = useNavigate();

        const useQuery = () => {
            return new URLSearchParams(useLocation().search);
        }
        let value = useQuery().get('q');

        //value 값이 없으면 빈 문자열로 초기화
        useEffect(() => {
            if (!value) {
                setSearchValue("")
            }
        }, [value])

        const handleSearch = (e) => {
            setSearchValue(e.target.value)
        }

        const doSubmit = (e) => {
            e.preventDefault()
            navigate(`/?q=${searchValue}`)
        }

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
                                <img className="logo" src="https://remembermedisk.s3.ap-northeast-2.amazonaws.com/skhubookStatic/img/logo-width.svg" alt="logo"/>
                            </button>
                        </div>

                        <div className='mobile_userSection'>
                            {isLogin && <button onClick={() => navigate('/profile')} className='flex items-center mr-2'>
                                <img className="userIcon hover:cursor-pointer hover:text-white"
                                     src="/img/pngwing.com.svg" alt="userIcon"/>
                                <span className='text-sm'>  {member.nickname}님</span>
                            </button>}
                            <div className='signInBtn'>
                                {/* <FaUser className='FaUser' /> */}
                                {!isLogin && <button className="hover:cursor-pointer hover:text-white"
                                                     onClick={() => navigate('/login')}>로그인</button>}
                                {isLogin && <button className="hover:cursor-pointer hover:text-white"
                                                    onClick={logoutHandler}>로그아웃</button>}
                            </div>


                            <div className='signUpBtn'>
                                {/* <FaSignInAlt className='FaSignInAlt' /> */}
                                {!isLogin && <button className="hover:cursor-pointer hover:text-white"
                                                     onClick={() => navigate('/join')}>회원가입</button>}
                            </div>

                            <FontAwesomeIcon icon={faBars} onClick={onClickMenuBars}/>
                        </div>
                    </div>
                    <div className='mobile_lowerPart'>
                        <div className='mobile_searchInput'>
                            <form onSubmit={doSubmit}>
                                <input className='mobile_searchInput_input placeholder-gray-600'
                                       placeholder='과목 이름 또는 책 제목으로 찾기'
                                       onChange={handleSearch} value={searchValue}/>
                                <button type="submit" className='searchInput-btn'><FaSearch/></button>
                            </form>
                        </div>
                    </div>
                </header>
            )
        else
            return (
                <div>
                    <div className="header">
                        <div>
                            <button onClick={() => navigate('/')}><img className="logo" src="https://remembermedisk.s3.ap-northeast-2.amazonaws.com/skhubookStatic/img/logo-width.svg"
                                                                       alt="logo"/></button>
                        </div>
                        <div className='searchInput'>
                            <form onSubmit={doSubmit}>
                                <input className='searchInput_input placeholder-gray-600'
                                       placeholder='과목 이름 또는 책 제목으로 찾기'
                                       onChange={handleSearch} value={searchValue}/>
                                <button type="submit" className='searchInput-btn'><FaSearch/></button>
                            </form>
                        </div>
                        <div>
                            <div className='userSection'>
                                {isLogin &&
                                    <button onClick={() => navigate('/profile')}
                                            className='flex items-center hover:cursor-pointer mr-2 hover:text-white'>
                                        <img className="userIcon" src="/img/pngwing.com.svg" alt="userIcon"/>
                                        <span className='text-sm'>  {member.nickname}님</span>
                                    </button>}
                                <div className='signInBtn'>
                                    {/* <FaUser className='FaUser' /> */}
                                    {!isLogin && <button className="className='hover:cursor-pointer hover:text-white"
                                                         onClick={() => navigate('/login')}>로그인</button>}
                                    {isLogin &&
                                        <button className="className='hover:cursor-pointer hover:text-white"
                                                onClick={logoutHandler}>로그아웃</button>}
                                </div>

                                <div className='signUpBtn'>
                                    {/* <FaSignInAlt className='FaSignInAlt' /> */}
                                    {!isLogin && <button className="hover:cursor-pointer hover:text-white"
                                                         onClick={() => navigate('/join')}>회원가입</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
})

export default Header
