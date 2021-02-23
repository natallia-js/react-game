import React, { useState, useEffect } from 'react';
import { OneUserGameArea } from '../OneUserGameArea';
import { BtnKinds } from '../GameChoiceBtn';

import './styles.css';


export const Game = () => {
  const [started, SetStarted] = useState(false);
  const [roundOver, SetRoundOver] = useState(true);
  const [firstPlayerScore, SetFirstPlayerScore] = useState(0);
  const [secondPlayerScore, SetSecondPlayerScore] = useState(0);
  const [firstPlayerTurn, SetFirstPlayerTurn] = useState(true);
  const [firstUserChoice, SetFirstUserChoice] = useState(null);
  const [secondUserChoice, SetSecondUserChoice] = useState(null);


  const resetGame = () => {
    SetStarted(true);
    SetRoundOver(false);
    SetFirstPlayerScore(0);
    SetSecondPlayerScore(0);
    SetFirstPlayerTurn(true);
    SetFirstUserChoice(null);
    SetSecondUserChoice(null);
  }


  useEffect(() => { console.log('fir us ch')
    // Если первый игрок сделал свой выбор,...
    if (firstUserChoice !== null) {
      // ...передаем очередь хода второму игроку
      SetFirstPlayerTurn(false);
    }
  }, [firstUserChoice]);


  useEffect(() => { console.log('sec us ch')
    if (secondUserChoice !== null) {
      // Определяем победителя игры
      const determineWinner = () => {
        if (firstUserChoice === secondUserChoice) {
          return;
        }
        if (((firstUserChoice === BtnKinds.rock) && (secondUserChoice === BtnKinds.scissors)) ||
            ((firstUserChoice === BtnKinds.scissors) && (secondUserChoice === BtnKinds.paper)) ||
            ((firstUserChoice === BtnKinds.paper) && (secondUserChoice === BtnKinds.rock))) {
          SetFirstPlayerScore(firstPlayerScore + 1);
        } else {
          SetSecondPlayerScore(secondPlayerScore + 1);
        }
      };
      determineWinner();
      // Завершаем очередной раунд игры
      SetRoundOver(true);
    }
    
  }, [secondUserChoice]);


  return (
    <div className='game-area'>
      <div className='score-area'>
        {firstPlayerScore} : {secondPlayerScore}
      </div>

      <div className='choice-btns-area'>
        
        <div>
          <OneUserGameArea
            userCanMakeChoice={started && !roundOver && firstPlayerTurn}
            setUserChoice={(value) => {
              SetFirstUserChoice(value);
            }}
            userChoice={firstUserChoice}
          />
        </div>
        
        <div>
          <OneUserGameArea
            userCanMakeChoice={started && !roundOver && !firstPlayerTurn}
            setUserChoice={(value) => {
              SetSecondUserChoice(value);
            }}
            userChoice={secondUserChoice}
          />
        </div>
      
      </div>

      <div className='game-btns-area'>
        
        <button
          onClick={() => {
            resetGame();
          }}
        >
          New game
        </button>

        <button disabled={!started || (started && !roundOver)}
          onClick={() => {
            SetFirstUserChoice(null);
            SetSecondUserChoice(null);
            SetRoundOver(false);
            SetFirstPlayerTurn(true);
          }}
        >
          Continue
        </button>
     
      </div>
    </div>
  );
};
