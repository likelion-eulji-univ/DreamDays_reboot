import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { drawFriend } from '../api'
import '../styles/LoadingPage.css'

const STORAGE_KEY = 'hf_draw_result'

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
        console.log('draw 응답:', JSON.stringify(data))

        // 서버 응답 구조에 따라 유연하게 파싱
        let friend = null
        if (data && data.name) {
          friend = data
        } else if (data && data.drawResult && data.drawResult.drawnUser) {
          friend = data.drawResult.drawnUser
        } else if (data && data.drawnUser) {
          friend = data.drawnUser
        } else if (data && data.result) {
          friend = data.result
        }

        if (friend && (friend.name || friend.instagramId)) {
          const friendData = {
            name: String(friend.name || ''),
            age: String(friend.age || ''),
            instagramId: String(friend.instagramId || ''),
            department: String(friend.department || ''),
            gender: String(friend.gender || ''),
            mbti: String(friend.mbti || ''),
            bio: String(friend.bio || ''),
          }

          // 로컬스토리지에 뽑기 결과 저장
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            drawn: true,
            myName: name,
            myStudentNumber: studentNumber,
            friend: friendData,
          }))

          const params = new URLSearchParams(friendData)
          navigate(`/result?${params.toString()}`)
        } else {
          console.error('뽑기 결과 파싱 실패. 응답 데이터:', data)
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
