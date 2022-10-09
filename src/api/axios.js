import axios from 'axios'

const url = "https://skhubook.store"

const instance = axios.create({
    baseURL : url,
    params: {
    }

})

export default instance
