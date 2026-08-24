import { useSearchParams, useNavigate } from 'react-router-dom'
import '../styles/ResultPage.css'

function ResultPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const name = searchParams.get('name') || ''
  const age = searchParams.get('age') || ''
  const instagramId = searchParams.get('instagramId') || ''
  const department = searchParams.get('department') || ''
  const gender = searchParams.get('gender') || ''
  const mbti = searchParams.get('mbti') || ''
  const bio = searchParams.get('bio') || ''

  return (
    <div className="result">
      <div className="result__content">
        <section className="result__hero">
          <div className="result__hero-emoji">🎉</div>
          <h1 className="result__hero-title">매칭 완료!</h1>
          <p className="result__hero-desc">새로운 친구를 소개합니다</p>
        </section>

        <div className="result__card">
          <div className="result__card-header">
            <div className="result__card-avatar">
              {gender === '남성' ? '🙋‍♂️' : '🙋‍♀️'}
            </div>
            <div className="result__card-name">{name}</div>
            <div className="result__card-tags">
              <span className="result__tag">{department}</span>
              <span className="result__tag">{mbti}</span>
            </div>
          </div>

          <div className="result__card-body">
            <div className="result__info-grid">
              <div className="result__info-item">
                <span className="result__info-label">나이</span>
                <span className="result__info-value">{age}살</span>
              </div>
              <div className="result__info-item">
                <span className="result__info-label">성별</span>
                <span className="result__info-value">{gender}</span>
              </div>
              <div className="result__info-item">
                <span className="result__info-label">MBTI</span>
                <span className="result__info-value">{mbti}</span>
              </div>
              <div className="result__info-item">
                <span className="result__info-label">학과</span>
                <span className="result__info-value">{department}</span>
              </div>
            </div>

            {bio && (
              <div className="result__bio">
                <span className="result__bio-label">한 줄 소개</span>
                <p className="result__bio-text">"{bio}"</p>
              </div>
            )}
          </div>

          <div className="result__card-footer">
            <a
              href={`https://www.instagram.com/${instagramId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="result__instagram"
            >
              📷 @{instagramId} 팔로우하기
            </a>
          </div>
        </div>

        <div className="result__actions">
          <button className="result__button-primary" onClick={() => navigate('/')}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
