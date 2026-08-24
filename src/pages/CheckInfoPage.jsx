import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUserInfo } from '../api'
import '../styles/CheckInfoPage.css'

function CheckInfoPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [studentNumber, setStudentNumber] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [showDrawPage, setShowDrawPage] = useState(false)
  const [warningName, setWarningName] = useState(false)
  const [warningNumber, setWarningNumber] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let hasError = false
    if (!name.trim()) {
      setWarningName(true)
      hasError = true
    } else {
      setWarningName(false)
    }
    if (!studentNumber.trim()) {
      setWarningNumber(true)
      hasError = true
    } else {
      setWarningNumber(false)
    }

    if (hasError) return

    try {
      const data = await checkUserInfo(name.trim(), studentNumber.trim())
      if (data) {
        setUserInfo(data)
        setShowDrawPage(true)
      }
    } catch (error) {
      setWarningName(true)
      setWarningNumber(true)
    }
  }

  const handleDrawFriend = () => {
    if (userInfo) {
      navigate(`/loading?name=${encodeURIComponent(userInfo.name)}&studentNumber=${encodeURIComponent(userInfo.studentNumber)}`)
    }
  }

  return (
    <div className="ci-main">
      <div className="orange">
        {!showDrawPage ? (
          <div className="checkPage">
            <img className="helloFriends" src="/img/helloFriends.svg" alt="helloFriends" />
            <img className="checkYourRegister" src="/img/checkYourRegister.svg" alt="checkYourRegister" />

            <form onSubmit={handleSubmit}>
              <div className="column">
                <label className="labelStyle" htmlFor="name">이름</label>
                <input
                  type="text"
                  className="inputStyle"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
                {warningName && <div className="warningName">이름을 작성해주세요.</div>}
              </div>

              <div className="column">
                <label className="labelStyle" htmlFor="studentNumber">학번</label>
                <input
                  type="number"
                  className="inputStyle"
                  id="studentNumber"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  placeholder="학번을 입력하세요"
                />
                {warningNumber && <div className="warningNumber">학번을 작성해주세요.</div>}
              </div>

              <button className="ci-button" type="submit">등록 확인하기</button>
            </form>
          </div>
        ) : (
          <div className="drawPage">
            <img className="helloFriends" src="/img/helloFriends.svg" alt="helloFriends" />
            <img className="viewYourRegister" src="/img/viewYourRegister.svg" alt="viewYourRegister" />
            <div className="info">
              <div className="tags">
                <div className="tag">이름 :</div>
                <div className="tag">학번 :</div>
              </div>
              <div className="responses">
                <div className="response">{userInfo?.name}</div>
                <div className="response">{userInfo?.studentNumber}</div>
              </div>
            </div>
            <button className="ci-button" onClick={handleDrawFriend}>친구 뽑기</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckInfoPage
