# 프론트엔드 팀 전달사항

## 1. CORS 허용 도메인 변경 완료

배포된 프론트엔드 주소를 `https://eullaem.vercel.app`으로 등록했습니다. 이제 CORS 에러 없이 API 호출 가능합니다.

## 2. 에러 응답에 `errorCode` 추가 (중요 — 로직 반영 필요)

기존엔 에러가 나면 대부분 500으로만 내려가서 원인 구분이 불가능했습니다. 이제 모든 에러 응답에 상태코드 + `errorCode` + `message`가 함께 내려갑니다.

```json
{
  "timestamp": "2026-08-24T15:00:00",
  "status": 409,
  "errorCode": "ALREADY_DRAWN",
  "message": "이미 뽑기를 진행한 사용자입니다."
}
```

**주의**: 같은 `409` 상태코드를 여러 케이스가 공유하니, 분기 처리는 상태코드가 아니라 **`errorCode` 기준**으로 해주세요. `message`는 화면에 그대로 보여줘도 되는 문구지만, 나중에 문구가 바뀔 수 있어서 로직 분기용으로는 쓰지 마세요.

| API | errorCode | 상태코드 | 의미 | 발생 상황 |
|---|---|---|---|---|
| `POST /api/users/create-info` | `USER_ALREADY_EXISTS` | 409 | 이미 등록된 회원 | 같은 이름+학번으로 재등록 시도 |
| `GET /api/users/check-info` | `USER_NOT_FOUND` | 404 | 존재하지 않는 회원 | 등록 안 된 이름+학번 조회 |
| `GET /api/users/check-info` | `ALREADY_DRAWN` | 409 | 이미 뽑기 완료한 회원 | 뽑기를 이미 한 사람이 다시 조회 |
| `POST /api/draw` | `USER_NOT_FOUND` | 404 | 뽑기 요청자가 존재하지 않음 | 등록 안 된 이름+학번으로 뽑기 시도 |
| `POST /api/draw` | `ALREADY_DRAWN` | 409 | 이미 뽑기 완료한 회원 | 뽑기를 이미 한 사람이 다시 뽑기 시도 |
| `POST /api/draw` | `NO_MATCHING_USER` | 409 | 뽑을 수 있는 상대가 없음 | 원하는 성별의 등록자가 아직 없음 |
| 공통 | `INVALID_REQUEST` | 400 | 잘못된 요청 값 | enum 필드(성별/학과/mbti) 오타 등 |
| 공통 | `INTERNAL_ERROR` | 500 | 진짜 서버 오류 | 위 케이스에 해당 안 되는 예외 |

권장 처리 예시 (axios 기준):

```js
try {
  await axios.post('/api/draw', { name, studentNumber });
} catch (e) {
  const { errorCode, message } = e.response.data;
  switch (errorCode) {
    case 'USER_NOT_FOUND':
      // "정보를 먼저 등록해주세요" 안내
      break;
    case 'ALREADY_DRAWN':
      // "이미 뽑기를 완료했어요" 안내
      break;
    case 'NO_MATCHING_USER':
      // "아직 뽑을 수 있는 상대가 없어요" 안내
      break;
    default:
      alert(message); // 그 외는 서버 메시지 그대로 표시
  }
}
```

## 3. Toss 폰트 403 에러 — 프론트 쪽 이슈 (백엔드 무관)

```
GET https://static.toss.im/assets/homepage/tossface/font/TossProductSans-*.woff2 403 (Forbidden)
```

이건 백엔드와 관련 없는 프론트엔드 리소스 로딩 문제입니다. Toss 폰트 CDN이 외부 요청을 막고 있는 것으로 보이니, 폰트 파일을 직접 다운받아 자체 호스팅하거나 다른 폰트로 교체해야 합니다.

## 4. 참고

- API 입력 데이터 명세는 이전에 전달드린 문서 참고 (엔드포인트별 요청 필드, enum 값 목록)
- 최신 스펙은 Swagger에서 실시간 확인 가능: `https://ssok.cloud/swagger-ui.html`
