import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUserInfo } from '../api'
import '../styles/CheckInfoPage.css'

function CheckInfoPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [showDraw, setShowDraw] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!name.trim()) newErrors.name = '이름을 입력해주세요'
    if (!phoneNumber.trim()) newErrors.phoneNumber = '전화번호를 입력해주세요'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    try {
      const data = await checkUserInfo(name.trim(), phoneNumber.trim())
      console.log('[을램] check-info 응답:', JSON.stringify(data))
      if (data) {
        setUserInfo(data)
        setShowDraw(true)
      }
    } catch (error) {
      console.error('[을램] check-info 실패:', error)
      if (error.response && error.response.data) {
        const { errorCode, message } = error.response.data
        console.error(`[을램] errorCode: ${errorCode}, message: ${message}`)
        switch (errorCode) {
          case 'USER_NOT_FOUND':
            setErrors({ form: '등록된 정보를 찾을 수 없습니다. 이름과 전화번호를 다시 확인해주세요.' })
            break
          case 'ALREADY_DRAWN':
            // 이미 매칭된 사용자 — draw API가 멱등이므로 바로 결과 조회로 이동
            navigate(`/loading?name=${encodeURIComponent(name.trim())}&phoneNumber=${encodeURIComponent(phoneNumber.trim())}`)
            break
          default:
            setErrors({ form: message || '오류가 발생했습니다.' })
        }
      } else {
        setErrors({ form: '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.' })
      }
    }
  }

  const handleDrawFriend = () => {
    if (userInfo) {
      navigate(`/loading?name=${encodeURIComponent(userInfo.name)}&phoneNumber=${encodeURIComponent(userInfo.phoneNumber || phoneNumber)}`)
    }
  }

  return (
    <div className="check">
      <header className="check__header">
        <button className="check__back" onClick={() => navigate('/')} aria-label="뒤로가기">
          ←
        </button>
        <h1 className="check__header-title">등록 확인</h1>
      </header>

      <div className="check__content">
        {!showDraw ? (
          <>
            <section className="check__hero">
              <div className="check__hero-emoji">🔍</div>
              <h2 className="check__hero-title">등록 정보 확인</h2>
              <p className="check__hero-desc">등록할 때 사용한 이름과 전화번호를 입력해주세요</p>
            </section>

            <form className="check__form" onSubmit={handleSubmit} noValidate>
              <div className="check__field">
                <label className="check__label">이름</label>
                <input
                  type="text"
                  className={`check__input ${errors.name || errors.form ? 'check__input--error' : ''}`}
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors({}) }}
                  placeholder="이름을 입력하세요"
                />
                {errors.name && <span className="check__error">{errors.name}</span>}
              </div>

              <div className="check__field">
                <label className="check__label">전화번호</label>
                <input
                  type="text"
                  className={`check__input ${errors.phoneNumber || errors.form ? 'check__input--error' : ''}`}
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value); setErrors({}) }}
                  placeholder="- 없이 숫자만 입력하세요"
                  inputMode="numeric"
                  maxLength={11}
                />
                {errors.phoneNumber && <span className="check__error">{errors.phoneNumber}</span>}
              </div>

              {errors.form && <span className="check__error">{errors.form}</span>}

              <button type="submit" className="check__submit">확인하기</button>
            </form>
          </>
        ) : (
          <section className="check__draw">
            <section className="check__hero">
              <div className="check__hero-emoji">🎉</div>
              <h2 className="check__hero-title">등록이 확인되었어요!</h2>
              <p className="check__hero-desc">이제 매칭 결과를 확인해볼까요?</p>
            </section>

            <div className="check__draw-card">
              <div className="check__draw-badge">✓ 인증 완료</div>
              <div className="check__draw-title">내 등록 정보</div>
              <div className="check__draw-info">
                <div className="check__draw-row">
                  <span className="check__draw-label">이름</span>
                  <span className="check__draw-value">{userInfo?.name}</span>
                </div>
                <div className="check__draw-row">
                  <span className="check__draw-label">전화번호</span>
                  <span className="check__draw-value">{userInfo?.phoneNumber || phoneNumber}</span>
                </div>
              </div>
            </div>

            <button className="check__draw-button" onClick={handleDrawFriend}>
              🎲 매칭 결과 확인
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

export default CheckInfoPage
