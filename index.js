import { drawingLogo, deviceType } from "./module.js";

document.getElementById('insta').src = drawingLogo().toDataURL('image/jpeg');
let social = document.querySelectorAll('.social > a');
let insta = social[0];
switch (deviceType) {
    case 'android':
        insta.href = "intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end";
        break;
    case 'ios':
        insta.href = "instagram://media";
        break;
            
    default:
        insta.href = 'https://instagram.com/move._.on__';
        break;
}