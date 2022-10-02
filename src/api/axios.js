import axios from 'axios'

const url = "http://3.37.76.20:8087"

const instance = axios.create({
    baseURL : `http://localhost:8087`,
    params: {
    }

})

export default instance
