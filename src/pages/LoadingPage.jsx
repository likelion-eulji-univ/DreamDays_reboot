import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { drawFriend } from '../api'
import '../styles/LoadingPage.css'

function LoadingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const name = searchParams.get('name')
    const studentNumber = searchParams.get('studentNumber')

    if (!name || !studentNumber) {
      navigate('/')
      return
    }

    const timer = setTimeout(async () => {
      try {
        const data = await drawFriend(name, studentNumber)
        if (data && data.name) {
          const params = new URLSearchParams({
            name: data.name || '',
            age: data.age || '',
            instagramId: data.instagramId || '',
            department: data.department || '',
            gender: data.gender || '',
            mbti: data.mbti || '',
            bio: data.bio || '',
          })
          navigate(`/result?${params.toString()}`)
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error('뽑기 실패:', error)
        navigate('/')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [searchParams, navigate])

  return (
    <div className="loading">
      <div className="loading__content">
        <div className="loading__spinner">
          <div className="loading__spinner-ring" />
          <div className="loading__spinner-emoji">🎲</div>
        </div>
        <h2 className="loading__title">친구를 찾고 있어요</h2>
        <p className="loading__desc">잠시만 기다려주세요...</p>
        <div className="loading__dots">
          <span className="loading__dot" />
          <span className="loading__dot" />
          <span className="loading__dot" />
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
