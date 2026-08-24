import axios from 'axios'

const BASE_URL = 'https://ssok.cloud'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 사용자 정보 등록
export async function createUserInfo(data) {
  const response = await api.post('/api/users/create-info', data)
  return response.data
}

// 등록 확인 (이름 + 학번)
export async function checkUserInfo(name, studentNumber) {
  const response = await api.get('/api/users/check-info', {
    params: { name, studentNumber },
  })
  return response.data
}

// 친구 뽑기
export async function drawFriend(name, studentNumber) {
  const response = await api.post('/api/draw', { name, studentNumber })
  return response.data
}
