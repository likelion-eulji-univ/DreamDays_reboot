// const warningNumber = document.querySelector('.warningNumber');
// const warningName = document.querySelector('.warningName');

// const checkButton = document.querySelector('.testt')

// const drawPage = document.querySelector('.drawPage');
// const checkPage = document.querySelector('.checkPage');


// function inputValue() {
//     const nameValue = document.getElementById('name').value;
//     const studentNumberValue = document.getElementById('studentNumber').value;
//     if (nameValue === "" || studentNumberValue === "") {
//         if (nameValue === "" && studentNumberValue === "") {
//             warningName.classList.add('warning');
//             warningNumber.classList.add('warning');
//         } else if (nameValue === "") {
//             warningName.classList.add('warning');
//         } else {
//             warningNumber.classList.add('warning');
//         } 
//         return false
//     } else {
//         return true
//     }
// }

// function inputSense(e) {
//     if (e.target.value) {
//         console.log(e.target);
//     }
// }


function putNone() {
    if (inputValue()) {
        drawPage.classList.toggle("none");
        checkPage.classList.toggle("none");
    }
}



// checkButton.addEventListener('click', putNone);

// window.addEventListener("popstate", function (event) {
//     window.location.href = "index.html";
// });