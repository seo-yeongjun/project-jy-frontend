import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import './SelectBox.css'

const SelectBooks = ({books, setBook, setExistBook, setBookTitle}) => {



    const handleOptionClick = (option) => {
        setBook(option);
        setBookTitle('')
        setExistBook(true);
    };


    return ( <div className="slider">
                <Swiper
                    scrollbar={{draggable: true, dragSize: 24}}
                    spaceBetween={'auto'}
                    slidesPerView={'auto'}
                >
                    <SwiperSlide>
                        <div className='font-bold mt-3'>판매 하실 책을 선택해 주세요.</div>
                        <div className="posters">
                            {books.map(option => (
                                <div className="poster border border-2 p-1" key={option.isbn} onClick={() => handleOptionClick(option)}>
                                    <img className='max-w-sm'
                                         src={option.image}
                                         loading="lazy"
                                         alt={option.title}/>
                                        <div className='text-center'>{option.title}</div>
                                    <div className='mt-3'>
                                        <div className='text-start'>{option.author ? <span className='text-blue-500'>저자</span>:''} {option.author}</div>
                                        <div className='text-start'><span className='text-orange-500'>출판사 </span>{option.publisher}</div>
                                        <div className='text-start'><span className='text-yellow-500'>출간일 </span>{option.pubdate}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
    )
        ;
}

export default SelectBooks
