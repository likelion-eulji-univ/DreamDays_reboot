import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUserInfo } from '../api'
import '../styles/CheckInfoPage.css'

const STORAGE_KEY = 'hf_draw_result'

function getSavedResult() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    const parsed = JSON.parse(saved)
    if (parsed.drawn && parsed.friend) {
      return parsed.friend
    }
  } catch {
    // ignore
  }
  return null
}

function CheckInfoPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [studentNumber, setStudentNumber] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [showDraw, setShowDraw] = useState(false)
  const [alreadyDrawnFriend, setAlreadyDrawnFriend] = useState(null)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!name.trim()) newErrors.name = '이름을 입력해주세요'
    if (!studentNumber.trim()) newErrors.studentNumber = '학번을 입력해주세요'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    try {
      const data = await checkUserInfo(name.trim(), studentNumber.trim())
      if (data) {
        setUserInfo(data)

        // 서버에서 isDraw=true이거나 로컬스토리지에 결과가 있으면 바로 결과 표시
        const savedFriend = getSavedResult()
        if (data.isDraw || savedFriend) {
          if (savedFriend) {
            setAlreadyDrawnFriend(savedFriend)
          }
          setShowDraw(true)
          return
        }

        setShowDraw(true)
      }
    } catch (error) {
      setErrors({ form: '등록된 정보를 찾을 수 없습니다. 이름과 학번을 다시 확인해주세요.' })
    }
  }

  const handleDrawFriend = () => {
    if (userInfo) {
      navigate(`/loading?name=${encodeURIComponent(userInfo.name)}&studentNumber=${encodeURIComponent(userInfo.studentNumber)}`)
    }
  }

  // 이미 뽑은 결과가 있으면 바로 결과 카드 표시
  if (alreadyDrawnFriend) {
    const { name: fName, age, instagramId, department, gender, mbti, bio } = alreadyDrawnFriend
    return (
      <div className="check">
        <header className="check__header">
          <button className="check__back" onClick={() => navigate('/')} aria-label="뒤로가기">
            ←
          </button>
          <h1 className="check__header-title">매칭 결과</h1>
        </header>

        <div className="check__content">
          <section className="check__hero">
            <div className="check__hero-emoji">✅</div>
            <h2 className="check__hero-title">이미 매칭이 완료되었어요</h2>
            <p className="check__hero-desc">이전에 뽑은 친구 정보입니다</p>
          </section>

          <div className="check__result-card">
            <div className="check__result-avatar">
              {gender === '남성' ? '🙋‍♂️' : '🙋‍♀️'}
            </div>
            <div className="check__result-name">{fName}</div>
            <div className="check__result-tags">
              <span className="check__result-tag">{department}</span>
              <span className="check__result-tag">{mbti}</span>
            </div>

            <div className="check__result-grid">
              <div className="check__result-item">
                <span className="check__result-label">나이</span>
                <span className="check__result-value">{age}살</span>
              </div>
              <div className="check__result-item">
                <span className="check__result-label">성별</span>
                <span className="check__result-value">{gender}</span>
              </div>
            </div>

            {bio && (
              <div className="check__result-bio">
                <span className="check__result-bio-label">한 줄 소개</span>
                <p className="check__result-bio-text">"{bio}"</p>
              </div>
            )}

            {instagramId && (
              <a
                href={`https://www.instagram.com/${instagramId}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="check__result-instagram"
              >
                📷 @{instagramId} 팔로우하기
              </a>
            )}
          </div>

          <button className="check__submit" onClick={() => navigate('/')}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
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
              <p className="check__hero-desc">등록할 때 사용한 이름과 학번을 입력해주세요</p>
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
                <label className="check__label">학번</label>
                <input
                  type="text"
                  className={`check__input ${errors.studentNumber || errors.form ? 'check__input--error' : ''}`}
                  value={studentNumber}
                  onChange={(e) => { setStudentNumber(e.target.value); setErrors({}) }}
                  placeholder="학번을 입력하세요"
                  inputMode="numeric"
                />
                {errors.studentNumber && <span className="check__error">{errors.studentNumber}</span>}
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
              <p className="check__hero-desc">이제 새로운 친구를 만나볼까요?</p>
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
                  <span className="check__draw-label">학번</span>
                  <span className="check__draw-value">{userInfo?.studentNumber}</span>
                </div>
              </div>
            </div>

            <button className="check__draw-button" onClick={handleDrawFriend}>
              🎲 친구 뽑기
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

export default CheckInfoPage
