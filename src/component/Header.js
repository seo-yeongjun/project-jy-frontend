import React from 'react';
import './header.css'
import { FaSearch } from 'react-icons/fa';
import {useNavigate} from "react-router";
const Header = () => {
    const navigate = useNavigate();
    return(
        <div className='header'>
            <button onClick={()=>navigate('/')}> logo </button>
            <div className='searchInput'>
                <input className='searchInput_input'/>
                <button className='searchInput-btn'> <FaSearch /></button>
            </div>

            <div className='userSection'>
                <div className='signInBtn'>
                    {/* <FaUser className='FaUser' /> */}
                    <span>로그인</span>
                </div>

                <div className='signUpBtn'>
                    {/* <FaSignInAlt className='FaSignInAlt' /> */}
                    <button className="hover:cursor-pointer" onClick={()=>navigate('/join')}>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default Header
