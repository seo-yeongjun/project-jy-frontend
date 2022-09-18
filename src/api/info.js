import axios from "../api/axios";


export const getDepartments = async (setDepartments) => {
    await axios.get('/info/allDepartments').then((res) => {
        console.log(res.data)
        setDepartments(res.data)
    })
}

export const getDepartmentById = async (setFindDepartment, id) => {
    await axios.get(`/info/department/id/${id}`).then((res) => {
        setFindDepartment(res.data)
    })
}

export const getDepartmentsByName = async (setFindDepartments, name) => {
    await axios.get(`/info/department/name/${name}`).then((res) => {
        setFindDepartments(res.data)
    })
}

export const getBooksByName = async (setBooks, name) => {
    await axios.get(`/info/findBook`, {
        params: {
            query: name
        }
    }).then((res) => {
        if (res.data.items.length > 0) {
            setBooks(res.data.items)
        }
    })
}

export const getLecturesByName = async (setLectures, name) => {
    await axios.get(`/info/lecture/name/${name}`).then((res) => {
        if (res.data.length > 0) {
            setLectures(res.data)
        }
    })
}
