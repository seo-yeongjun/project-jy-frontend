import axios from 'axios'

const school = '10.0.140.136'
const home = '192.168.0.2'

const instance = axios.create({
    baseURL : `http://${home}:8088`,
    params: {
    }

})

export default instance
