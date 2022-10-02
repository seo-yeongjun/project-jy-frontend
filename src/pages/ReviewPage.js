import React, {useEffect} from 'react';
import SelectLectures from "../component/SelectLectures";
import useDebounce from "../hooks/useDebounce";
import {getAllLectureReviews, getLectureReviewsByLectureId, getLecturesByName} from "../api/info";

const ReviewPage = ({departments}) => {
    const [search, setSearch] = React.useState('');
    const [lectures, setLectures] = React.useState([]);
    const [lecture, setLecture] = React.useState([]);
    const [existLecture, setExistLecture] = React.useState(false);
    const [lectureReviews, setLectureReviews] = React.useState([]);

    const departmentName = (optionId) => {
        let department = departments.filter(department => department.id === optionId)
        return department[0].name
    }
    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    let searchValue = useDebounce(search, 500)
    useEffect(() => {
        if (searchValue.length > 0) {
            getLecturesByName(setLectures, searchValue)
        }
    }, [searchValue])
    useEffect(() => {
        if (search.length === 0) {
            setLectures([])
        }
    }, [search])
    useEffect(() => {
        if (existLecture) {
            getLectureReviewsByLectureId(setLectureReviews, lecture.id)
        }
    }, [existLecture,lecture]);
    useEffect(() => {
        getAllLectureReviews(setLectureReviews)
    },[])
    return (
        <div className='container m-auto'>
            <div className="border p-2 rounded bg-white mb-2 bg-opacity-70">
                <div className="mb-4">
                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        과목 검색
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title" type="text" placeholder="ex) 채플" value={search} onChange={handleChange}/>
                    {
                        (lectures.length > 0) ?
                            <SelectLectures lectures={lectures} setLecture={setLecture}
                                            setExistLecture={setExistLecture} departments={departments}
                                            setLectureTitle={setSearch}></SelectLectures>
                            : (searchValue !== '') ? <div className='text-center'>검색 결과가 없습니다.</div> : ''}
                </div>
                {existLecture ?
                    <div>
                        <span className='font-bold'>&lt;{departmentName(parseInt(lecture.departmentId))}&gt; {lecture.title}</span><span> 검색결과</span>
                    </div> : <div className="mb-4"></div>}
                { lectureReviews.length > 0 ?
                    lectureReviews.map(lectureReview => (
                        <div className="border p-2 rounded bg-white mb-2 bg-opacity-70" key={lectureReview.id}>
                            <span className='font-bold'>&lt;{departmentName(parseInt(lectureReview.lecture.departmentId))}&gt; {lectureReview.lecture.title}</span><span> 후기</span>
                            <div className="mb-2 text-start">
                                <span className="text-gray-700 text-sm font-bold mb-2">작성자 </span>
                                <span className="text-gray-700 text-sm mb-2">{lectureReview.member.nickname}</span>
                            </div>
                            <div className="mb-2 text-start">
                                <span className="text-gray-700 text-sm font-bold mb-2">작성일 </span>
                                <span className="text-gray-700 text-sm mb-2">{lectureReview.date.substring(0,lectureReview.date.indexOf('T'))}</span>
                            </div>
                            <div className="mb-2 text-start">
                                <span className="text-gray-700 text-sm font-bold mb-2">내용</span>
                              <p style={{whiteSpace:'pre-line'}} className="text-gray-700 text-sm mb-2">{lectureReview.content}</p>
                            </div>
                        </div>
                    )): (existLecture) ? <div className='text-center my-3'>😢앗! 아직 작성 된 후기가 없어요.😢</div> : ''
                }
            </div>
        </div>
    );
};

export default ReviewPage;
