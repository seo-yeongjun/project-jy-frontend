import React from 'react';
import './Footer.css'
import {FaGithub} from 'react-icons/fa';

const Footer = () => {
    return (
        // Footer Component with logo and social media links
        <div className="footer">
            <div className="footer-logo">
                <img src="/img/logo-square.svg" alt="logo"/>
            </div>

            <div className="footer-text">
                <span className="footer-text-span">Designed and developed by </span>
            </div>
            <div className="footer-social">
                <span className="footer-social-media-icon"><FaGithub size="30px" color="#999" className="icon"/><span>seo-yeongjun</span></span>
                <span className="footer-social-media-icon"><FaGithub size="30px" color="#999" className="icon"/><span>jeong-jaesang</span></span>
            </div>
        </div>
    )
}

export default Footer
