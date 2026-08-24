import { useSearchParams, useNavigate } from 'react-router-dom'
import '../styles/ResultPage.css'

const STORAGE_KEY = 'hf_draw_result'

function ResultPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // URL params 우선, 없으면 로컬스토리지에서 복원
  let friend = null

  const urlName = searchParams.get('name')
  if (urlName) {
    friend = {
      name: searchParams.get('name') || '',
      age: searchParams.get('age') || '',
      instagramId: searchParams.get('instagramId') || '',
      school: searchParams.get('school') || '',
      gender: searchParams.get('gender') || '',
      mbti: searchParams.get('mbti') || '',
      bio: searchParams.get('bio') || '',
    }
  } else {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.drawn && parsed.friend) {
          friend = parsed.friend
        }
      }
    } catch {
      // ignore
    }
  }

  // 데이터가 없으면 홈으로
  if (!friend) {
    return (
      <div className="result">
        <div className="result__content">
          <section className="result__hero">
            <div className="result__hero-emoji">🤔</div>
            <h1 className="result__hero-title">결과가 없어요</h1>
            <p className="result__hero-desc">먼저 친구 뽑기를 진행해주세요</p>
          </section>
          <div className="result__actions">
            <button className="result__button-primary" onClick={() => navigate('/')}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { name, age, instagramId, school, gender, mbti, bio } = friend

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
              <span className="result__tag">{school}</span>
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
                <span className="result__info-label">학교</span>
                <span className="result__info-value">{school}</span>
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
