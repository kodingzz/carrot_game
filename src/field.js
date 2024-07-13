'use-strict';



export default class Field{
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
        if(target.classList.contains('carrot')){
             target.remove();
            this.onItemClick&& this.onItemClick('carrot');
        }
        else if(target.classList.contains('bug')){
           
            this.onItemClick&& this.onItemClick('bug');

        }   

    }

    initRandom(){
        this.gameBody.innerHTML='';
        this.addItem('carrot',this.CARROT_COUNT,'img/carrot.png');
        this.addItem('bug',this.BUG_COUNT,'img/bug.png');
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