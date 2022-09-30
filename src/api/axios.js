import axios from 'axios'


const instance = axios.create({
    baseURL : `http://3.37.76.20:8087`,
    params: {
    }

})

export default instance
