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

  const handleComplete = () => {
    navigate('/')
  }

  return (
    <main className="result-main">
      <section className="result-top">
        <div className="result-hf">
          <img src="/img/hf.svg" alt="hf" />
        </div>
        <div className="result-if-reg">
          <img src="/img/random_friends.svg" alt="random_friends" />
        </div>
      </section>

      <section className="result-middle">
        <div className="result-ct">
          <section className="result-left-title">
            <div>이름:</div>
            <div>나이:</div>
            <div>학과:</div>
            <div>성별:</div>
            <div>인스타 ID:</div>
            <div>MBTI:</div>
            <div>한 줄 소개:</div>
          </section>

          <section className="result-right-title">
            <div>{name}</div>
            <div>{age}</div>
            <div>{department}</div>
            <div>{gender}</div>
            <a href={`https://www.instagram.com/${instagramId}/`} target="_blank" rel="noopener noreferrer">
              <div className="result-insta">{instagramId}</div>
            </a>
            <div>{mbti}</div>
            <div>{bio}</div>
          </section>
        </div>
      </section>

      <section className="result-bottom">
        <button className="result-mat-sus" onClick={handleComplete}>친구 매칭 완료!</button>
      </section>
    </main>
  )
}

export default ResultPage
