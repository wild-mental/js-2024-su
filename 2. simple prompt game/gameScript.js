// 숫자 최대값 입력을 받습니다.
let maxNum = prompt("숫자 맞추기 게임입니다. 최대값을 입력하세요! (종료: 'q')")
while (!parseInt(maxNum)) {
    // 종료 조건을 먼저 만들어 줘야 편리합니다.
    if (maxNum === 'q') {
        console.log("게임 실행을 취소합니다.");
        break;
    }
    maxNum = prompt("입력 오류, 유효한 숫자 값을 입력해 주세요. (종료: 'q')");
}
if (maxNum === 'q') {
    console.log("게임 종료.");
} else {
    // 게임 시작 안내 문구 출력
    alert(`숫자 맞추기 게임을 시작합니다.\n1 ~ ${maxNum} 까지의 숫자를 맞춰보세요`)
    // 1 ~ maxNum 까지의 정수 난수 pick
    const targetNum = Math.floor(Math.random() * maxNum) +1;
    let userGuess = undefined;
    let guessAttempts = 1;
    let gameQuit = false;
    while (!gameQuit) {
        // 유저의 인풋을 반복적으로 수신하는 게임 코드 작성
        if (userGuess === undefined) {
            userGuess = prompt(`숫자 맞추기를 시작합니다! 1 ~ ${maxNum} 까지의 숫자를 입력하세요 (종료: 'q' 입력)`);
        }
        if (userGuess === 'q') {
            gameQuit = true;
        } else if (parseInt(userGuess) === targetNum) {
            alert("정답입니다!")
            gameQuit = true;
        } else if (parseInt(userGuess) > targetNum) {
            guessAttempts++
            userGuess = prompt(`숫자가 너무 큽니다! ${userGuess} 보다 작은 숫자를 입력하세요 (종료: 'q' 입력)`);
        } else if (parseInt(userGuess) < targetNum) {
            guessAttempts++
            userGuess = prompt(`숫자가 너무 작습니다! ${userGuess} 보다 큰 숫자를 입력하세요 (종료: 'q' 입력)`);
        }
        else {
            guessAttempts++
            userGuess = prompt("유효합 입력이 아닙니다! \n1 ~ ${maxNum} 까지의 숫자를 입력하세요\n(종료: 'q' 입력)");
        }
    }

    // 게임이 종료된 방식에 따라 적절한 내용 출력
    if (userGuess !== 'q') {
        console.log("축하합니다!\n정답을 맞추어서 게임이 종료되었습니다.")
    }
}
