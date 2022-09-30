import axios from 'axios'


const instance = axios.create({
    baseURL : `https://:skhubook.store`,
    params: {
    }

})

export default instance
