'use-strict';

import  {Field, Type}  from './field.js';
import * as sound from './sound.js';



export const Reason = Object.freeze({
    win : "win",
    lose: 'lose',
    replay :"replay",
})

export  class Game{
    constructor(TIME,BUG_COUNT,CARROT_COUNT){
        this.started= false; 
        this.BUG_COUNT= BUG_COUNT;
        this.CARROT_COUNT= CARROT_COUNT;
        this.TIME= TIME;
        this.score= 0;
        this.playTimer=undefined;
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
    start(){
        this.started=true;
        this.initGame();
        this.startTimer();
        this.gameField.initRandom();
    }
    initGame(){
        this.showStopBtn();
        this.gameCount.innerText=this.CARROT_COUNT;
        this.showGameBtn();
        this.showTimerAndCount();
        sound.playBg();
        this.score=0;

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
                this.stopOrFinish(Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTime);
        },1000)
    }
    updateTimerText(time){
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
    
   
    onItemClick(item){
        if(item===Type.carrot){
          sound.playCarrot();
          this.gameCount.innerText= this.CARROT_COUNT- ++this.score;
              if(this.CARROT_COUNT===this.score){
                this.stopOrFinish(Reason.win);
              }
      }
      else if(item===Type.bug){
        this.stopOrFinish(Reason.lose);
      }   
}

}