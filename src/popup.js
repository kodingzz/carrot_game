'use-strict';

export default class Popup{
    constructor(){
        this.replayPopup = document.querySelector('.replayPopup');
        this.replayBtn= document.querySelector('.replayBtn');
        this.replayText= document.querySelector('.replayText');

        this.replayBtn.addEventListener('click',()=>{
            this.onClick&& this.onClick();
            this.hide();
        });            
    }
    setClickListener(onClick){
        this.onClick =onClick;
    }
    hide(){
        this.replayPopup.classList.add('unvisible');
    }
    showWithText(text){
        this.replayText.innerText= text;
        this.replayPopup.classList.remove('unvisible');
    }

}