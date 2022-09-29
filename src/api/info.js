import axios from "../api/axios";


export const getDepartments = async (setDepartments) => {
    await axios.get('/info/allDepartments').then((res) => {
        setDepartments(res.data)
    })
}

export const getBookById = async (id, setDetail) => {
    await axios.get(`/info/book/${id}`).then((res) => {
        console.log(res.data)
        setDetail(res.data)
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

export const getBookCount = async (setBookCount) => {
    await axios.get('/info/book/count').then((res) => {
        setBookCount(res.data)
    })
}

export const getLectureReviewsByLectureId = async (setLectureReviews, id) => {
    await axios.get(`/info/lectureReview/${id}`).then((res) => {
        setLectureReviews(res.data)
    })
}

//increasing view count
export const increaseViewCount = async (id) => {
    await axios.post(`/info/view/increase/${id}`)
}
