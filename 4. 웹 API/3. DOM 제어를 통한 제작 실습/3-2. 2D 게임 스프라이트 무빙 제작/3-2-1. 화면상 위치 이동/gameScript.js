'use strict'

// 1. 캐릭터 이미지 사전로드
const imgDir = '../img_character/';
const postureTypes = ['back', 'front', 'left', 'right']
const images = Array.from({length:40},
    (_, idx) => `${imgDir}${postureTypes[Math.floor(idx/10)]}_walk${idx%10}.png`
)
images.forEach(image => {
    const img = new Image();
    img.src = image;
});

// 2. 캐릭터 요소 선택
const $userCharacter = document.getElementById('user-character');

// 3. 캐릭터 이동 관련 변수 선언
const characterLocation = {
    x: 0, y: 0
}
const step = 20;
const animationPostfix = {
    ArrowDown: 'forward',
    ArrowUp: 'backward',
    ArrowLeft: 'left',
    ArrowRight: 'right'
}
const moveTo = {
    ArrowDown: (function forward() { return function () { characterLocation.y += step; } })(),
    ArrowUp: (function backward() { return function(){ if (characterLocation.y !== 0) { characterLocation.y -= step; } } })(),
    ArrowLeft: (function forward() { return function(){ if (characterLocation.x !== 0) { characterLocation.x -= step; } } })(),
    ArrowRight: (function forward() { return function(){ characterLocation.x += step; } })()
}
const runningActions = Object.values(animationPostfix).map(direction => `running-${direction}`);
const pausedActions = Object.values(animationPostfix).map(direction => `pause-${direction}`);
function playAnimation(key) {
    $userCharacter.classList.remove(...pausedActions);
    $userCharacter.classList.add(`running-${animationPostfix[key]}`);
}
function pauseAnimation(key) {
    $userCharacter.classList.remove(...runningActions);
    $userCharacter.classList.add(`pause-${animationPostfix[key]}`);
}

// 4. 캐릭터 이동 제어를 위한 방향키 이벤트 리스너 부착
document.addEventListener('keydown', (event) => {
    // 4-1. 이벤트 키 수신
    const key = event.key;

    // 4-2. 키 입력에 따른 캐릭터 애니메이션 재생시작
    playAnimation(key);

    // 4-3. 키 입력에 따른 캐릭터 좌표 수정
    // switch (key) {
    //     case 'ArrowUp':
    //         if (characterLocation.y !== 0) {
    //             characterLocation.y -= step;
    //         }
    //         break;
    //     case 'ArrowDown':
    //         characterLocation.y += step;
    //         break;
    //     case 'ArrowLeft':
    //         if (characterLocation.x !== 0) {
    //             characterLocation.x -= step;
    //         }
    //         break;
    //     case 'ArrowRight':
    //         characterLocation.x += step;
    //         break;
    //     default:
    //         break;
    // }

    // 4-3-2. 함수객체 적용 버전
    moveTo[key]();

    // 4. 캐릭터 위치 이동
    $userCharacter.setAttribute('style', `transform: translate(${characterLocation.x}px, ${characterLocation.y}px)`);
});

// 5. 방향키 입력 종료 감지 리스너 부착
document.addEventListener('keyup', (event) => {
    // CSS 애니메이션 일시정지
    setTimeout(() => {pauseAnimation(event.key)}, 200);
});
