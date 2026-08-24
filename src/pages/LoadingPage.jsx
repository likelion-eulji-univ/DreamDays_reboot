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
        if (data.drawResult && data.drawResult.drawnUser) {
          const drawnUser = data.drawResult.drawnUser
          const params = new URLSearchParams({
            name: drawnUser.name || '',
            age: drawnUser.age || '',
            instagramId: drawnUser.instagramId || '',
            department: drawnUser.department || '',
            gender: drawnUser.gender || '',
            mbti: drawnUser.mbti || '',
            bio: drawnUser.bio || '',
          })
          navigate(`/result?${params.toString()}`)
        } else {
          console.error('뽑기 결과 없음')
          navigate('/')
        }
      } catch (error) {
        console.error('뽑기 실패:', error)
        navigate('/')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [searchParams, navigate])

  return (
    <div className="loading-main">
      <div className="loading-black">
        <img className="loading-helloFriends" src="/img/helloFriends.svg" alt="helloFriends" />
        <img className="loading-loadingPage" src="/img/loadingPage.svg" alt="loadingPage" />
        <img className="loading-logoLion" src="/img/white_eu.svg" alt="whiteLikeLion" />
      </div>
    </div>
  )
}

export default LoadingPage
