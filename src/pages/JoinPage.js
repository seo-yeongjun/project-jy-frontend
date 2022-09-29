import React, {useEffect, useState} from 'react';
import word from "../commonWord/word";
import {existEmail, existMemberId, existNickname, join} from "../api/auth";
import {useNavigate} from "react-router";

const JoinPage = () => {
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [memberId, setMemberId] = useState("")
    const [passwordInfo, setPasswordInfo] = useState([])
    const [passwordEqual, setPasswordEqual] = useState(true)
    const [memberIdChecker, setMemberIdChecker] = useState(false)
    const [nicknameChecker, setNicknameChecker] = useState(false)
    const [emailChecker, setEmailChecker] = useState(false)
    const [checkChecker, setCheckChecker] = useState(false)
    const [response, setResponse] = useState("")
    const [showModal, setShowModal] = React.useState(false)

    const navigate = useNavigate()

    const memberIdHandler = (e) => {
        setMemberId(e.target.value)
    }
    const nicknameHandler = (e) => {
        setNickname(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const password2Handler = (e) => {
        setPassword2(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let message = []
        if (!memberIdChecker) {
            message = [...message, "아이디 중복체크를 해주세요."]
        }
        if (password !== password2) {
            message = [...message, "비밀번호가 일치하지 않습니다."]
        }
        if (!emailChecker) {
            message = [...message, "이메일 중복체크를 해주세요."]
        }
        if (!nicknameChecker) {
            message = [...message, "닉네임 중복체크를 해주세요."]
        }
        if (passwordInfo.length !== 0) {
            message = [...message, "비밀번호를 확인해주세요."]
        }
        if (!checkChecker) {
            message = [...message, "약관에 동의해주세요."]
        }

        if (message.length > 0) {
            alert(message.join("\n"))
            return
        }

        join(email, password, memberId, nickname, setResponse)
    }

    useEffect(() => {
        if (response === "") {

        } else if (response === "success") {
            alert("회원가입이 완료되었습니다.")
            navigate("/login")
        } else {
            alert(response)
        }
    }, [response])


    const memberIdInput = React.createRef();
    const nicknameInput = React.createRef();
    const emailInput = React.createRef();


    //아이디 중복 확인
    const check = {
        memberIdCheck: (e) => {
            e.preventDefault()
            if (memberId.length < 4) {
                alert("아이디는 4자 이상 입력해주세요.")
                return
            }
            existMemberId(memberId, setMemberIdChecker, memberIdInput)
        },
        nicknameCheck: (e) => {
            e.preventDefault()
            if (nickname.length < 2) {
                alert("닉네임은 2글자 이상 입력해주세요.")
                return
            }
            existNickname(nickname, setNicknameChecker, nicknameInput)

        }, emailCheck: (e) => {
            e.preventDefault()
            if (!email.includes("@")) {
                alert("이메일 형식이 아닙니다.")
                return
            }
            existEmail(email, setEmailChecker, emailInput)
        }
    }


    //비밀번호 체크
    useEffect(() => {
        let result = []
        if (password === "") {
            setPasswordInfo([]);
            return
        }
        if (password.length < 10 || password.search(/[`~!@#$%^&*|₩'";:/?]/gi) < 0) {
            if (password.length < 10) {
                result = [...result, (<span className="text-xs text-red-400 block">10자 이상 이어야 합니다.</span>)]
                setPasswordInfo(result)
            }
            if (password.search(/[`~!@#$%^&*|₩'";:/?]/gi) < 0) {
                result = [...result, (<span className="text-xs text-red-400 block">특수 문자가 포함되어야 합니다.</span>)]
                setPasswordInfo(result)
            }
        } else {
            setPasswordInfo([])
        }
    }, [password])

    //비밀번호 일치 확인
    useEffect(() => {
        if (password2 === "") {
            setPasswordEqual(true)
            return
        }
        if (password2 !== password) {
            setPasswordEqual(false)
        } else {
            setPasswordEqual(true)
        }
    }, [password, password2])

    return (

        <div
            className="m-auto border rounded  w-full sm:w-11/12 md:w-1/2 lg:w-1/3 py-4 px-2 border-amber-500 shadow-xl bg-white bg-opacity-90">
            <h1 className="text-3xl mb-3 font-bold">회원가입</h1>
            <h3 className="mb-9">{word.title}에 오신걸 환영합니다.</h3>
            <form>
                <div>
                    <label htmlFor="memberId"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">아이디
                    </label>
                    <div className="flex w-full">
                        <input type="text" id="memberId" ref={memberIdInput} onKeyDown={e => {
                            if (e.key === 'Enter') check.memberIdCheck(e)
                        }}
                               className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="아이디 입력" required="" value={memberId} onChange={memberIdHandler}/>
                        <button onClick={check.memberIdCheck}
                                className="w-1/5 border rounded ml-2 bg-blue-300 text-white text-sm hover:bg-blue-200">중복
                            확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">이메일
                    </label>
                    <div className="w-full flex">
                        <input type="text" id="email" ref={emailInput} onKeyDown={e => {
                            if (e.key === 'Enter') check.emailCheck(e)
                        }}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="이메일 입력" value={email} onChange={emailHandler} required=""/>
                        <button
                            className="w-1/5 border rounded ml-2 bg-blue-300 text-white text-sm hover:bg-blue-200">중복
                            확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="nickname"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">닉네임
                    </label>
                    <div className="w-full flex">
                        <input type="text" id="nickname" ref={nicknameInput} onKeyDown={e => {
                            if (e.key === 'Enter') check.nicknameCheck(e)
                        }}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="닉네임 입력" value={nickname} onChange={nicknameHandler} required=""/>
                        <button onClick={check.nicknameCheck}
                                className="w-1/5 border rounded ml-2 bg-blue-300 text-white text-sm hover:bg-blue-200">중복
                            확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">비밀번호
                    </label>
                    <input type="password" id="password" onKeyDown={e => {
                        if (e.key === 'Enter') onSubmit(e)
                    }}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="비밀번호 입력" value={password} onChange={passwordHandler} required=""/>
                </div>
                <div className="my-3">{passwordInfo}</div>
                <div>
                    <label htmlFor="password2"
                           className="block mb-2 text-sm font-medium float-left text-gray-600">비밀번호 재입력
                    </label>
                    <input type="password" id="password2" onKeyDown={e => {
                        if (e.key === 'Enter') onSubmit(e)
                    }}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="비밀번호 재입력" value={password2} onChange={password2Handler} required=""/>
                </div>
                {passwordEqual ? null : <span className="text-xs text-red-400">입력하신 비밀번호와 다릅니다.</span>}
                <div className="flex items-start mb-6 mt-4">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="checkChecker"
                               onChange={() => setCheckChecker(!checkChecker)}
                               className="w-4 h-4 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                               required=""/>
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">정보
                        처리 방침에 동의합니다.</label>
                    <button className="text-blue-600 text-sm hover:underline dark:text-blue-500" onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true)
                    }}>전문 보기
                    </button>
                    .
                </div>
                <button type="submit" onSubmit={onSubmit} onClick={onSubmit}
                        className="text-white bg-amber-300 hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">회원가입
                </button>
            </form>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex fixed inset-0 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg z-40 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        정보 처리 방침
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span
                        className="bg-transparent text-black opacity-30 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 py-5 flex-auto">
                                    <div className="mt-4 text-slate-500 text-lg leading-relaxed overflow-y-scroll max-h-[40vh]">
                                        <p></p><p className="ls2 lh6 bs5 ts4"><em
                                        className="emphasis">&lt; 회대책방 &gt;('skhubooks.store'이하 '회대책방')</em>은(는)
                                        「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
                                        다음과 같이 개인정보 처리방침을 수립·공개합니다.</p><p className="ls2">○ 이 개인정보처리방침은 <em
                                        className="emphasis">2022</em>년 <em className="emphasis">10</em>월 <em
                                        className="emphasis">1</em>부터 적용됩니다.</p><br/><p className="lh6 bs4"><strong>제1조(개인정보의
                                        처리 목적)<br/><br/><em className="emphasis">&lt; 회대책방 &gt;('skhubooks.store'이하
                                            '회대책방')</em>은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                                        이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
                                        예정입니다.</strong></p>
                                        <ul className="list_indent2 mgt10"><p className="ls2">1. 홈페이지 회원가입 및 관리</p>
                                            <p className="ls2">회원 가입의사 확인, 각종 고지·통지 목적으로 개인정보를 처리합니다.</p><br/><p
                                                className="ls2">2. 재화 또는 서비스 제공</p><p className="ls2">서비스 제공을 목적으로
                                                개인정보를 처리합니다.</p><br/><p className="ls2">3. 마케팅 및 광고에의 활용</p><p
                                                className="ls2">이벤트 및 광고성 정보 제공 및 참여기회 제공 등을 목적으로 개인정보를 처리합니다.</p>
                                            <br/></ul>
                                        <br/><br/><p className="lh6 bs4"><strong>제2조(개인정보의 처리 및 보유
                                        기간)</strong><br/><br/>① <em className="emphasis">&lt; 회대책방 &gt;</em>은(는)
                                        법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
                                        처리·보유합니다.<br/><br/>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                                        <ul className="list_indent2 mgt10">
                                            <li className="tt">1.&lt;홈페이지 회원가입 및 관리&gt;</li>
                                            <li className="tt">&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
                                                동의일로부터&lt;3년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
                                            </li>
                                            <li>보유근거 : 개인정보보호법제15조 (정보주체의 동의)</li>
                                            <li>관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년</li>
                                            <li>예외사유 :</li>
                                        </ul>
                                        <br/><br/><p className="lh6 bs4"><strong>제3조(처리하는 개인정보의
                                        항목) </strong><br/><br/> ① <em className="emphasis">&lt; 회대책방 &gt;</em>은(는)
                                        다음의 개인정보 항목을 처리하고 있습니다.</p>
                                        <ul className="list_indent2 mgt10">
                                            <li className="tt">1&lt; 홈페이지 회원가입 및 관리 &gt;</li>
                                            <li>필수항목 : 이메일, 비밀번호, 로그인ID, 서비스 이용 기록, 접속 로그, 쿠키</li>
                                            <li>선택항목 :</li>
                                        </ul>
                                        <br/><br/><p className="lh6 bs4"><strong>제4조(개인정보의 파기절차 및 파기방법)<em
                                        className="emphasis"></em></strong></p><p className="ls2"><em
                                        className="emphasis"><br/>① &lt; 회대책방 &gt; 은(는) 개인정보 보유기간의 경과,
                                        처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br/><br/>②
                                        정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라
                                        개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를
                                        달리하여 보존합니다.<br/>1. 법령 근거 :<br/>2. 보존하는 개인정보 항목 : 계좌정보,
                                        거래날짜<br/><br/>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br/>1.
                                        파기절차<br/> &lt; 회대책방 &gt; 은(는) 파기 사유가 발생한 개인정보를
                                        선정하고, &lt; 회대책방 &gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를
                                        파기합니다.<br/></em></p><p className="sub_p mgt10">
                                        <em className="emphasis">2. 파기방법</em></p><p className="sub_p">
                                        <em className="emphasis">전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
                                            사용합니다.</em></p><em className="emphasis">종이에 출력된 개인정보는 분쇄기로
                                        분쇄하거나 소각을 통하여 파기합니다<p></p><br/><br/><p className="lh6 bs4">
                                            <strong>제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)</strong></p>
                                        <p className="ls2"><br/><br/>① 정보주체는 회대책방에 대해 언제든지 개인정보
                                            열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p><p
                                            className="sub_p">② 제1항에 따른 권리 행사는회대책방에 대해 「개인정보 보호법」
                                            시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며
                                            회대책방은(는) 이에 대해 지체 없이 조치하겠습니다.</p><p className="sub_p">③
                                            제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
                                            있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른
                                            위임장을 제출하셔야 합니다.</p><p className="sub_p">④ 개인정보 열람 및 처리정지
                                            요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수
                                            있습니다.</p><p className="sub_p">⑤ 개인정보의 정정 및 삭제 요구는 다른
                                            법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p>
                                        <p className="sub_p">⑥ 회대책방은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의
                                            요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
                                        <br/><br/><p className="lh6 bs4"><strong>제6조(개인정보의 안전성 확보조치에
                                            관한 사항)<em
                                                className="emphasis"><br/><br/>&lt; 회대책방 &gt;</em>은(는)
                                            개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</strong></p><p
                                            className="sub_p mgt10">1. 개인정보의 암호화<br/> 이용자의 개인정보는
                                            비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                                            데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고
                                            있습니다.<br/><br/>2. 접속기록의 보관 및 위변조 방지<br/> 개인정보처리시스템에 접속한 기록을
                                            최소 1년 이상 보관, 관리하고 있으며,다만, 5만명 이상의 정보주체에 관하여 개인정보를
                                            추가하거나, 고유식별정보 또는 민감정보를 처리하는 경우에는 2년이상 보관, 관리하고 있습니다.<br/>또한,
                                            접속기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고
                                            있습니다.<br/><br/></p><br/><br/><p className="lh6 bs4">
                                            <strong>제7조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한
                                                사항)</strong></p><p className="ls2"><br/><br/>회대책방 은(는)
                                            정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지
                                            않습니다.<br/><br/></p><p className="lh6 bs4"><strong>제8조(가명정보를
                                            처리하는 경우 가명정보 처리에 관한 사항)<em
                                                className="emphasis"><br/><br/>&lt; 회대책방 &gt; 은(는) 다음과
                                                같은 목적으로 가명정보를 처리하고 있습니다.</em></strong></p><p
                                            className="sub_p"></p><p className="sub_p"><strong><em
                                            className="emphasis">▶ 가명정보의 처리 목적</em></strong></p><p
                                            className="sub_p"><strong><em className="emphasis">-
                                            직접작성 가능합니다. </em></strong></p><p className="sub_p"></p>
                                        <p className="sub_p"><strong><em className="emphasis">▶
                                            가명정보의 처리 및 보유기간</em></strong></p><p
                                            className="sub_p"><strong><em className="emphasis">-
                                            직접작성 가능합니다. </em></strong></p><p
                                            className="sub_p"></p><p className="sub_p">
                                            <strong><em className="emphasis">▶ 가명정보의 제3자 제공에 관한
                                                사항(해당되는 경우에만 작성)</em></strong></p><p
                                            className="sub_p"><strong><em className="emphasis">-
                                            직접작성 가능합니다. </em></strong></p><p
                                            className="sub_p"></p><p className="sub_p">
                                            <strong><em className="emphasis">▶ 가명정보 처리의 위탁에 관한
                                                사항(해당되는 경우에만 작성)</em></strong></p><p
                                            className="sub_p"><strong><em className="emphasis">-
                                            직접작성 가능합니다. </em></strong></p><p
                                            className="sub_p"></p><p className="sub_p">
                                            <strong><em className="emphasis">▶ 가명처리하는 개인정보의
                                                항목</em></strong></p><p className="sub_p">
                                            <strong><em className="emphasis">- 직접작성 가능합니다. </em></strong>
                                        </p><p className="sub_p"></p><p className="sub_p">
                                            <strong><em className="emphasis">▶ 법 제28조의4(가명정보에 대한
                                                안전조치 의무 등)에 따른 가명정보의 안전성 확보조치에 관한
                                                사항</em></strong></p><p className="sub_p">
                                            <strong><em className="emphasis">- 직접작성 가능합니다. </em></strong>
                                        </p><p className="sub_p"></p><p className="sub_p"></p><p
                                            className="sub_p mgt30"><strong><em
                                            className="emphasis"><strong>제9조 (개인정보 보호책임자에 관한
                                            사항) </strong></em></strong></p><p
                                            className="sub_p mgt10"><strong><em
                                            className="emphasis"> ① <span
                                            className="colorLightBlue">회대책방</span> 은(는) 개인정보 처리에
                                            관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                                            위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</em></strong></p>
                                        <ul className="list_indent2 mgt10">
                                            <li className="tt"><strong><em className="emphasis">▶
                                                개인정보 보호책임자 </em></strong></li>
                                            <li><strong><em className="emphasis">성명
                                                :서영준</em></strong></li>
                                            <li><strong><em className="emphasis">직책
                                                :운영자</em></strong></li>
                                            <li><strong><em className="emphasis">직급
                                                :운영자</em></strong></li>
                                            <li><strong><em className="emphasis">연락처
                                                :01067356203,
                                                zanygeek8371@gmail.com, </em></strong></li>
                                        </ul>
                                        <p className="sub_p"><strong><em className="emphasis">※
                                            개인정보 보호 담당부서로 연결됩니다.</em></strong></p><p><strong><em
                                            className="emphasis"> </em></strong></p>
                                        <ul className="list_indent2 mgt10">
                                            <li className="tt"><strong><em className="emphasis">▶
                                                개인정보 보호 담당부서</em></strong></li>
                                            <li><strong><em className="emphasis">부서명
                                                :</em></strong></li>
                                            <li><strong><em className="emphasis">담당자
                                                :</em></strong></li>
                                            <li><strong><em className="emphasis">연락처 :, , </em></strong>
                                            </li>
                                        </ul>
                                        <p className="sub_p"><strong><em className="emphasis">②
                                            정보주체께서는 회대책방 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련
                                            문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수
                                            있습니다. 회대책방 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴
                                            것입니다.</em></strong></p><p className="sub_p mgt30">
                                            <strong><em className="emphasis"><strong>제10조(개인정보의
                                                열람청구를 접수·처리하는 부서)<br/> 정보주체는 ｢개인정보 보호법｣ 제35조에 따른
                                                개인정보의 열람 청구를 아래의 부서에 할 수
                                                있습니다.<br/>&lt; 회대책방 &gt;은(는) 정보주체의 개인정보 열람청구가
                                                신속하게 처리되도록 노력하겠습니다.
                                            </strong></em></strong></p>
                                        <ul className="list_indent2 mgt10">
                                            <li className="tt"><strong><em className="emphasis">▶
                                                개인정보 열람청구 접수·처리 부서 </em></strong></li>
                                            <li><strong><em className="emphasis">부서명
                                                : </em></strong></li>
                                            <li><strong><em className="emphasis">담당자
                                                : </em></strong></li>
                                            <li><strong><em className="emphasis">연락처 : , , </em></strong>
                                            </li>
                                        </ul>
                                        <strong><em className="emphasis"><br/><br/><p
                                            className="lh6 bs4"><strong>제11조(정보주체의 권익침해에 대한
                                            구제방법)<em className="emphasis"></em></strong></p><br/><br/>정보주체는
                                            개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원
                                            개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
                                            개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.<br/><br/>


                                            1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972
                                            (www.kopico.go.kr)<br/>

                                            2. 개인정보침해신고센터 : (국번없이) 118
                                            (privacy.kisa.or.kr)<br/>

                                            3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)<br/>

                                            4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)<br/><br/>


                                            「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제),
                                            제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한
                                            처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에
                                            따라 행정심판을 청구할 수 있습니다.<br/><br/>


                                            ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr)
                                            홈페이지를 참고하시기 바랍니다.<br/><br/><p className="lh6 bs4">
                                                <strong>제12조(개인정보 처리방침 변경)<em
                                                    className="emphasis"></em></strong></p><br/>
                                            <p></p><p className="sub_p">① 이 개인정보처리방침은 2022년
                                                10월 1부터 적용됩니다.</p><p></p>
                                        </em></strong></em></div>

                                </div>
                                {/*footer*/}
                                <div>

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-20 bg-black"
                             onClick={() => setShowModal(false)}></div>
                    </div>
                </>
            ) : null}
        </div>)
}

export default JoinPage
