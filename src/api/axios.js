import axios from 'axios'

const instance = axios.create({
    baseURL : "http://localhost:8088",
    params: {

    }

})

export default instance
