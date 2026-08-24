import { useNavigate } from 'react-router-dom'
import '../styles/HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home__container">
        <header className="home__brand">
          <div className="home__emoji" role="img" aria-label="wave">👋</div>
          <h1 className="home__title">을램</h1>
          <p className="home__subtitle">
            을지대 친구 매칭 서비스<br />
            새로운 인연을 만나보세요
          </p>
        </header>

        <div className="home__actions">
          <button
            className="home__card home__card--primary"
            onClick={() => navigate('/check')}
            aria-label="사전등록 확인 및 친구 뽑기"
          >
            <div className="home__card-icon">🎲</div>
            <div className="home__card-content">
              <div className="home__card-title">친구 뽑기</div>
              <div className="home__card-desc">이미 등록하셨나요? 매칭된 친구를 확인하세요</div>
            </div>
            <span className="home__card-arrow">→</span>
          </button>

          <button
            className="home__card home__card--secondary"
            onClick={() => navigate('/register')}
            aria-label="새로 등록하기"
          >
            <div className="home__card-icon">✍️</div>
            <div className="home__card-content">
              <div className="home__card-title">새로 등록하기</div>
              <div className="home__card-desc">처음이라면 프로필을 등록해주세요</div>
            </div>
            <span className="home__card-arrow">→</span>
          </button>
        </div>

        <footer className="home__footer">
          <img
            className="home__footer-logo"
            src="/img/eu-logo.svg"
            alt="을지대학교 멋쟁이사자처럼"
          />
          <span className="home__footer-text">을지대학교 멋쟁이사자처럼</span>
        </footer>
      </div>
    </div>
  )
}

export default HomePage
