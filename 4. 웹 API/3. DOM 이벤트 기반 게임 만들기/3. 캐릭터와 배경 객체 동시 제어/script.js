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
// const characterLocation = {
//     x: 0, y:0
// }
// 2-2. 백그라운드 이동을 위한 요소 선택 및 변수 선언
const $background = document.querySelector('.town-map');
// console.log($background);
const backgroundLocation = {
    x: 0, y:0
}
// 2-3. 움직임 제어 세부 변수 선언
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
// 나중에 싱크가 맞지 않는 동작들에 대해서 처리 후, 유사동작 싱크를 맞출 때 활용할 수 있다.
const delayMappingMilliSecond = {
    walkStop: 350,
    bgMoveStop: 1000,
    bgFlashStop: 5000,
}
// for (let keyName of allowedKeys) {
//     console.log(`walking-${animationKeyMap[keyName]}`,
//                 `pause-${animationKeyMap[keyName]}`);
// }
// function characterMove() {
//     $userCharacter.setAttribute('style', `transform: translate(${characterLocation.x}px, ${characterLocation.y}px)`)
// }
function backgroundMove() {
    // CSS 문법이 JS 맥락에서 사용되고 있어서, 문법 검사가 어렵다.
    //   solution => style 시트에서 정적으로 작성해 보고, 그 후에 복사해서 가져오면 안전하다.
    //   유사한 방식으로, 자동완성을 적극적으로 사용하면, 가능하면 항상 사용하면 좋다.
    //   여러개의 동일값을 수정할 때는, 개별적으로 하지 말고, 일괄수정하면 개별오타가 안나고 디버깅포인트 or 작업 시점에 따른 반추가 쉽다.
    $background.setAttribute('style',
        `background-position: ${backgroundLocation.x}px ${backgroundLocation.y}px;`
    )
}
// Function Map 사용의 메리트 : 각각의 키에 대한 동작이 복잡해져도, 서로 영향을 주지 않게끔, 분리되는 효과 => 코드가 간결해지고 유지보수성이 상승
const animationFunctionMap = {
    ArrowDown: function() {
        // if(characterLocation.y >= mapSizeY) { return; }
        backgroundLocation.y -= stepSize; backgroundMove()
    },
    ArrowUp: function() {
        // if(characterLocation.y <= 0) { return; }
        backgroundLocation.y += stepSize; backgroundMove()
    },
    ArrowLeft: function() {
        // if(characterLocation.x <= 0) { return; }
        backgroundLocation.x += stepSize; backgroundMove()
    },
    ArrowRight: function() {
        // if(characterLocation.x >= mapSizeX) { return; }
        backgroundLocation.x -= stepSize; backgroundMove()
    }
}

function playWalk(evt) {
    // //// pause 가 남아있는 것을 제거해야 함 => 어떤 방향의 pause 가 남아있을 지 알 수가 없음 => 모든 방향의 pause 제거
    for (let direction of Object.values(animationKeyMap)) {
        $userCharacter.classList.remove(`pause-${direction}`);
    }
    // //// 특정 키에 특정 방향 애니메이션 매칭하도록 클래스 추가
    $userCharacter.classList.add(`walking-${animationKeyMap[evt.key]}`);
}

// WebStorm 및 주류 IDE 들은 refactoring 관점에서 주요 반복적으로 활용되는 동작들에 대한 자동화를 제공합니다.
// => 아래 changeLocation 메서드는 자동으로 extract 를 통해서 분리함
function changeLocation(evt) {
    animationFunctionMap[evt.key]();
    console.log(backgroundLocation);
}

// 3. 애니메이션 적용
document.addEventListener('keydown', (evt) => {
        // 3-1. 이벤트 키 검사
        if (!allowedKeys.includes(evt.key)) {
            return;
        }
        // 3-2. 애니메이션 적용
        playWalk(evt);

        // 3-3. 위치 이동을 위한 로직 입력
        // Function Mapping 을 배경에 대해서 이동하도록 변경합니다.
        changeLocation(evt);
    }
)

function pauseWalk(evt) {
    $userCharacter.classList.remove(`walking-${animationKeyMap[evt.key]}`);
    // 특정 키에 특정 방향 애니메이션 매칭하도록 클래스 추가
    $userCharacter.classList.add(`pause-${animationKeyMap[evt.key]}`);
}

document.addEventListener('keyup', (evt) => {
        // 이벤트 키 검사
        if (!allowedKeys.includes(evt.key)) {
            return;
        }
        // 3-2. 애니메이션 중단
        // pauseWalk(evt);
        //  캐릭터 걸음 애니메이션 중단이 배경이동 완료 전에 이루어져서 미끄러짐 효과가 발생
        //   -> setTimeout 을 사용해서 지연된 캐릭터 걸음 종료를 적용한다.
        setTimeout(() => {pauseWalk(evt)}, delayMappingMilliSecond.walkStop);
    }
)
