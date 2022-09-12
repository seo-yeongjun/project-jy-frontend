import React from 'react';
import {getDepartments} from "../api/info";
const MainPage = ({isLogin,member}) => {
    const {data} = getDepartments();
    console.log(data);
    return(
        <div>
            {data}
        </div>
    )
}

export default MainPage
