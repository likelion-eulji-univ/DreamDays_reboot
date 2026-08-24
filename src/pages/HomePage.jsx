import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const [animating, setAnimating] = useState('')

  const handleCheckClick = () => {
    setAnimating('check')
    setTimeout(() => {
      navigate('/check')
    }, 1000)
  }

  const handleRegisterClick = () => {
    setAnimating('register')
    setTimeout(() => {
      navigate('/register')
    }, 1000)
  }

  return (
    <div className="main">
      <div className={`orange ${animating === 'check' ? 'maxWidth' : ''} ${animating === 'register' ? 'minWidth' : ''}`}>
        <div className={`orangeDisplay ${animating ? 'none' : ''}`}>
          <div className="hello">
            <img src="/img/helloFriends.svg" alt="helloFriends" />
          </div>
          <section>
            <div className="preRe">
              <img src="/img/IPreRegistered.svg" alt="preRegister" />
            </div>
            <div className="titleV">
              <div>
                <img className="big" src="/img/preRegister.svg" alt="preRegister" />
              </div>
              <div>
                <img className="mark" src="/img/V.svg" alt="V" />
              </div>
            </div>
          </section>
          <section className="button">
            <div className="explainButton">
              <img src="/img/preRegisterClick.svg" alt="preRegisterClick" />
            </div>
            <button className="checkInfo" onClick={handleCheckClick}>
              <img src="/img/preRegisterButton.svg" alt="button" />
            </button>
          </section>
        </div>
      </div>
      <img className={`likelion ${animating ? 'none' : ''}`} src="/img/eu-logo.svg" alt="likelion" />
      <div className={`black ${animating === 'register' ? 'maxWidth' : ''} ${animating === 'check' ? 'minWidth' : ''}`}>
        <div className={`blackDisplay ${animating ? 'none' : ''}`}>
          <div className="hello right">
            <img src="/img/helloFriends.svg" alt="helloFriends" />
          </div>
          <section>
            <div className="preRe right">
              <img src="/img/INotRegister.svg" alt="preRegister" />
            </div>
            <div className="titleX right">
              <div className="mark right">
                <img className="mark right" src="/img/X.svg" alt="X" />
              </div>
              <div className="big right">
                <img className="big right" src="/img/register.svg" alt="preRegister" />
              </div>
            </div>
          </section>
          <section className="button right">
            <div className="explainButton">
              <img src="/img/registerClick.svg" alt="registerClick" />
            </div>
            <button className="registerInfo" onClick={handleRegisterClick}>
              <img src="/img/registerButton.svg" alt="button" />
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HomePage
