'use strict'

// 1. 캐릭터 요소 선택 및 확인
const $userCharacter = document.getElementById('zeldarink');
// console.log($userCharacter);
const imgDir = '../img_zeldarink/'
const postureTypes = ['back', 'front', 'left', 'right']
document.addEventListener('DOMContentLoaded', () => {
    // 1-2. 캐릭터 이미지 사전로드
    for (let direction of postureTypes) {
        let charImgs= Array.from({length:10},
            (_, idx) => {
            return `${imgDir}${direction}_walk${idx}.png`;
        });
        // console.log(charImgs);
        charImgs.forEach(imgPath => {$userCharacter.setAttribute('style', `background-image: url("${imgPath}")`)})
    }
    // 1-3. 캐릭터 이미지 최초 포지션 세팅
    $userCharacter.setAttribute('style', 'background-image: url("../img_zeldarink/front_stand.png")')
    }
)
// 2. 캐릭터 이동을 위한 주요 변수 및 메서드 선언
const characterLocation = {
    x: 0, y:0
}
const stepSize = 20;
const mapSizeX = 1500;
const mapSizeY = 2000;
// const animationPostfix = [ 'forward', 'backward', 'left', 'right' ]
const allowedKeys = [ 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight' ]
// walking-forward, walking-backward, walking-left, walking-right
// pause-forward, pause-backward, pause-left, pause-right
// let keyName = '';
// const playDirections = `walking-${animationKeyMap[keyName]}`;
// const pauseDirections = `pause-${animationKeyMap[keyName]}`;
const animationKeyMap = {
    ArrowDown: 'forward',
    ArrowUp: 'backward',
    ArrowLeft: 'left',
    ArrowRight: 'right'
}
// for (let keyName of allowedKeys) {
//     console.log(`walking-${animationKeyMap[keyName]}`,
//                 `pause-${animationKeyMap[keyName]}`);
// }
function characterMove() {
    $userCharacter.setAttribute('style', `transform: translate(${characterLocation.x}px, ${characterLocation.y}px)`)
}
// Function Map 사용의 메리트 : 각각의 키에 대한 동작이 복잡해져도, 서로 영향을 주지 않게끔, 분리되는 효과 => 코드가 간결해지고 유지보수성이 상승
const animationFunctionMap = {
    ArrowDown: function() {
        if(characterLocation.y >= mapSizeY) { return; }
        characterLocation.y += stepSize; characterMove()
    },
    ArrowUp: function() {
        if(characterLocation.y <= 0) { return; }
        characterLocation.y -= stepSize; characterMove()
    },
    ArrowLeft: function() {
        if(characterLocation.x <= 0) { return; }
        characterLocation.x -= stepSize; characterMove()
    },
    ArrowRight: function() {
        if(characterLocation.x >= mapSizeX) { return; }
        characterLocation.x += stepSize; characterMove()
    }
}


// 3. 애니메이션 적용
document.addEventListener('keydown', (evt) => {
    // 3-1. 이벤트 키 검사
    if (!allowedKeys.includes(evt.key)) {
        return;
    }
    // 3-2. 애니메이션 적용
    // //// pause 가 남아있는 것을 제거해야 함 => 어떤 방향의 pause 가 남아있을 지 알 수가 없음 => 모든 방향의 pause 제거
    for (let direction of Object.values(animationKeyMap)) {
        $userCharacter.classList.remove(`pause-${direction}`);
    }
    // //// 특정 키에 특정 방향 애니메이션 매칭하도록 클래스 추가
    $userCharacter.classList.add(`walking-${animationKeyMap[evt.key]}`);

    // 3-3. 위치 이동을 위한 로직 입력
    //     - 위치 이동을 위한 characterLocation 값 조정 필요
    // 위치 이동 로직
    // (1) switch-case
    // switch (evt.key) {
    //     case 'ArrowDown':
    //         characterLocation.y += stepSize;
    //         break;
    //     case 'ArrowUp':
    //         characterLocation.y -= stepSize;
    //         break;
    //     case 'ArrowLeft':
    //         characterLocation.x -= stepSize;
    //         break;
    //     case 'ArrowRight':
    //         characterLocation.x += stepSize;
    //         break;
    //     default:
    //         break;
    // }
    // (2) Function Mapping
    animationFunctionMap[evt.key]();
    console.log(characterLocation);
    }
)
document.addEventListener('keyup', (evt) => {
        // 이벤트 키 검사
        if (!allowedKeys.includes(evt.key)) {
            return;
        }
        // 3-2. 애니메이션 중단
        $userCharacter.classList.remove(`walking-${animationKeyMap[evt.key]}`);
        // 특정 키에 특정 방향 애니메이션 매칭하도록 클래스 추가
        $userCharacter.classList.add(`pause-${animationKeyMap[evt.key]}`);
    }
)