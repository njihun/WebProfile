export {drawingLogo, deviceType}
const drawingLogo = (canvas = document.createElement('canvas'), data = [["#ffff00", "#ff0050", [50, 170, 25, 50, 170, 100]], ["#ff00e6", "#ffffff00", [30, -20, 60, 20, -60, 140]], ["#af00ea", "#c8c8c800", [3, -7, 20, 20, -10, 70]]]) => {
    canvas.width = 150;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    data.forEach((e, i) => {
        let grad = ctx.createRadialGradient(...e[2]);
        grad.addColorStop(0, e[0]);
        grad.addColorStop(1, e[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 150, 150);
    });
    ctx.strokeStyle = "white";
    ctx.lineWidth = 9;
    const r = 20;
    let x = 50;
    let y = 30;
    let change = [100, 30];
    const add = {
        r(arg) {
            return arg < 50 ? r : arg > 100 ? -r : arg > 50 ? r : -r;
        },
        change(arg) {
            return arg <= 50 ? 50 : -50;
        }
    }
    for (let i = 0; i < 4; i++) {
        ctx.moveTo(x, y);
        ctx.lineTo(change[0], change[1]);
        ctx.stroke();
        [x, y] = change;
        ctx.beginPath();
        ctx.arc(x + add.r(x) * (i % 2), y + add.r(y) * ((i + 1) % 2), r, i > 1 ? Math.PI : 0, ((i > 1 ? i % 2 : (i + 1) % 2) + 0.5) * Math.PI, i % 2 == 0);
        ctx.stroke();
        x += add.r(x);
        y += add.r(y);
        change = [x + add.change(x) * (i % 2), y + add.change(y) * ((i + 1) % 2)];
    }
    ctx.beginPath();
    ctx.arc(75, 75, 19, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100, 50, 2, 0, 2 * Math.PI);
    ctx.stroke();
    return canvas;
};
const deviceType = () => {
    let varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    if ( varUA.indexOf('android') > -1) {
        //안드로이드
        return 'android';
    } else if ( varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 ||varUA.indexOf("ipod") > -1 ) {
        //IOS
        return 'ios';
    } else {
        //아이폰, 안드로이드 외 모바일
        return 'other';
    }
}