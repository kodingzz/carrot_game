const playAndStopBtn =document.querySelector('.playStop__btn');

const gameBody =document.querySelector('.game__body');
const gameBodyWidth =gameBody.clientWidth;
const gameBodyHeight =gameBody.clientHeight;


const replayToggle = document.querySelector('.replayToggle');
const replayBtn= document.querySelector('.replayBtn');
const replayText= document.querySelector('.replayText');


const carrot= document.querySelectorAll('.carrot');
const btns =document.querySelectorAll('.btn');


// sound 변수
const carrotSound =document.querySelector('.clickCarrotSound');
const bugSound =document.querySelector('.clickBugSound');
const gameWinSound =document.querySelector('.gameWinSound');
const replayAlertSound =document.querySelector('.replayAlertSound');
const bgSound =document.querySelector('.bgSound');

//  타이머 관련 변수
let playTimer;  // setInterval 함수를 받는 변수
let clock= 10;

//  당근 갯수 변수
const count= document.querySelector('.count');
count.innerText=10;



    //  시작 , 정지 버튼 클릭시 
    playAndStopBtn.addEventListener('click',(event)=>{
        const target= event.target;
        if(target.tagName!=='I'){
            return;
        }
        //   타이머 작동 함수
        passTime(target);
     })
  
       //  타이머 작동 함수
    function passTime(target){
        //    처음 눌렀을 때
        if(target.classList.contains('fa-play')){
            bgSound.play(); 
            playTimer = startInterval(callback);
            target.classList.add('fa-stop');
            target.classList.remove('fa-play');
            placeRandomly();
        }
        //  처음 이후에 눌렀을 때
        else{
            bgSound.pause();
            clearInterval(playTimer);
            showReplayToggle();
            replayAlertSound.play();
        

            return;
        }
    }

        //   setInterval 시행시 delay되지 않고 바로 실행 시키기위한 함수
        function startInterval(callback){
            callback();
            return setInterval(callback,1000);
         }
         //  setInterval에 사용될 콜백함수
         function callback(){
             const timerClock= document.querySelector('.timer__clock');
              if(clock===-1){
                handleGameOver();
              } 
              else{
                 timerClock.innerText= `0:${clock}`;
                 clock--;
              }
         }
    
         
    // 당근과 벌레가 랜덤하게 배치되는 함수
    function placeRandomly(){
        const btns =[...document.querySelectorAll('.btn')];
        gameBody.classList.remove('unvisible');
        btns.forEach(item=>{
            item.style.top=`${(Math.random()*(gameBodyHeight-item.clientHeight*2))/gameBodyHeight*100}%`;
            item.style.left=`${(Math.random()*(gameBodyWidth-item.clientWidth*2))/gameBodyWidth*100}%`;
    });

}

    function showReplayToggle(){
        replayToggle.classList.remove('unvisible');
        playAndStopBtn.classList.add('unvisible');
        btns.forEach(item=>item.disabled=true);    //  리플레이를 제외한 나머지 버튼들 비활성화
    }




    gameBody.addEventListener('click',(event)=>{
        const target= event.target;

        //  당근 클릭시
        if(target.classList.contains('carrot')){
            carrotSound.play();
            count.innerText--;
            target.style.display ="none";
                //  게임을 이겼을 시
                if(count.innerText==0){
                    gameWinSound.play();
                    clearInterval(playTimer);
                    replayText.innerText="You Won 🎉";
                    showReplayToggle();
                    clock=0;
                }
            
        }
        //  벌레 클릭시
        else if(target.classList.contains('bug')){
        handleGameOver();
        }   
    })



    //  리플레이 버튼 클릭시 
    replayBtn.addEventListener('click',()=>{
        
        if(clock<=0){
            handleinitialize();
            bgSound.play();
            playTimer = startInterval(callback);
            placeRandomly();
        }

        else{
            clock++; // 이유는 모르겠으나 리플래이 버튼을 누르면 시간이 1초씩 감소된 상태로 시작함 그래서 재시작시 +1을 해줌
            playTimer = startInterval(callback);
            replayToggle.classList.add('unvisible');
            playAndStopBtn.classList.remove('unvisible');
            bgSound.play();
        }  
        btns.forEach(item=>item.disabled=false);

     
    })

    
    
    

//  게임을 다시 시작할때 설정을 초기화 시켜주는 함수
function handleinitialize(){
    count.innerText=10;
    clock=10;
    replayText.innerText="Replay❓";
    playAndStopBtn.classList.remove('unvisible');
    replayToggle.classList.add('unvisible');
    [...carrot].forEach(item=> item.style.display="inline");

    bgSound.pause();
    bgSound.currentTime=0;
}

//  게임을 졌을때 설정하는 함수
function handleGameOver(){
    clock=0;
    clearInterval(playTimer);
    replayText.innerText="You Lost 🤣";
    showReplayToggle();

    bugSound.play();
    bgSound.pause();
    bgSound.currentTime=0;
    return;
}