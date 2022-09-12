import axios from 'axios'

const instance = axios.create({
    baseURL : "http://192.168.0.2:8088",
    params: {

    }

})

export default instance
