import React from 'react';
import header from '../header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FaSearch } from 'react-icons/fa';
import { FaSignInAlt} from "react-icons/fa";
import { FaUser} from "react-icons/fa";
const Header = () => {
    return(
        <div className='header'>
            <span> logo </span>
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
                    <span>회원가입</span>
                </div>
            </div>
        </div>
    )
}

export default Header
