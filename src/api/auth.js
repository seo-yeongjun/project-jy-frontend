import axios from "../api/axios";

export const login = async (memberId, password) => {
    await axios.post('/auth/login', {memberId: memberId, password: password}).then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('tokenExpiresIn', res.data.tokenExpiresIn);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
    })
}

//회원가입
export const join = async (email, password, memberId, nickname) => {
    await axios.post('/auth/join', {
        email: email, password: password, memberId: memberId, nickname: nickname
    }).then((res) => {
        //회원가입 성공
    }).catch((err) => {
        //회원가입 실패
    })
}
//아이디 존재 체크
export const existMemberId = async (memberId, setMemberIdChecker, memberIdInput) => {
    await axios.get('/auth/existMemberId', {params: {memberId: memberId}}).then((res) => {
        if (res.data) {
            alert("중복된 아이디입니다.")
            setMemberIdChecker(false)
        } else {
            alert("사용 가능한 아이디입니다.")
            setMemberIdChecker(true)
            memberIdInput.current.disabled = true
        }
    })
}
//닉네임 존재 체크
export const existNickname = async (nickname, setNicknameChecker, nicknameInput) => {
    await axios.get('/auth/existNickname', {params: {nickname: nickname}}).then((res) => {
        if (!res.data) {
            alert("사용 가능한 닉네임 입니다.")
            setNicknameChecker(true)
            nicknameInput.current.disabled = true
        } else {
            alert("이미 존재하는 닉네임 입니다.")
            setNicknameChecker(false)
        }
    })
}
//이메일 존재 체크
export const existEmail = async (email, setEmailChecker, emailInput) => {
    await axios.get('/auth/existEmail', {params: {email: email}}).then((exist) => {
        if (!exist.data) {
            alert("사용 가능한 이메일 입니다.")
            setEmailChecker(true)
            emailInput.current.disabled = true
        } else {
            alert("이미 존재하는 이메일 입니다.")
            setEmailChecker(false)
        }
    })
}
export const logout = (setIsLogin, setMember, setAccessToken, setExpireTime) => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("tokenExpiresIn")
    setExpireTime(null)
    setAccessToken(null)
    setIsLogin(false)
    setMember({memberId: '', nickname: '', email: ''})
}
export const getMemberInfo = async (setMember, setIsLogin) => {
    await axios.get('/member/info').then((member) => {
        setMember(member.data)
        setIsLogin(true)
    })
}

export const changePassword = async (memberId,exPassword, newPassword, setResponse) => {
    await axios.post(`/member/changePassword?memberId=${memberId}`, {exPassword: exPassword, newPassword: newPassword}).then((res) => {
        setResponse(res.data.message)
    })
}

export const changeNickname = async (memberId,nickname, setResponse) => {
    await axios.post(`/member/changeNickname?memberId=${memberId}`, {nickname: nickname}).then((res) => {
        setResponse(res.data.message)
    })
}

export const changeEmail = async (memberId,email, setResponse) => {
    await axios.post(`/member/changeEmail?memberId=${memberId}`, {email: email}).then((res) => {
        setResponse(res.data.message)
    })
}
