import React, {useEffect, useState, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import './header.css';
import {Link} from "react-router-dom";


const ProfileBar = ({member, isLogin, isVisible}) => {

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


    return (
        <div>
            <div className='bar_wrapper' ref={barWrapperRef}>
                <div className='bar'>
                    <div className='class_review'>
                        <FontAwesomeIcon style={{fontSize: '15px'}} icon={faPencil}/>
                        <Link to='review' style={{fontSize: '15px'}} className='ml-2'>과목후기</Link>
                    </div>
                    <div className='profile'>
                        <Link to='/sale/history' style={{fontSize: '15px'}}>판매내역</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileBar;
