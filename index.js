import { drawingLogo, deviceType } from "./module.js";
console.log(deviceType());

let social = document.querySelectorAll('.social > a');
let insta = social[0];
let insta2 = social[1];
insta.children[0].src = drawingLogo().toDataURL('image/jpeg');
insta2.children[0].src = drawingLogo().toDataURL('image/jpeg');
switch (deviceType()) {
    case 'other':
        insta.href = "https://instagram.com/move._.on__";
        break;
    default:
        insta.href = "instagram://user?username=move._.on__";
        break;
}
document.querySelector('#mob-menu').addEventListener('click', function() {
    const button = this;
    let menu = document.querySelector('.menu');
    console.log(1);
    
    let list = document.querySelector('.menu > ul')
    if (menu.classList.contains('open')) {
        list.style.left = '-40%';
        menu.classList.remove('open');
        button.textContent = '메뉴';
    } else {
        list.style.left = 0;
        menu.classList.add('open');
        button.textContent = '닫기';
    }
});
