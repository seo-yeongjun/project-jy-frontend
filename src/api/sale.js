import axios from "../api/axios";


export const postSale = async (sale,setIsPost,memberId) => {
    await axios.post(`/sale/book?memberId=${memberId}`, {
        book: sale.book,
        lecture: sale.lecture,
        saleBook: sale.saleBook,
        lectureReview: sale.lectureReview,
        memberId: sale.memberId,

    }).then((res) => {
        if(res.data){
            setIsPost(true)
        }else{
            setIsPost(false)
        }
        console.log(res.data)
    })
}

//판매내역 가져오기
export const getSaleList = async (setSaleList, memberId) => {
    await axios.get(`/sale/history/${memberId}?memberId=${memberId}`).then((res) => {
        setSaleList(res.data)
    })
}
