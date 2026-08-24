import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { drawFriend } from '../api'
import '../styles/LoadingPage.css'

function LoadingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const name = searchParams.get('name')
    const phoneNumber = searchParams.get('phoneNumber')

    if (!name || !phoneNumber) {
      navigate('/')
      return
    }

    const timer = setTimeout(async () => {
      try {
        const data = await drawFriend(name, phoneNumber)
        console.log('[을램] draw 응답:', JSON.stringify(data))

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
          const params = new URLSearchParams({
            name: String(friend.name || ''),
            age: String(friend.age || ''),
            instagramId: String(friend.instagramId || ''),
            school: String(friend.school || ''),
            gender: String(friend.gender || ''),
            mbti: String(friend.mbti || ''),
            bio: String(friend.bio || ''),
          })
          navigate(`/result?${params.toString()}`)
        } else {
          console.error('[을램] 뽑기 결과 파싱 실패. 응답 데이터:', data)
          navigate('/')
        }
      } catch (error) {
        console.error('[을램] 뽑기 실패:', error)
        if (error.response && error.response.data) {
          const { errorCode, message } = error.response.data
          console.error(`[을램] errorCode: ${errorCode}, message: ${message}`)
          switch (errorCode) {
            case 'USER_NOT_FOUND':
              alert('정보를 먼저 등록해주세요.')
              break
            case 'NO_MATCHING_USER':
              alert('아직 뽑을 수 있는 상대가 없어요. 나중에 다시 시도해주세요.')
              break
            default:
              alert(message || '오류가 발생했습니다.')
          }
        } else {
          alert('서버에 연결할 수 없습니다.')
        }
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
        <h2 className="loading__title">매칭 결과를 불러오고 있어요</h2>
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
