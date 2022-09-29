import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import './header.css';
import {useNavigate} from "react-router";


const ProfileBar = ({isLogin, isVisible, setIsVisible}) => {

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        if (windowSize >= 768) {
            barWrapperRef.current.style.top = '5rem';
            barWrapperRef.current.style.display = 'flex';
        } else {
            if (isVisible) {
                barWrapperRef.current.style.display = 'flex';
                barWrapperRef.current.style.top = '7rem';
            } else {
                barWrapperRef.current.style.display = 'none';
            }
        }

    }, [windowSize, isVisible])

    const handleResize = () => {
        setWindowSize(window.innerWidth);
    }

    const barWrapperRef = useRef();


    const navigate = useNavigate()

    return (
        <div>
            <div className='bar_wrapper' ref={barWrapperRef}>
                <div className='bar mb-1'>
                    <div className='class_review'>
                        <FontAwesomeIcon style={{fontSize: '15px'}} icon={faPencil}/>
                        <span onClick={() => {
                            navigate('/review')
                            setIsVisible(false)
                        }} style={{fontSize: '15px'}} className='ml-2'>과목후기</span>
                    </div>
                    <div className='profile'>
                        {isLogin ? <span onClick={() => {
                            navigate('/sale/history')
                            setIsVisible(false)
                        }}
                                         className='hover:cursor-pointer hover:text-white'
                                         style={{fontSize: '15px'}}>판매내역</span> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileBar;
