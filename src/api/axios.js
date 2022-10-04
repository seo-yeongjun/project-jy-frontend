import axios from 'axios'

const url = "http://3.37.76.20:8000"

const instance = axios.create({
    baseURL : url,
    params: {
    }

})

export default instance
