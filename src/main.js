'use-strict'

import  Popup  from './popup.js';
import {Game, Reason} from './game.js';
import * as sound from './sound.js';


    const gameReplayPopup = new Popup();

    gameReplayPopup.setClickListener(()=>game.start());



    const game = new Game(5,5,5);  // TIME BUGCOUNT CARROTCOUNT

    game.setGameStopListener((reason)=>{
        let message;
        switch(reason){
            case Reason.win:
                message = "You Won🎉";
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
            default:
                throw new Error('no valid reason..');
        }
        sound.stopBg();
        gameReplayPopup.showWithText(message);
    })




