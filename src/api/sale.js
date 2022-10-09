import axios from "../api/axios";

//sale에는 memberId가 필요합니다.

export const postSale = async (sale, setIsPost, memberId) => {
    await axios.post(`/sale/book?memberId=${memberId}`, {
        book: sale.book,
        lecture: sale.lecture,
        saleBook: sale.saleBook,
        lectureReview: sale.lectureReview,
        memberId: sale.memberId,

    }).then((res) => {
        if (res.data) {
            setIsPost(true)
        } else {
            setIsPost(false)
        }
    })
}

//판매내역 가져오기
export const getSaleList = async (setSaleList, memberId) => {
    await axios.get(`/sale/history/${memberId}?memberId=${memberId}`).then((res) => {
        setSaleList(res.data)
    })
}

//판매내역 삭제
export const deleteSale = async (id, memberId, setDelete) => {
    await axios.post(`/sale/book/delete/${id}?memberId=${memberId}`).then((res) => {
        if (res.data === false)
            alert('삭제에 실패했습니다.')
        else
            window.location.reload()
    })
}

//get edit
export const getSale = async (id, memberId, setSale, setLoading) => {
    await axios.get(`/sale/book/edit/${id}?memberId=${memberId}`).then((res) => {
        if (res.data !== '') {
            setSale(res.data)
            setLoading(true)
        }
    })
}

//post edit
export const postSaleEdit = async (saleBook, setIsPost, memberId) => {
    await axios.post(`/sale/book/edit?memberId=${memberId}`,
        saleBook).then((res) => {
        if (res.data) {
            setIsPost(true)
        } else {
            setIsPost(false)
        }
    })
}

//판매 완료, 다시 판매
export const postSaleComplete = async (saleId, memberId, setSoldOutChange) => {
    await axios.post(`/sale/complete/${saleId}?memberId=${memberId}`).then((res) => {
        setSoldOutChange(res.data)
    })
}
//update date
export const postSaleUpdate = async (saleId, memberId, setUpdateChange) => {
    await axios.post(`/sale/book/update/${saleId}?memberId=${memberId}`).then((res) => {
        setUpdateChange(res.data)
    })
}

export const getCountSale = async (setCountSale, memberId) => {
    await axios.get(`/sale/book/count?memberId=${memberId}`).then((res) => {
        setCountSale(res.data)
    })
}

export const getCountViews = async (setCountViews, memberId) => {
    await axios.get(`/sale/book/view?memberId=${memberId}`).then((res) => {
        setCountViews(res.data)
    })
}
