'use-strict';

import  {Field, Type}  from './field.js';
import * as sound from './sound.js';


const INIT_CARROT_COUNT= 1;
const INIT_BUG_COUNT= 10;
const INIT_TIME= 10;
const INIT_LEVEL= 0;
const gameLevel=  [
    {
        "level":1,
        "time": 10,
        "carrotCount": 3,
        "bugCount": 10
    },
    {
        "level":2,
        "time": 10,
        "carrotCount": 5,
        "bugCount": 10
    },
    {
        "level":3,
        "time": 10,
        "carrotCount": 7,
        "bugCount": 10
    },
    {
        "level":4,
        "time": 10,
        "carrotCount": 10,
        "bugCount": 10
    },
    {
        "level":5,
        "time": 10,
        "carrotCount": 10,
        "bugCount": 20
    },
    {
        "level":6,
        "time": 10,
        "carrotCount": 10,
        "bugCount": 25
    },
    {
        "level":7,
        "time": 10,
        "carrotCount": 5,
        "bugCount": 30
    },
    {
        "level":8,
        "time": 10,
        "carrotCount": 5,
        "bugCount": 35
    },
    {
        "level":9,
        "time": 10,
        "carrotCount": 5,
        "bugCount":40
    },
    {
        "level":10,
        "time": 10,
        "carrotCount": 5,
        "bugCount": 50
    }
]

 

export const Reason = Object.freeze({
    win : "win",
    lose: 'lose',
    replay :"replay",
    finish:"finish"
})

const currentLevel =document.querySelector('.level');
export  class Game{
    constructor(TIME,BUG_COUNT,CARROT_COUNT){
        this.level =INIT_LEVEL;
        this.started= false; 
        this.BUG_COUNT= BUG_COUNT;
        this.CARROT_COUNT= CARROT_COUNT;
        this.TIME= TIME;
        this.currentTime;
        this.score= 0;
        this.playTimer=undefined;
        this.moveTimer=undefined;
        this.gameField= new Field(this.CARROT_COUNT,this.BUG_COUNT);
        this.gameField.setClickListener((item)=>this.onItemClick(item));
        this.gameBtn =document.querySelector('.game__btn');
        this.gameTimer = document.querySelector('.timer');
        this.gameTimerClock =document.querySelector('.timer__clock');
        this.gameCount =document.querySelector('.count');

        this.gameBtn.addEventListener('click',()=>{
            if(this.started===true){
                this.stopOrFinish(Reason.replay);
            }
            else{
                this.start();
            }
        })
    }

    setGameStopListener(onGameStop){
        this.onGameStop =onGameStop;
    }
    showLevel(){
        currentLevel.innerText=`Lv.${this.level}`;
        currentLevel.style.visibility= "visible";
    }
    start(){
        this.started=true;
        this.showLevel();
        this.startTimer();
        this.initGame();
        this.gameField.initRandom();

    }
    moveRandom(){
   
            const bugs =document.getElementsByClassName('bug');
         
            for(let i=0;i<bugs.length;i++){
                const itemX =bugs[i].getBoundingClientRect().left;
                const itemY =bugs[i].getBoundingClientRect().top;
                const gameHeaderHeight =351;

              const moveTimer=  setInterval(()=>{
                const {x,y} = this.getRandomPosition();
                    bugs[i].style.transform = `translate(${x-itemX}px,${y-itemY+gameHeaderHeight}px`;
                },1000);
                setTimeout(() => {
                    clearInterval(moveTimer); // 이동 중지
                }, this.TIME*1000); // 10초 후에 이동 중지
            }
           
      
    }
    getRandomPosition(){
        const containerWidth = this.gameField.gameBodyRect.width;
        const containerHeight= this.gameField.gameBodyRect.height;
        const randomX =Math.random() * (containerWidth- 50);
        const randomY =Math.random() *(containerHeight-50);
        return { x: randomX, y: randomY };
    }

    
    goNextStage(){
        this.CARROT_COUNT = gameLevel[this.level]["carrotCount"];
        this.BUG_COUNT = gameLevel[this.level]["bugCount"];
        this.TIME = gameLevel[this.level]["time"];
        this.level++;
    }
    initStage(){
        this.CARROT_COUNT = INIT_CARROT_COUNT;
        this.BUG_COUNT = INIT_BUG_COUNT;
        this.TIME = INIT_TIME;
        this.level=INIT_LEVEL;
    }

    continue(){
        this.started=true;
        this.continueTimer();
        this.continueGame();
        this.clickImg();
    }

    initGame(){
        this.showStopBtn();
        this.gameCount.innerText=this.CARROT_COUNT;
        this.showGameBtn();
        this.showTimerAndCount();
        sound.playBg();
        this.score=0;
    }
    continueGame(){
        this.showStopBtn();
        this.gameCount.innerText=this.CARROT_COUNT-this.score;
        this.showGameBtn();
        this.showTimerAndCount();
        sound.playBg();
    }
    showTimerAndCount(){
        this.gameTimer.style.visibility ="visible";
        this.gameCount.style.visibility ="visible";
    }
    showGameBtn(){
        this.gameBtn.classList.remove('unvisible');
    }
    showStopBtn(){
        const icon= document.querySelector('.btn__icon');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-stop');
    }
    startTimer(){
        let remainingTime = this.TIME;
        this.updateTimerText(remainingTime);
        this.playTimer = setInterval(()=>{
            if(remainingTime<=0){
                clearInterval(this.playTimer);
                // this.stopOrFinish(Reason.lose);
                this.finishGame(Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTime);
        },1000)
    }
    continueTimer(){
        let remainingTime =this.currentTime;
        this.updateTimerText(remainingTime);
        this.playTimer = setInterval(()=>{
            if(remainingTime<=0){
                clearInterval(this.playTimer);
                // this.stopOrFinish(Reason.lose);
                this.finishGame(Reason.lose);
                this.initStage();
                return;
            }
            this.updateTimerText(--remainingTime);
        },1000)
    }
    updateTimerText(time){
        this.currentTime= time;
        const min= Math.floor(time/60);
        const sec= time%60;
       this.gameTimerClock.innerText =`${min}:${sec}`;
    }

    stopOrFinish(reason){
        this.started=false;
        this.stopTimer();
        this.hideGameBtn();
        this.noClickImg();
        this.onGameStop && this.onGameStop(reason);
      
    }
    stopTimer(){
        clearInterval(this.playTimer);
    }
    hideGameBtn(){
        this.gameBtn.classList.add('unvisible');
    }
    noClickImg(){
        const images =document.querySelectorAll('img');
        images.forEach(image=>image.classList.add('pointerNone'));
    }
    clickImg(){
        const images =document.querySelectorAll('img');
        images.forEach(image=>image.classList.remove('pointerNone'));
    }
    
    finishGame(reason){
        this.stopOrFinish(reason);  
        this.initStage();   
        this.gameField.setItemCount(INIT_BUG_COUNT,INIT_CARROT_COUNT);
    }
    
    onItemClick(item){
        if(item===Type.carrot){
          sound.playCarrot();
          this.score++;
          this.gameCount.innerText= this.CARROT_COUNT- this.score;
              if(this.CARROT_COUNT===this.score){
                if(this.level===gameLevel.length){  // 마지막 레벨을 통과시 
                    this.finishGame(Reason.finish);
                    return;
                }
                this.stopOrFinish(Reason.win);
                this.goNextStage(); 
                this.gameField.setItemCount(this.BUG_COUNT,this.CARROT_COUNT)  // field의 bug,carrot 갯수를 최신화 시켜주는 함수
              }
      }
      else if(item===Type.bug){
        this.finishGame(Reason.lose);
      }   
}


}