# hellofriend_BE API — 프론트엔드 입력 데이터 명세

베이스 URL: `https://ssok.cloud/api`
Swagger로 직접 테스트: `https://ssok.cloud/swagger-ui.html`

---

## 1. 회원 정보 등록

`POST /api/users/create-info`

Request Body (JSON):

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ✅ | 이름 |
| `studentNumber` | int | ✅ | 학번 (DB에서 유니크 값) |
| `instagramId` | string | ✅ | 인스타그램 아이디 |
| `age` | int | ✅ | 나이 |
| `gender` | string (enum) | ✅ | 본인 성별 — `남성` / `여성` |
| `department` | string (enum) | ✅ | 학과 — 아래 학과 목록 참고 |
| `mbti` | string (enum) | ✅ | MBTI — 16가지 중 하나 (예: `INFP`) |
| `selectGender` | string (enum) | ✅ | 뽑고 싶은 상대 성별 — `남성` / `여성` |
| `bio` | string | ❌ | 한줄소개 (선택) |

예시:

```json
{
  "name": "홍길동",
  "studentNumber": 20250001,
  "instagramId": "hong_gd",
  "age": 21,
  "gender": "남성",
  "department": "간호학과",
  "mbti": "INFP",
  "selectGender": "여성",
  "bio": "안녕하세요!"
}
```

응답: `200 OK` + `"정보 입력 완료"` (문자열)

---

## 2. 내 정보 조회 (뽑기 여부 확인)

`GET /api/users/check-info`

Query Parameter:

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ✅ | 이름 |
| `studentNumber` | int | ✅ | 학번 |

예시: `GET /api/users/check-info?name=홍길동&studentNumber=20250001`

응답:

```json
{
  "name": "홍길동",
  "studentNumber": 20250001,
  "isDraw": false
}
```

---

## 3. 랜덤 뽑기

`POST /api/draw`

Request Body (JSON):

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ✅ | 뽑기를 요청하는 사람 이름 |
| `studentNumber` | int | ✅ | 뽑기를 요청하는 사람 학번 |

예시:

```json
{
  "name": "홍길동",
  "studentNumber": 20250001
}
```

응답 (뽑힌 상대방 정보):

```json
{
  "name": "김철수",
  "age": 22,
  "instagramId": "chulsoo_k",
  "department": "물리치료학과",
  "gender": "남성",
  "mbti": "ESTJ",
  "bio": "잘 부탁드립니다"
}
```

---

## 4. 전체 유저 목록 (관리/디버그용)

`GET /api/users/all` — 입력 파라미터 없음. 등록된 전체 유저 목록 반환.

---

## Enum 값 목록

**Department (학과)** — 아래 문자열 그대로 전송해야 함 (오타/공백 불가):

```
첨단학부, 자연계열학부, 인문사회계열학부, 자유전공학부, 임상병리학과, 방사선학과,
안경광학과, 응급구조학과, 의료경영학과, 물리치료학과, 치위생학과, 간호학과, 의예과
```

**Gender (성별)**:

```
남성, 여성
```

**Mbti**:

```
INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP,
ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP
```

---

## 참고

- enum 필드(`gender`, `department`, `mbti`, `selectGender`)는 대소문자/철자가 정확히 일치해야 합니다. 다르게 보내면 400 에러가 납니다.
- 현재 인증/로그인 기능은 없습니다. `name` + `studentNumber` 조합으로 사용자를 식별합니다.
- CORS 허용 도메인은 백엔드 `CorsConfig.java`에 등록되어 있습니다 (`localhost:3000`, `eulji-hf.netlify.app`). 프론트 배포 주소가 다르면 백엔드에 등록 요청해주세요.
- 최신 스펙은 Swagger(`https://ssok.cloud/swagger-ui.html`)에서 실시간으로 확인 가능합니다.
