const $runningman = document.querySelector('#runningman');
const characterLocation = {
    x: 0, y: 0
}

const allowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']
document.addEventListener(
    'keydown', (event) => {
        if (!allowedKeys.includes(event.key)) {
            return;
        }
        $runningman.classList.remove('pause-running');
        $runningman.classList.add('play-running');
        calcCharacterLocation(event.key);
        $runningman.setAttribute('style', `transform: translate(${characterLocation.x}px, ${characterLocation.y}px)`);
    }
)
document.addEventListener(
    'keyup', (event) => {
        if (!allowedKeys.includes(event.key)) {
            return;
        }
        $runningman.classList.remove('play-running');
        $runningman.classList.add('pause-running');
    }
)

function calcCharacterLocation(key) {
    switch (key) {
        case 'ArrowRight':
            characterLocation.x += 10;
            break;
        case 'ArrowLeft':
            characterLocation.x -= 10;
            break;
        case 'ArrowUp':
            characterLocation.y -= 10;
            break;
        case 'ArrowDown':
            characterLocation.y += 10;
            break;
        default:
            break;
    }
}