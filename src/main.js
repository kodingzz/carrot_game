'use-strict'

const gameBtn =document.querySelector('.game__btn');
const gameBody =document.querySelector('.game__body');
const gameBodyRect =gameBody.getBoundingClientRect();

const gameTimer = document.querySelector('.timer');
const gameTimerClock =document.querySelector('.timer__clock');
const gameCount =document.querySelector('.count');

const replayPopup = document.querySelector('.replayPopup');
const replayBtn= document.querySelector('.replayBtn');
const replayText= document.querySelector('.replayText');


const BUG_COUNT= 5;
const CARROT_COUNT= 5;
const TIME = 5;
const CARROT_SIZE= 80;


// sound 변수
const carrotSound =new Audio('sound/carrot_pull.mp3');
const bugSound =new Audio('sound/bug_pull.mp3');
const gameWinSound =new Audio('sound/game_win.mp3');
const replayAlertSound =new Audio('sound/alert.wav');
const bgSound =new Audio('sound/bg.mp3');


let playTimer;  // setInterval 함수를 받는 변수
let score = 0;
let started= false; // 게임 시작 유무





    gameBody.addEventListener('click',(event)=>onBodyClick(event));



    function onBodyClick(event){
            const target= event.target;
              //  당근 클릭시
              if(target.classList.contains('carrot')){
                playSound(carrotSound);
                gameCount.innerText= CARROT_COUNT- ++score;
                target.remove();
                    if(CARROT_COUNT===score){
                        finishGame(true);
                    }
                
            }
            //  벌레 클릭시
            else if(target.classList.contains('bug')){
                finishGame(false);
            }   
    }

    function finishGame(win){
        started= false;
        stopTimer();
        stopSound(bgSound);

        if(win){
            showReplayToggle('You Won🎉');
            playSound(gameWinSound);
        }
        else{
            showReplayToggle('You Lost😥');
            playSound(bugSound);
        }
     }

     replayBtn.addEventListener('click',()=>{
        startGame();
    })


    gameBtn.addEventListener('click',(event)=>{
        //  정지 버튼 누를 경우
        if(started===true){
            stopGame();
            //  게임버튼 생략
            //  리플레이 토글창이 나와야하고
            //  시간이 멈춰야 히고
            //  배경음악이 멈춰야히고
            //  리플레이 토글 음악이 나와야한다.
        }
        //  시작 버튼 누를 경우
        else{
            startGame();
            //  벌레 당근이 랜덤배치
        }
     })
     

 
     function startGame(){
        started=true;
        initGame();
        startTimer();
        placeRandomly();
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
        gameBtn.classList.remove('unvisible');
   
        gameTimer.style.visibility ="visible";
        gameCount.style.visibility ="visible";
        playSound(bgSound);

        replayPopup.classList.add('unvisible');
        score=0;

    }
        // 당근과 벌레가  생성되어 랜덤하게 배치되는 함수
     function placeRandomly(){     
            gameBody.innerHTML='';
            addItem('carrot',CARROT_COUNT,'img/carrot.png');
            addItem('bug',BUG_COUNT,'img/bug.png');
   }
   

   function addItem(className,score,imgPath){
     
       const gameBodyWidth =gameBodyRect.width;
       const gameBodyHeight =gameBodyRect.height;
       for(let i =0;i<score;i++){
           const img =document.createElement('img');
           img.src= imgPath;
           img.classList.add(className);
           img.style.position="absolute";
           img.style.cursor="pointer";
           const x= Math.random()*(gameBodyWidth-CARROT_SIZE);
           const y= Math.random()*(gameBodyHeight-CARROT_SIZE);
           img.style.left=`${x}px`;
           img.style.top=`${y}px`;
           gameBody.appendChild(img);
       }
   }



     function stopGame(){
        stopTimer();
        showReplayToggle("Replay❓");
        stopSound(bgSound);
        playSound(replayAlertSound);

     }

  
    function stopTimer(){
        clearInterval(playTimer);
    }


    
    function showReplayToggle(text){
        replayPopup.classList.remove('unvisible');
        gameBtn.classList.add('unvisible');
        replayText.innerText =text;
        const images =document.querySelectorAll('img');
        images.forEach(image=>image.classList.add('pointerNone'));
        
    }

    function playSound(sound){
        sound.currentTime=0;
        sound.play();
    }
    function stopSound(sound){
        sound.pause();
    }



