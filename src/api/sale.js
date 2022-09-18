import axios from "../api/axios";


export const postSale = async (sale,setIsPost) => {
    await axios.post('/sale/book', {
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
