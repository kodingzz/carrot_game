'use-strict'

import  Popup  from './popup.js';
import Game from './game.js';
import * as sound from './sound.js';


    const gameReplayPopup = new Popup();

    gameReplayPopup.setClickListener(()=>{
        game.start();
        sound.playBg();
    }
);


    const game = new Game(5,5,5);  // TIME BUGCOUNT CARROTCOUNT

    game.setGameStopListener((reason)=>{
        let message;
        switch(reason){
            case 'win':
                message = "You Won🎉";
                sound.playWin();
                break;
            case 'lose':
                message= 'You Lost😥';
                sound.playBug();    
                break;
            case 'replay':
                message= 'Replay❓';
                sound.playAlert();
                break;
            default:
                throw new Error('no valid reason..');
        }
        sound.stopBg();
        gameReplayPopup.showWithText(message);
    })




