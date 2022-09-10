import React from 'react';
import './header.css'
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from "react-router";

const Header = ({isLogin,logoutHandler}) => {
    const navigate = useNavigate();
    return (


        <div className="header">
            <div>
                <button onClick={() => navigate('/')}><img className="logo" src="/img/logo-width.svg"
                                                           alt="logo"/>
                </button>
            </div>
            <div className='searchInput'>
                <input className='searchInput_input'/>
                <button className='searchInput-btn'><FaSearch/></button>
            </div>

            <div>
                <div className='userSection'>
                    <div className='signInBtn'>
                        {/* <FaUser className='FaUser' /> */}
                        {!isLogin &&   <button className="hover:cursor-pointer" onClick={() => navigate('/login')}>로그인</button>}
                        {isLogin &&   <button className="hover:cursor-pointer" onClick={logoutHandler}>로그아웃</button>}
                    </div>

                    <div className='signUpBtn'>
                        {/* <FaSignInAlt className='FaSignInAlt' /> */}
                        <button className="hover:cursor-pointer" onClick={() => navigate('/join')}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header
