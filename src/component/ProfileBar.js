import React, {useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import './header.css';


const ProfileBar = ({member,isLogin,isVisible})=>{

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
      window.addEventListener('resize', handleResize);
      if(windowSize >= 768){
        barWrapperRef.current.style.top = '5rem';
      } else {
        if(isVisible){
          barWrapperRef.current.style.display='flex';
          barWrapperRef.current.style.top = '7rem';
          }else{
            barWrapperRef.current.style.display='none';
          }
      }

  }, [windowSize,isVisible])

  const handleResize = () => {
      setWindowSize(window.innerWidth);
  }

  const barWrapperRef = useRef();



  return (
        <div>
            <div className='bar_wrapper' ref={barWrapperRef}>
              <div className='bar'>  
              <div className='class_review'>
                <FontAwesomeIcon style={{fontSize:'20px'}} icon={faPencil}/>
                <span style={{fontSize:'15px'}}>과목후기</span>
              </div>
                <div className='profile'>
                  {isLogin ? <span style={{display: 'flex', alignItems:'center'}} >
                        <span> 
                        <img className="userIcon" src="/img/pngwing.com.svg" alt="userIcon"/>
                        </span>
                            <span style={{fontSize:'12px'}}>  {member.nickname}
                                <span style={{marginRight: '5px'}}></span>
                            </span>
                    </span> : ''}
                    <span style={{marginLeft: '15px'}}>판매내역</span>
                </div>
              </div>    
            </div>
        </div>
)
}
export default ProfileBar;