import { drawingLogo, deviceType, drawingGear } from "./module.js";
console.log(deviceType());

const rootStyles = getComputedStyle(document.documentElement);
// 값을 숫자로 변환 (px를 제외한 값)
const headerHeight = parseFloat(rootStyles.getPropertyValue('--header-height').trim());
const fontSize = parseFloat(rootStyles.getPropertyValue('--font-size').trim());
const content = document.getElementById('content');

let social = document.querySelectorAll('.social > a');
social.forEach((e, i) => {
    switch (e.children[0].id) {
        case 'insta':
            e.children[0].src = drawingLogo().toDataURL('image/jpeg');
            switch (deviceType()) {
                case 'other':
                    e.href = "https://instagram.com/move._.on__";
                    break;
                default:
                    e.href = "instagram://user?username=move._.on__";
                    break;
            }
            break;
        case 'setting':
            e.children[0].src = drawingGear().toDataURL('image/png');
            e.addEventListener('click', () => {
                const closePopUp = () => {
                    const element = document.querySelector('.PopUp#gear');
                    if (element) {
                        element.remove();
                        return true;
                    }
                }
                if (closePopUp()) return;
                const root = document.createElement('div');
                root.style.width = '70vw';
                root.style.maxWidth = '50vh';
                root.style.padding = `${headerHeight / 6}px`;
                root.style.borderRadius = '15px';
                root.style.border = '1px solid black';
                root.style.backgroundColor = 'rgba(255,255,255,0.9)';
                root.style.display = 'flex';
                root.style.flexDirection = 'column';
                const container = document.createElement('div');
                container.style.maxHeight = '20vh';
                container.style.overflowY = 'auto';
                root.appendChild(container);
                const closeBtn = document.createElement('div');
                closeBtn.textContent = '닫기';
                closeBtn.style.fontSize = '14px';
                closeBtn.style.textAlign = 'center';
                closeBtn.style.padding = `${headerHeight / 6}px`;
                closeBtn.style.border = '1px solid black';
                closeBtn.style.backgroundColor = 'white';
                closeBtn.onclick = () => {
                    if (closePopUp()) return;
                }
                root.appendChild(closeBtn);

                const sound = document.createElement('div');
                sound.style.display = 'flex';
                sound.style.flexDirection = 'column';
                let div = document.createElement('div');
                div.textContent = '123';
                div.style.height = '30vh';
                sound.appendChild(div);
                container.appendChild(sound);


                root.className = 'PopUp';
                root.id = 'gear';
                document.body.appendChild(root);

            });
            break;

        default:
            break;
    }
});
document.querySelector('#mob-menu').addEventListener('click', function () {
    const button = this;
    let menu = document.querySelector('.menu');
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
let voices = [];
window.speechSynthesis.onvoiceschanged = function () {
    voices = window.speechSynthesis.getVoices().filter((voice) => {
        return voice.lang == 'ko-KR';
    });
}
document.querySelectorAll('.menu > ul > li li').forEach((e) => {
    e.addEventListener('click', () => {
        document.querySelectorAll('.PopUp').forEach((e) => {
            e.remove();
        })
        document.querySelector('.menu.open #mob-menu').click();
        const target = e.getAttribute('data-content');
        content.innerText = '';
        const root = document.createElement('div');
        switch (target) {
            case 'timer':
                root.style.display = 'flex';
                root.style.justifyContent = 'center';
                const button = document.createElement('button');
                const message = new SpeechSynthesisUtterance();
                const canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 300;
                canvas.style.width = '70vw';
                canvas.style.height = '70vw';
                canvas.style.maxWidth = '50vh';
                canvas.style.maxHeight = '50vh';
                canvas.style.margin = `${headerHeight / 2}px`;

                const radius = canvas.width / 2 - canvas.width / 20; //원의 반지름
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const ctx = canvas.getContext('2d');
                let hour = 0;
                let minute = 0;
                let second = 0;
                function selectTime() {
                    const container = document.createElement('div');
                    container.style.display = 'flex';
                    container.style.margin = `${headerHeight/4}px`;
                    const hours = document.createElement('div');
                    hours.style.display = 'flex';
                    hours.style.flexDirection = 'column';
                    hours.style.width = '20vw';
                    hours.style.maxWidth = '20vh';
                    const text = document.createElement('div');
                    text.textContent = '시간';
                    text.style.textAlign = 'center';
                    text.style.height = `${headerHeight / 2}px`;
                    text.style.lineHeight = `${headerHeight / 2}px`;
                    hours.appendChild(text);
                    const canvas = document.createElement('canvas');
                    drawTime(canvas, hour);
                    hours.appendChild(canvas);
                    container.appendChild(hours);

                    const colon = document.createElement('canvas');
                    colon.style.width = '2.5vw';
                    colon.style.maxWidth = '2.5vh';
                    colon.style.height = '50vw';
                    colon.style.maxHeight = '50vh';
                    colon.width = 20;
                    colon.height = 400;
                    colon.style.marginTop = `${headerHeight / 2}px`;
                    const ctx = colon.getContext('2d');
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(colon.width / 2, colon.height / 2 - colon.width / 3 - headerHeight / 5, colon.width / 3, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(colon.width / 2, colon.height / 2 - colon.width / 3 + headerHeight / 5, colon.width / 3, 0, 2 * Math.PI);
                    ctx.fill();
                    container.appendChild(colon);

                    const minutes = hours.cloneNode(true);
                    minutes.children[0].textContent = '분';
                    drawTime(minutes.children[1], minute);
                    container.appendChild(minutes);

                    const colon2 = colon.cloneNode(true);
                    const ctx2 = colon2.getContext('2d');
                    ctx2.drawImage(colon, 0, 0);
                    container.appendChild(colon2);

                    const seconds = hours.cloneNode(true);
                    seconds.children[0].textContent = '초';
                    drawTime(seconds.children[1], second);
                    container.appendChild(seconds);

                    Array.from(container.childNodes).map((e) => {
                        return e.childNodes[1];
                    }).filter((e, i) => {
                        return i % 2 == 0;
                    }).forEach((e, i) => {
                        let touchStartY = 0;
                        let touchChangeY = 0;
                        let touchedTime = null;
                        let touchStartTime;
                        let touchEndTime;
                        let speedInterval;
                        function setTime(event) {
                            const touch = event.touches[0];
                            try {
                                clearInterval(speedInterval);
                                onAnimationEnd();
                            } catch (ignore) { }
                            touchStartTime = new Date().getTime();
                            touchedTime = i;
                            touchStartY = touch.clientY;
                            touchChangeY = 0;
                        }
                        function moveTime(event) {
                            const touch = event.touches[0];
                            touchChangeY = touchStartY - touch.clientY;
                            drawTime(e, [hour, minute, second][touchedTime], touchChangeY);
                        }
                        function stopTime() {
                            touchEndTime = new Date().getTime();
                            let deltaTime = touchEndTime - touchStartTime;
                            // 속도 계산 (거리 / 시간)
                            let speed = Math.min(touchChangeY / deltaTime, 4.1); // 픽셀/ms
                            // 가속도 계산 (속도 변화 / 시간)
                            // const acceleration = speed / deltaTime; // 픽셀/ms²
                            try {
                                clearInterval(speedInterval);
                            } catch (ignore) { }
                            speedInterval = setInterval(() => {
                                if (Math.abs(speed) <= 0.03) {
                                    clearInterval(speedInterval);
                                    onAnimationEnd();
                                }
                                speed -= Math.sign(speed) * 0.03;
                                touchChangeY += speed * 30;
                                drawTime(e, [hour, minute, second][touchedTime], touchChangeY);
                            }, 10);
                        }
                        function onAnimationEnd() {
                            let result = parseInt(over([hour, minute, second][touchedTime], Math.round(touchChangeY / (e.height / 2 * 0.7))));
                            if (Math.round(touchChangeY / (e.height / 2 * 0.7)) == 0) {
                                result = parseInt(over([hour, minute, second][touchedTime], Math.sign(touchChangeY)));
                            }

                            switch (touchedTime) {
                                case 0:
                                    hour = result;
                                    break;
                                case 1:
                                    minute = result;
                                    break;
                                case 2:
                                    second = result;
                                    break;

                                default:
                                    throw new Error("exception");
                            }

                            if (Math.round(touchChangeY / (e.height / 2 * 0.7)) == 0) {
                                touchChangeY -= (e.height / 2 * 0.7) * Math.sign(touchChangeY);
                            } else {
                                touchChangeY -= (e.height / 2 * 0.7) * Math.round(touchChangeY / (e.height / 2 * 0.7));
                            }
                            function timeAnimation() {
                                if (Math.abs(touchChangeY) > 10) {
                                    touchChangeY -= Math.sign(touchChangeY) * 10;
                                    drawTime(e, [hour, minute, second][touchedTime], touchChangeY);
                                    requestAnimationFrame(timeAnimation);
                                    return;
                                }
                                touchChangeY = 0;
                                drawTime(e, [hour, minute, second][touchedTime]);
                            }
                            timeAnimation();
                        }
                        switch (deviceType()) {
                            case 'other':
                                alert('android, ios 운영체제만 지원하는 서비스입니다.');
                                e.addEventListener('mousedown', setTime);
                                break;
                            default:
                                e.addEventListener('touchstart', setTime);
                                e.addEventListener('touchmove', moveTime);
                                e.addEventListener('touchend', stopTime);

                                break;
                        }
                    })

                    root.appendChild(container);
                }
                selectTime();
                function over(num, add) {
                    if (num + add < 0) {
                        return (num + add + 60).toString();
                    } else if (num + add > 59) {
                        return over(num + add - 60, 0);
                    } else {
                        if ((num + add).toString().length < 2) {
                            return '0' + (num + add);
                        }
                        return (num + add).toString();
                    }
                }
                function drawTime(canvas, num, touchChangeY = 0) {
                    if (num.toString().length > 2) throw new Error("문자열 길이 오버됨", str);
                    canvas.width = 200;
                    canvas.height = 500;
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const ctx = canvas.getContext('2d');
                    ctx.font = `${centerY / 2}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#333'; // 텍스트 색상
                    for (let i = 0; i < 50; i++) {
                        let str = over(num, i);
                        ctx.fillText(str[0], centerX * 0.65, centerY * (1 + i * 0.7) - touchChangeY);
                        ctx.fillText(str[1], centerX * 1.35, centerY * (1 + i * 0.7) - touchChangeY);
                        if (i == 0) continue;
                        str = over(num, -i);
                        ctx.fillText(str[0], centerX * 0.65, centerY * (1 - i * 0.7) - touchChangeY);
                        ctx.fillText(str[1], centerX * 1.35, centerY * (1 - i * 0.7) - touchChangeY);
                    }
                }

                let startTime = Date.now(); // 타이머 시작 시간
                let duration = 3000; // 타이머 전체 시간 (60초 = 60000ms)
                function drawTimer() {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1); // 0에서 1 사이의 값

                    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

                    // 원형 타이머를 그립니다.
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, -Math.PI / 2, 2 * Math.PI * progress - Math.PI / 2);
                    ctx.lineWidth = canvas.width / 20;
                    ctx.strokeStyle = '#00aaff'; // 선 색상
                    ctx.lineCap = 'round'; // 선 끝 모양
                    ctx.stroke();

                    // 중앙에 텍스트를 그립니다.
                    ctx.font = `${canvas.width / 10}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#333'; // 텍스트 색상

                    // 텍스트 내용
                    const remainingTime = Math.max(Math.floor((duration - elapsedTime) / 1000 + 1), 0);
                    ctx.fillText(`${remainingTime}s`, centerX, centerY);


                    // 타이머가 끝나면 다시 시작합니다.
                    if (elapsedTime < duration) {
                        requestAnimationFrame(drawTimer); // 애니메이션 프레임 요청
                    }
                }




                button.addEventListener('click', () => {
                    message.voice = voices[3];
                    message.lang = 'ko-KR';
                    message.text = '안녕하세요? 테스트 중입니다!';
                    message.pitch = 1;//목소리 높이 0~2 (기본값: 1)
                    message.rate = 1;//말하는 속도 0.1~10 (기본값: 1)
                    message.volume = 1;//0~1 (기본값: 1)
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(message);
                });
                button.textContent = '실행'
                // root.appendChild(canvas);
                content.appendChild(root);
                break;

            default:
                content.innerText = '404 Not Found';
                break;
        }
    });
})