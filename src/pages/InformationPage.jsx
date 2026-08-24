import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserInfo } from '../api'
import '../styles/InformationPage.css'

const MBTI_LIST = [
  'INTJ', 'INTP', 'INFJ', 'INFP', 'ISTJ', 'ISFJ', 'ISTP', 'ISFP',
  'ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ESTJ', 'ESFJ', 'ESTP', 'ESFP'
]

function InformationPage() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
    instagramId: '',
    age: '',
    gender: '',
    department: '',
    mbti: '',
    bio: '',
    selectGender: '',
    agree: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요'
      isValid = false
    }
    if (!formData.studentNumber.trim() || formData.studentNumber.length !== 11) {
      newErrors.studentNumber = '전화번호 11자리를 정확히 입력해주세요'
      isValid = false
    }
    if (!formData.instagramId.trim()) {
      newErrors.instagramId = '인스타 ID를 입력해주세요'
      isValid = false
    }
    if (!formData.age.trim()) {
      newErrors.age = '나이를 입력해주세요'
      isValid = false
    }
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요'
      isValid = false
    }
    if (!formData.department.trim()) {
      newErrors.department = '학교를 입력해주세요'
      isValid = false
    }
    if (!formData.mbti) {
      newErrors.mbti = 'MBTI를 선택해주세요'
      isValid = false
    }
    if (!formData.bio.trim()) {
      newErrors.bio = '한 줄 소개를 작성해주세요'
      isValid = false
    }
    if (!formData.selectGender) {
      newErrors.selectGender = '소개받고 싶은 성별을 선택해주세요'
      isValid = false
    }
    if (!formData.agree) {
      newErrors.agree = '개인정보 수집에 동의해주세요'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const data = {
      name: formData.name,
      studentNumber: Number(formData.studentNumber),
      instagramId: formData.instagramId,
      age: Number(formData.age),
      gender: formData.gender,
      department: formData.department,
      mbti: formData.mbti,
      selectGender: formData.selectGender,
      bio: formData.bio,
    }

    try {
      await createUserInfo(data)
      alert('등록이 완료되었습니다!')
      navigate('/')
    } catch (error) {
      console.error('[을램] 등록 실패:', error)
      if (error.response && error.response.data) {
        const { errorCode, message } = error.response.data
        console.error(`[을램] errorCode: ${errorCode}, message: ${message}`)
        switch (errorCode) {
          case 'USER_ALREADY_EXISTS':
            alert('이미 등록된 사용자입니다.')
            break
          case 'INVALID_REQUEST':
            alert('입력값이 올바르지 않습니다. 다시 확인해주세요.')
            break
          default:
            alert(message || '알 수 없는 오류가 발생했습니다.')
        }
      } else {
        alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.')
      }
    }
  }

  return (
    <div className="register">
      <header className="register__header">
        <button className="register__back" onClick={() => navigate('/')} aria-label="뒤로가기">
          ←
        </button>
        <h1 className="register__header-title">프로필 등록</h1>
      </header>

      <div className="register__content">
        <section className="register__hero">
          <div className="register__hero-emoji">✍️</div>
          <h2 className="register__hero-title">나를 소개해주세요</h2>
          <p className="register__hero-desc">매칭될 친구에게 보여질 프로필이에요</p>
        </section>

        <form className="register__form" onSubmit={handleSubmit} noValidate>
          {/* 이름 */}
          <div className="register__field">
            <label className="register__label">
              이름 <span className="register__label-required">*</span>
            </label>
            <input
              type="text"
              className={`register__input ${errors.name ? 'register__input--error' : ''}`}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="이름을 입력하세요"
            />
            {errors.name && <span className="register__error">{errors.name}</span>}
          </div>

          {/* 전화번호 */}
          <div className="register__field">
            <label className="register__label">
              전화번호 <span className="register__label-required">*</span>
            </label>
            <input
              type="text"
              className={`register__input ${errors.studentNumber ? 'register__input--error' : ''}`}
              value={formData.studentNumber}
              onChange={(e) => handleChange('studentNumber', e.target.value)}
              maxLength={11}
              placeholder="- 없이 숫자만 입력하세요"
              inputMode="numeric"
            />
            {errors.studentNumber && <span className="register__error">{errors.studentNumber}</span>}
          </div>

          {/* 인스타 ID */}
          <div className="register__field">
            <label className="register__label">
              인스타그램 <span className="register__label-required">*</span>
            </label>
            <input
              type="text"
              className={`register__input ${errors.instagramId ? 'register__input--error' : ''}`}
              value={formData.instagramId}
              onChange={(e) => handleChange('instagramId', e.target.value)}
              placeholder="@없이 아이디만 입력하세요"
            />
            {errors.instagramId && <span className="register__error">{errors.instagramId}</span>}
          </div>

          {/* 나이 */}
          <div className="register__field">
            <label className="register__label">
              나이 <span className="register__label-required">*</span>
            </label>
            <input
              type="text"
              className={`register__input ${errors.age ? 'register__input--error' : ''}`}
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              maxLength={2}
              placeholder="나이를 입력하세요"
              inputMode="numeric"
            />
            {errors.age && <span className="register__error">{errors.age}</span>}
          </div>

          {/* 성별 */}
          <div className="register__field">
            <label className="register__label">
              성별 <span className="register__label-required">*</span>
            </label>
            <div className="register__radio-group">
              <div className="register__radio-item">
                <input
                  type="radio"
                  id="gender-male"
                  name="gender"
                  className="register__radio-input"
                  checked={formData.gender === '남성'}
                  onChange={() => handleChange('gender', '남성')}
                />
                <label htmlFor="gender-male" className="register__radio-label">남성</label>
              </div>
              <div className="register__radio-item">
                <input
                  type="radio"
                  id="gender-female"
                  name="gender"
                  className="register__radio-input"
                  checked={formData.gender === '여성'}
                  onChange={() => handleChange('gender', '여성')}
                />
                <label htmlFor="gender-female" className="register__radio-label">여성</label>
              </div>
            </div>
            {errors.gender && <span className="register__error">{errors.gender}</span>}
          </div>

          {/* 학교 */}
          <div className="register__field">
            <label className="register__label">
              학교 <span className="register__label-required">*</span>
            </label>
            <input
              type="text"
              className={`register__input ${errors.department ? 'register__input--error' : ''}`}
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              placeholder="학교명을 입력하세요"
            />
            {errors.department && <span className="register__error">{errors.department}</span>}
          </div>

          {/* MBTI */}
          <div className="register__field">
            <label className="register__label">
              MBTI <span className="register__label-required">*</span>
            </label>
            <select
              className={`register__select ${!formData.mbti ? 'register__select--placeholder' : ''} ${errors.mbti ? 'register__select--error' : ''}`}
              value={formData.mbti}
              onChange={(e) => handleChange('mbti', e.target.value)}
            >
              <option value="" hidden>MBTI를 선택하세요</option>
              {MBTI_LIST.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errors.mbti && <span className="register__error">{errors.mbti}</span>}
          </div>

          {/* 한 줄 소개 */}
          <div className="register__field">
            <label className="register__label">
              한 줄 소개 <span className="register__label-required">*</span>
            </label>
            <input
              type="text"
              className={`register__input ${errors.bio ? 'register__input--error' : ''}`}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              maxLength={20}
              placeholder="본인을 한마디로 소개한다면?"
            />
            {errors.bio && <span className="register__error">{errors.bio}</span>}
          </div>

          {/* 소개받고 싶은 성별 */}
          <div className="register__field">
            <label className="register__label">
              매칭 희망 성별 <span className="register__label-required">*</span>
            </label>
            <div className="register__radio-group">
              <div className="register__radio-item">
                <input
                  type="radio"
                  id="selectGender-male"
                  name="selectGender"
                  className="register__radio-input"
                  checked={formData.selectGender === '남성'}
                  onChange={() => handleChange('selectGender', '남성')}
                />
                <label htmlFor="selectGender-male" className="register__radio-label">남성</label>
              </div>
              <div className="register__radio-item">
                <input
                  type="radio"
                  id="selectGender-female"
                  name="selectGender"
                  className="register__radio-input"
                  checked={formData.selectGender === '여성'}
                  onChange={() => handleChange('selectGender', '여성')}
                />
                <label htmlFor="selectGender-female" className="register__radio-label">여성</label>
              </div>
            </div>
            {errors.selectGender && <span className="register__error">{errors.selectGender}</span>}
          </div>

          {/* Divider */}
          <div className="register__divider" />

          {/* 개인정보 동의 */}
          <div className="register__agreement">
            <div className="register__agreement-row">
              <div className="register__agreement-left">
                <div className="register__checkbox">
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) => handleChange('agree', e.target.checked)}
                    aria-label="개인정보 수집 및 이용 동의"
                  />
                  <div className="register__checkbox-visual" />
                </div>
                <span className="register__agreement-text">개인정보 수집 및 이용 동의</span>
              </div>
              <button
                type="button"
                className="register__agreement-link"
                onClick={() => setShowModal(true)}
              >
                전문 보기
              </button>
            </div>
            {errors.agree && <span className="register__error">{errors.agree}</span>}
          </div>

          {/* Submit */}
          <button type="submit" className="register__submit">
            등록 완료
          </button>
        </form>
      </div>

      {/* Privacy Modal */}
      {showModal && (
        <div className="register__modal-overlay" onClick={() => setShowModal(false)}>
          <div className="register__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="register__modal-title">개인정보 수집 및 이용 동의</h3>
            <div className="register__modal-body">
              <p>을지대학교 멋쟁이사자처럼에서 을램 이벤트를 위해 아래와 같이 개인정보를 수집합니다.</p>
              <ul>
                <li>수집 항목: 이름, 전화번호, 인스타그램 ID, 나이, 성별, 학교, MBTI, 한 줄 소개</li>
                <li>수집 목적: 친구 매칭 서비스 제공</li>
                <li>보유 기간: 이벤트 종료 후 즉시 파기</li>
              </ul>
              <p>위의 개인정보 수집에 동의하지 않으실 수 있으며, 동의하지 않을 경우 서비스 이용이 제한됩니다.</p>
            </div>
            <button
              type="button"
              className="register__modal-close"
              onClick={() => setShowModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InformationPage
