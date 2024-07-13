'use-strict'

import  Popup  from './popup.js';
import  Field  from './field.js';



const gameBtn =document.querySelector('.game__btn');

const gameTimer = document.querySelector('.timer');
const gameTimerClock =document.querySelector('.timer__clock');
const gameCount =document.querySelector('.count');



const BUG_COUNT= 5;
const CARROT_COUNT= 5;
const TIME = 5;


// sound 변수
const carrotSound =new Audio('sound/carrot_pull.mp3');
const bugSound =new Audio('sound/bug_pull.mp3');
const gameWinSound =new Audio('sound/game_win.mp3');
const replayAlertSound =new Audio('sound/alert.wav');
const bgSound =new Audio('sound/bg.mp3');


let playTimer;  // setInterval 함수를 받는 변수
let score = 0;
let started= false; // 게임 시작 유무



    const gameReplayPopup = new Popup();

    gameReplayPopup.setClickListener(()=>startGame());

    const gameField= new Field(CARROT_COUNT,BUG_COUNT);

    gameField.setClickListener((item)=>onFieldClick(item));



    function onFieldClick(item){
                  if(item==='carrot'){
                    playSound(carrotSound);
                    gameCount.innerText= CARROT_COUNT- ++score;
                        if(CARROT_COUNT===score){
                            finishGame(true);
                        }
                }
                //  벌레 클릭시
                else if(item==='bug'){
                    finishGame(false);
                }   

    }


    function finishGame(win){
        started= false;
        hideGameBtn();
        noClickImg();
        stopTimer();
        stopSound(bgSound);

        if(win){
            gameReplayPopup.showWithText('You Won🎉');
            playSound(gameWinSound);
        }
        else{
            gameReplayPopup.showWithText('You Lost😥');
            playSound(bugSound);
        }
     }

     function noClickImg(){
        const images =document.querySelectorAll('img');
        images.forEach(image=>image.classList.add('pointerNone'));
     }


    gameBtn.addEventListener('click',(event)=>{
        if(started===true){
            stopGame();
        }
        else{
            startGame();
        }
     })
     

     function startGame(){
        started=true;
        initGame();
        startTimer();
        gameField.initRandom();
     }

     function startTimer(){
        let remainingTime = TIME;
        updateTimerText(remainingTime);
        playTimer = setInterval(()=>{
            if(remainingTime<=0){
                clearInterval(playTimer);
                finishGame(false);
                return;
            }
            updateTimerText(--remainingTime);
        },1000)
     }

     function updateTimerText(time){
        const min= Math.floor(time/60);
        const sec= time%60;
       gameTimerClock.innerText =`${min}:${sec}`;
    }

    function initGame(){
        const icon= document.querySelector('.btn__icon');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-stop');

        gameCount.innerText=CARROT_COUNT;
        showGameBtn();
   
        gameTimer.style.visibility ="visible";
        gameCount.style.visibility ="visible";
        playSound(bgSound);

        gameReplayPopup.hide();
        score=0;

    }


     function stopGame(){
        stopTimer();
        hideGameBtn();
        noClickImg();
        gameReplayPopup.showWithText('Replay❓');
        stopSound(bgSound);
        playSound(replayAlertSound);

     }

    function stopTimer(){
        clearInterval(playTimer);
    }
    function hideGameBtn(){
        gameBtn.classList.add('unvisible');
    }

    function showGameBtn(){
        gameBtn.classList.remove('unvisible');
    }

    function playSound(sound){
        sound.currentTime=0;
        sound.play();
    }
    function stopSound(sound){
        sound.pause();
    }



