import axios from "../api/axios";


export const getDepartments = async (setDepartments) => {
    await axios.get('/info/allDepartments').then((res) => {
        setDepartments(res.data)
    })
}

export const getDepartmentById = async (setFindDepartment,id) => {
    await axios.get(`/info/department/id/${id}`).then((res) => {
        setFindDepartment(res.data)
    })
}

export const getDepartmentsByName = async (setFindDepartments,name) => {
    await axios.get(`/info/department/name/${name}`).then((res) => {
        setFindDepartments(res.data)
    })
}

