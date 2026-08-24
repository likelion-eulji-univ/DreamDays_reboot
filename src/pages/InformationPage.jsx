import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserInfo } from '../api'
import '../styles/InformationPage.css'

const DEPARTMENTS = [
  '첨단학부', '자연계열학부', '인문사회계열학부', '자유전공학부',
  '임상병리학과', '방사선학과', '안경광학과', '응급구조학과',
  '의료경영학과', '물리치료학과', '치위생학과', '간호학과', '의예과'
]

const MBTI_LIST = [
  'INTJ', 'INTP', 'INFJ', 'INFP', 'ISTJ', 'ISFJ', 'ISTP', 'ISFP',
  'ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ESTJ', 'ESFJ', 'ESTP', 'ESFP'
]

function InformationPage() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
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

  const [warnings, setWarnings] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (value) {
      setWarnings((prev) => ({ ...prev, [field]: false }))
    }
  }

  const validateForm = () => {
    const newWarnings = {}
    let isValid = true

    const requiredFields = ['name', 'studentNumber', 'instagramId', 'age', 'gender', 'department', 'mbti', 'bio', 'selectGender']
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newWarnings[field] = true
        isValid = false
      }
    })

    if (!formData.agree) {
      newWarnings.agree = true
      isValid = false
    }

    setWarnings(newWarnings)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setTimeout(() => {
        alert('모든 필드를 입력해야 합니다!')
      }, 100)
      return
    }

    const data = {
      name: formData.name,
      studentNumber: formData.studentNumber,
      instagramId: formData.instagramId,
      age: formData.age,
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
      if (error.response) {
        if (error.response.status === 400) {
          alert('형식이 올바르지 않습니다.')
        } else if (error.response.status === 500) {
          alert('이미 등록된 사용자입니다.')
        } else {
          alert('알 수 없는 오류가 발생했습니다.')
        }
      } else {
        alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.')
      }
    }
  }

  return (
    <main className="info-main">
      <section className="info-top">
        <div className="info-hf">
          <img src="/img/hf.svg" alt="hf" />
        </div>
        <div className="info-if-reg">
          <img src="/img/if_reg.svg" alt="if_reg" />
        </div>
      </section>

      {!showForm && (
        <section className="info-middle">
          <button className="info-if-bt" onClick={() => setShowForm(true)}>
            정보등록하기
          </button>
        </section>
      )}

      {showForm && (
        <>
          <section className="info-ip-form">
            <form onSubmit={handleSubmit} id="form">
              <div className="info-form-all-ct">
                {/* 이름 */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">이름</div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="이름을 입력하세요."
                    />
                    {warnings.name && <div className="info-waring">이름을 입력해주세요.</div>}
                  </div>
                </section>

                {/* 학번 */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">학번</div>
                    <input
                      type="text"
                      value={formData.studentNumber}
                      onChange={(e) => handleChange('studentNumber', e.target.value)}
                      minLength={10}
                      maxLength={10}
                      placeholder="학번을 입력하세요."
                    />
                    {warnings.studentNumber && <div className="info-waring">학번을 입력해주세요.</div>}
                  </div>
                </section>

                {/* 인스타 ID */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">인스타 ID</div>
                    <input
                      type="text"
                      value={formData.instagramId}
                      onChange={(e) => handleChange('instagramId', e.target.value)}
                      placeholder="인스타 ID를 입력하세요."
                    />
                    {warnings.instagramId && <div className="info-waring">인스타 ID를 입력해주세요.</div>}
                  </div>
                </section>

                {/* 나이 */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">나이</div>
                    <input
                      type="text"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      maxLength={2}
                      placeholder="나이를 입력하세요."
                    />
                    {warnings.age && <div className="info-waring">나이를 입력해주세요.</div>}
                  </div>
                </section>

                {/* 성별 */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">성별</div>
                    <div className="info-ip-ct">
                      <div className="info-radio-ct">
                        <input
                          type="radio"
                          name="gender"
                          checked={formData.gender === '남성'}
                          onChange={() => handleChange('gender', '남성')}
                        />
                        <div className="info-radio-label">남성</div>
                      </div>
                      <div className="info-radio-ct">
                        <input
                          type="radio"
                          name="gender"
                          checked={formData.gender === '여성'}
                          onChange={() => handleChange('gender', '여성')}
                        />
                        <div className="info-radio-label">여성</div>
                      </div>
                    </div>
                    {warnings.gender && <div className="info-waring">성별을 선택해주세요.</div>}
                  </div>
                </section>

                {/* 학과 */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">학과</div>
                    <select
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                    >
                      <option value="" hidden>학과를 선택해주세요</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {warnings.department && <div className="info-waring">학과를 선택해주세요.</div>}
                  </div>
                </section>

                {/* MBTI */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">MBTI</div>
                    <select
                      value={formData.mbti}
                      onChange={(e) => handleChange('mbti', e.target.value)}
                    >
                      <option value="" hidden>MBTI를 선택하세요</option>
                      {MBTI_LIST.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    {warnings.mbti && <div className="info-waring">MBTI를 선택해주세요.</div>}
                  </div>
                </section>

                {/* 한 줄 소개 */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">한 줄 소개</div>
                    <input
                      type="text"
                      value={formData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      maxLength={20}
                      placeholder="본인을 한마디로 소개한다면?"
                    />
                    {warnings.bio && <div className="info-waring">한 줄 소개를 작성해주세요.</div>}
                  </div>
                </section>

                {/* 소개 받고 싶은 성별 */}
                <section className="info-form-ct">
                  <div className="info-name-ct">
                    <div className="info-label">소개 받고 싶은 성별</div>
                    <div className="info-ip-ct">
                      <div className="info-radio-ct">
                        <input
                          type="radio"
                          name="selectGender"
                          checked={formData.selectGender === '남성'}
                          onChange={() => handleChange('selectGender', '남성')}
                        />
                        <div className="info-radio-label">남성</div>
                      </div>
                      <div className="info-radio-ct">
                        <input
                          type="radio"
                          name="selectGender"
                          checked={formData.selectGender === '여성'}
                          onChange={() => handleChange('selectGender', '여성')}
                        />
                        <div className="info-radio-label">여성</div>
                      </div>
                    </div>
                    {warnings.selectGender && <div className="info-waring">소개 받고 싶은 성별을 선택해주세요.</div>}
                  </div>
                </section>
              </div>

              <div className="info-pattern-line"></div>

              <section className="info-bottom-section">
                <div className="info-agree-all-ct">
                  <div className="info-agree-ct">
                    <div className="info-agree">개인정보 수집에 동의합니다</div>
                    <div className="info-add" onClick={() => setShowModal(true)}>[전문보기]</div>
                  </div>
                  <input
                    type="checkbox"
                    className="info-ip-agree"
                    checked={formData.agree}
                    onChange={(e) => handleChange('agree', e.target.checked)}
                  />
                </div>

                <div className="info-semi-if">
                  <ul>
                    <li>을지대학교 멋쟁이사자처럼 동아리에서 진행하는 드림데이즈 서비스입니다.</li>
                    <li>작성해주신 정보를 토대로 친구 매칭이 이루어지게 됩니다.</li>
                    <li>수신 여부에 동의하셔야 서비스를 이용하실 수 있습니다.</li>
                  </ul>
                </div>
              </section>

              <button className="info-sus" type="submit">등록 완료하기</button>
            </form>
          </section>

          {/* 모달 */}
          {showModal && (
            <div className="info-modal" onClick={() => setShowModal(false)}>
              <div className="info-modal-ct" onClick={(e) => e.stopPropagation()}>
                <span className="info-close" onClick={() => setShowModal(false)}>&times;</span>
                <div className="info-cont">개인정보 제공 및 수집 동의서</div>
                <br />
                <div>을지대학교 멋쟁이사자처럼 드림데이즈 HELLO FRIENDS 서비스 이용을 위한 개인정보 수집 및 이용 동의서입니다.
                  아래 내용을 확인한 후 동의 여부를 선택해 주세요.</div>
                <div className="info-pf-ct">
                  <div className="info-section-title">1. 개인정보 수집·이용 목적</div>
                  <div className="info-section-content">HELLO FRIENDS 서비스는 드림데이즈 행사 기간 동안 친구 찾기 서비스 제공 및 본인 확인을 위해 개인정보를 수집 및 이용합니다.</div>

                  <div className="info-section-title">2. 개인정보 수집항목</div>
                  <div className="info-section-content">필수 수집 항목: 이름, 나이, 성별, 학과, MBTI, 인스타그램 ID. 자동 수집 항목: 서비스 이용 기록(참여 이력, 추천된 친구 정보). ※ 수집된 정보는 서비스 운영 목적 외 다른 용도로 사용되지 않습니다.</div>

                  <div className="info-section-title">3. 개인정보의 보유 및 이용기간</div>
                  <div className="info-section-content">수집된 개인정보는 HELLO FRIENDS 서비스 제공 기간 동안 보관 및 이용되며, 드림데이즈 종료 후 2025년 03월 01일에 모든 데이터를 파기합니다. 서비스 이용 중 개인정보 삭제 요청 시 즉시 파기됩니다.</div>

                  <div className="info-section-title">4. 동의 거부 및 동의 거부시 불이익 내용</div>
                  <div className="info-section-content">HELLO FRIENDS 서비스는 사용자의 개인정보를 제3자에게 제공하지 않습니다.</div>

                  <div className="info-section-title">5. 동의 거부 및 불이익 안내</div>
                  <div className="info-section-content">사용자는 개인정보 제공에 동의하지 않을 권리가 있으며, 동의하지 않을 경우 HELLO FRIENDS 서비스 이용이 제한될 수 있습니다.</div>

                  <div className="info-section-title">6. 개인정보 보호 및 문의처</div>
                  <div className="info-section-content">개인정보 보호와 관련된 문의는 을지대학교 멋쟁이사자처럼 운영진에게 문의해 주세요. 문의: 인스타그램 @likelion_eulji</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default InformationPage
