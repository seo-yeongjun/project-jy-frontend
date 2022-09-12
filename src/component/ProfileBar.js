import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import './header.css';


const ProfileBar = ({member,isLogin})=>{
    return (
        <div>
            <div className='bar_wrapper'>
              <div className='bar'>  
              <div className='class_review'>
                <FontAwesomeIcon style={{fontSize:'20px'}} icon={faPencil} />
                <span style={{fontSize:'15px'}}>과목후기</span>
              </div>
                <div className='profile'>
                  {isLogin ? <span>
                        <span>프로필 이미지</span>
                            <span style={{fontSize:'12px'}}>   {member.nickname}
                                <span></span>
                            </span>
                    </span> : ''}
                    <span>판매내역</span>
                </div>
              </div>    
            </div>
        </div>
)
}
export default ProfileBar;