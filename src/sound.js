'use-strict';



const carrotSound =new Audio('sound/carrot_pull.mp3');
const bugSound =new Audio('sound/bug_pull.mp3');
const gameWinSound =new Audio('sound/game_win.mp3');
const replayAlertSound =new Audio('sound/alert.wav');
const bgSound =new Audio('sound/bg.mp3');


function playSound(sound){
    sound.currentTime=0;
    sound.play();
}
function stopSound(sound){
    sound.pause();
}



export function playBg(){
    playSound(bgSound);
}

export function stopBg(){
    stopSound(bgSound);
}

export function playBug(){
    playSound(bugSound);

}

export function playCarrot(){
    playSound(carrotSound);
}

export function playWin(){
    playSound(gameWinSound);
}
export function playAlert(){
    playSound(replayAlertSound);
}