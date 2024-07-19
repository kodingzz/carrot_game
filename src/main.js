'use-strict'

import  Popup  from './popup.js';
import {Game, Reason} from './game.js';
import * as sound from './sound.js';


    const gameReplayPopup = new Popup();


        const game= new Game(10,10,1);


     
         game.setGameStopListener((reason)=>{
            let message;
            switch(reason){
                case Reason.win:
                    message = "Go next level!👍";
                    sound.playWin();
                    break;
                case Reason.lose:
                    message= 'You Lost😥';
                    sound.playBug();    
                    break;
                case Reason.replay:
                    message= 'Replay❓';
                    sound.playAlert();
                    break;
                case Reason.finish:
                    message= 'You are Winner🎉'
                    sound.playChampion();
                    break;
                default:
                    throw new Error('no valid reason..');
            }

            sound.stopBg();
            gameReplayPopup.showWithText(message);
        })
        console.log(game);
        gameReplayPopup.setClickListener(()=> {
            gameReplayPopup.replayText.innerText==="Replay❓" ? game.continue() :  game.start();
        });


           

            // gameReplayPopup.setClickListener(()=> game.start());
        
        


    
        
     
    


  
