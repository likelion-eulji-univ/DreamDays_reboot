let userInfo = null; // 전역 변수 선언 (사용자 정보 저장)

const warningNumber = document.querySelector(".warningNumber");
const warningName = document.querySelector(".warningName");

// 사용자 정보를 백엔드에서 가져오는 함수
// async function fetchUserInfo(name, studentNumber) {
//     try {
//         const response = await axios.get('https://likelion.hellofriend.cc/api/users/check-info', {
//             params: {
//                 name: name,
//                 studentNumber: studentNumber
//             },
//             withCredentials: true  // 필요 시 쿠키 포함
//         });

//         if (response.status === 200) {
//             return response.data;  // 서버에서 받은 사용자 정보 반환
//         } else {
//             alert("서버가 응답하지 않습니다.")
//             console.error("서버 응답 오류 ❌", response);
//             return null;
//         }
//     } catch (error) {
//         alert("사용하지 정보가 일치하지 않습니다. 다시 입력해주세요.")
//         console.error("백엔드 요청 실패 ❌", error);
//         return null;
//     }
// }

async function apiUserInfo(name, studentNumber) {
  try {
    const res = await axios.get(
      "http://hellofriend-eulji.site:8080/api/users/check-info",
      {
        params: {
          name: name,
          studentNumber: studentNumber,
        },
        withCredentials: true,
      },
    );
    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    } else {
      alert("e");
    }
  } catch (error) {
    alert("error");
  }
}

const checkButton = document.querySelector(".testt");

const drawPage = document.querySelector(".drawPage");
const checkPage = document.querySelector(".checkPage");

function inputValue() {
  const nameValue = document.getElementById("name").value;
  const studentNumberValue = document.getElementById("studentNumber").value;
  if (nameValue === "" || studentNumberValue === "") {
    if (nameValue === "" && studentNumberValue === "") {
      warningName.classList.add("warning");
      warningNumber.classList.add("warning");
    } else if (nameValue === "") {
      warningName.classList.add("warning");
    } else {
      warningNumber.classList.add("warning");
    }

    return false;
  } else {
    return true;
  }
}

function inputSense(e) {
  if (e.target.value) {
    console.log(e.target);
  }
}

// checkButton.addEventListener('click', putNone);

window.addEventListener("popstate", function (event) {
  window.location.href = "index.html";
});

// 폼 제출 이벤트 리스너
document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // 기본 폼 제출 방지

    // 입력값 가져오기
    const name = document.getElementById("name").value.trim();
    const studentNumber = document.getElementById("studentNumber").value.trim();

    // 입력값 검증 (필수 입력)
    let hasError = false;

    if (!name) {
      document.querySelector(".warningName").style.display = "block";
      hasError = true;
    } else {
      document.querySelector(".warningName").style.display = "none";
    }

    if (!studentNumber) {
      warningNumber.style.display = "block";
      hasError = true;
    } else {
      warningNumber.style.display = "none";
    }

    // 입력값이 하나라도 없으면 함수 종료
    if (hasError) return;

    // 백엔드에서 사용자 정보 가져오기
    userInfo = await apiUserInfo(name, studentNumber);

    if (userInfo) {
      // 사용자 정보가 있으면 화면에 표시
      document.getElementById("re_name").textContent =
        userInfo.name || "정보 없음";
      document.getElementById("re_studentNumber").textContent =
        userInfo.studentNumber || "정보 없음";

      // 입력 페이지 숨기고 결과 페이지 보이기
      document.querySelector(".checkPage").classList.add("none");
      document.querySelector(".drawPage").classList.remove("none");

      // 친구 뽑기 버튼을 클릭했을 때 URL 파라미터로 값을 넘기기
      document
        .getElementById("friendsButton")
        .addEventListener("click", function () {
          if (userInfo) {
            // URL 파라미터로 name과 studentNumber를 넘긴다
            const url = `loading.html?name=${encodeURIComponent(userInfo.name)}&studentNumber=${encodeURIComponent(userInfo.studentNumber)}`;
            window.location.href = url;
          } else {
            alert("사용자 정보를 찾을 수 없습니다 ❌");
          }
        });
    } else {
      document.querySelector(".warningName").textContent =
        "올바른 이름을 입력하세요.";
      document.querySelector(".warningName").style.display = "block";

      document.querySelector(".warningNumber").textContent =
        "올바른 학번을 입력하세요.";
      document.querySelector(".warningNumber").style.display = "block";
    }
  });
