import React from 'react';
import './SelectBox.css'

const SelectLectures = ({lectures, setLecture, setExistLecture, setLectureTitle, departments}) => {


    const handleOptionClick = (option) => {
        setLecture(option);
        setLectureTitle('')
        setExistLecture(true);
    };
   const departmentName = (optionId) =>{
         let department = departments.filter(department => department.id === optionId)
         return department[0].name
   }

    return (<div className="">
            <div className='font-bold mt-3'>강의를 선택해 주세요.</div>
            <div className="">
                {lectures.map(option => (
                    <div className="poster my-2" onClick={() => handleOptionClick(option)} key={option.id}>
                        <input key={option.id} type='checkbox' id='lecture'/>
                        <label className='poster-animation' htmlFor='lecture'>&lt;{departmentName(parseInt(option.departmentId))}&gt;{option.title}</label>
                    </div>
                ))}
            </div>
        </div>
    )
        ;
}

export default SelectLectures
