import React from 'react';
import './Footer.css'
import {FaGithub} from 'react-icons/fa';
import {useNavigate} from "react-router";

const Footer = () => {
    const navigate = useNavigate();
    return (
        // Footer Component with logo and social media links
        <div className="footer">
            <div className="footer-logo hover:cursor-pointer" onClick={() => navigate('/')}>
                <img src="https://remembermedisk.s3.ap-northeast-2.amazonaws.com/skhubookStatic/img/logo-square.svg" alt="logo"/>
            </div>

            <div className="footer-text">
                <span className="footer-text-span">Designed and developed by </span>
            </div>
            <div className="footer-social">
                <a href='https://github.com/seo-yeongjun' target='_blank' rel='noopener noreferrer'
                   className="footer-social-media-icon"><FaGithub size="30px" color="#999"
                                                                  className="icon"/><span>seo-yeongjun</span></a>
                <a href='https://github.com/Jeongjaesang' target='_blank' rel='noopener noreferrer'
                   className="footer-social-media-icon"><FaGithub size="30px" color="#999"
                                                                  className="icon"/><span>jeong-jaesang</span></a>
            </div>
            <div className='footer-text mt-2'>
                <div className="footer-contact">
                    <span className="footer-text-span">Contact us: 010-6735-6203</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
