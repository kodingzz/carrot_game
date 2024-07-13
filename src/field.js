'use-strict';

export const Type =Object.freeze({
    carrot :'carrot',
    bug :'bug',
})

export  class Field{
    constructor(CARROT_COUNT,BUG_COUNT){
        this.CARROT_COUNT = CARROT_COUNT;
        this.BUG_COUNT =BUG_COUNT;
        this.CARROT_SIZE=80;
        this.gameBody =document.querySelector('.game__body');
        this.gameBodyRect =this.gameBody.getBoundingClientRect();
        this.gameBody.addEventListener('click',(event)=>{
           this.onClick && this.onClick(event);
        });

    }
    setClickListener(onItemClick){
        this.onItemClick= onItemClick;
    }

    onClick(event){
        const target= event.target;
        if(target.classList.contains(Type.carrot)){
             target.remove();
            this.onItemClick&& this.onItemClick(Type.carrot);
        }
        else if(target.classList.contains(Type.bug)){
           
            this.onItemClick&& this.onItemClick(Type.bug);

        }   

    }

    initRandom(){
        this.gameBody.innerHTML='';
        this.addItem(Type.carrot,this.CARROT_COUNT,'img/carrot.png');
        this.addItem(Type.bug,this.BUG_COUNT,'img/bug.png');
    }
    
    addItem(className,score,imgPath){
               const gameBodyWidth =this.gameBodyRect.width;
               const gameBodyHeight =this.gameBodyRect.height;
               for(let i =0;i<score;i++){
                   const img =document.createElement('img');
                   img.src= imgPath;
                   img.classList.add(className);
                   img.style.position="absolute";
                   img.style.cursor="pointer";
                   const x= Math.random()*(gameBodyWidth-this.CARROT_SIZE);
                   const y= Math.random()*(gameBodyHeight-this.CARROT_SIZE);
                   img.style.left=`${x}px`;
                   img.style.top=`${y}px`;
                   this.gameBody.appendChild(img);
               }
    }

}