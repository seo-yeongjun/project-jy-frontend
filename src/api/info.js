import axios from "../api/axios";


export const getDepartments = async () => {
    await axios.get('/info/allDepartments');
}
