// setTimeout(() => {
//     window.location.href = "file:///C:/Users/sieun/Desktop/dd/dreamDays_Frontend/result_page.html"
// }, 2000)

const urlParams = new URLSearchParams(window.location.search);
const studentNumber = urlParams.get('studentNumber');
const name = urlParams.get('name');

setTimeout(() => {
    fetch('https://likelion.hellofriend.cc/api/draw' , {
        method: 'POST' ,
        headers : {
            'Content-Type' : 'application/json' 
        },
        body : JSON.stringify({name, studentNumber})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 오류 발생: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("API 응답 데이터:", data);
        if (data.drawResult && data.drawResult.drawnUser) {
            const drawnUser = data.drawResult.drawnUser;
            window.location.href = `result_page.html?name=${drawnUser.name}&age=${drawnUser.age}&instagramId=${drawnUser.instagramId}&department=${drawnUser.department}&gender=${drawnUser.gender}&mbti=${drawnUser.mbti}&bio=${drawnUser.bio}`;
        } else {
            console.log("오류발생오류발생");
        }
    })
    .catch(error => console.error('오류', error));

}, 2000)

async function drawUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentNumber = urlParams.get('studentNumber');
    const name = urlParams.get('name');
// 그냥 변수명을 사용하거나, 템플릿 리터럴을 사용할 때는 백틱(`)을 사용
    const requestData = {
        name: name,
        studentNumber: studentNumber
    };


    try {
        const response = await fetch("https://likelion.hellofriend.cc/api/draw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("뽑힌 사용자 정보:", data);

        // 뽑힌 사용자 정보 추출
        const drawnUser = data;  // 백엔드에서 보내주는 사용자 정보 그대로 받기

        // 쿼리 파라미터로 데이터를 넘기기
        window.location.href = `result_page.html?name=${drawnUser.name}&age=${drawnUser.age}&instagramId=${drawnUser.instagramId}&department=${drawnUser.department}&gender=${drawnUser.gender}&mbti=${drawnUser.mbti}&bio=${drawnUser.bio}`;        
    } catch (error) {
        console.error("뽑기 실패:", error);
    }
}

async function drawUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentNumber = urlParams.get('studentNumber');
    const name = urlParams.get('name');
    const requestData = {
        name: `${name}`,
        studentNumber: `${studentNumber}`
    };

    try {
        const response = await fetch("https://likelion.hellofriend.cc/api/draw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API 응답 데이터:", data);  // 서버 응답 데이터 확인

        // 뽑힌 사용자 정보 추출
        const drawnUser = data;  // 백엔드에서 보내주는 사용자 정보 그대로 받기

        console.log("뽑힌 사용자 정보:", drawnUser);  // 뽑힌 사용자 정보 확인

        // 쿼리 파라미터로 데이터를 넘기기
        const redirectUrl = `result_page.html?name=${drawnUser.name}&age=${drawnUser.age}&instagramId=${drawnUser.instagramId}&department=${drawnUser.department}&gender=${drawnUser.gender}&mbti=${drawnUser.mbti}&bio=${drawnUser.bio}`;
        console.log("리디렉션 URL:", redirectUrl);  // 리디렉션 URL 확인

        window.location.href = redirectUrl;  // 페이지 리디렉션
    } catch (error) {
        console.error("뽑기 실패:", error);
    }
}

drawUser();




