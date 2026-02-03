// document.querySelector(".checkInfo").addEventListener("click", function(event) {
//     event.preventDefault(); // 기존 링크 이동 차단
//     this.disabled = true; // 버튼 비활성화
//     alert("친구 뽑기는 드림데이즈 2일차 2월 28일날 동아리 홍보 부스 운영 시간에 열립니다. 조금만 기다려주세요!! "); // 알림 표시
// }); 
//위 코드 지워야함 드림데이즈날 꼭

const registerInfo = document.querySelector('.registerInfo');
const checkInfo = document.querySelector('.checkInfo');
const orangeDisplay = document.querySelector('.orangeDisplay');
const blackDisplay = document.querySelector('.blackDisplay');
const orange = document.querySelector('.orange');
const black = document.querySelector('.black');
const likelion = document.querySelector('.likelion');
const body = document.querySelector('body');


//화면 넘김 모션
const clickCheck = () => {
    orangeDisplay.classList.add('none');
    blackDisplay.classList.add('none');
    orange.classList.add('maxWidth');
    black.classList.add('minWidth');
    likelion.classList.add('none')
}
const clickRegister = () => {
    orangeDisplay.classList.add('none');
    blackDisplay.classList.add('none');
    orange.classList.add('minWidth');
    black.classList.add('maxWidth');
    likelion.classList.add('none')
}
checkInfo.addEventListener('click', clickCheck);
registerInfo.addEventListener('click', clickRegister);



//입력한 정보 확인 페이지 이동
const checkOrangeDisplayLink = () => {
    setTimeout(() => {
        window.location.href = "checkInfo.html"
    }, 1000)
}
checkInfo.addEventListener('click', checkOrangeDisplayLink);



const checkBlackDisplayLink = () => {
    setTimeout(() => {
        window.location.href = "information.html"
    }, 1000)
}
registerInfo.addEventListener('click', checkBlackDisplayLink);