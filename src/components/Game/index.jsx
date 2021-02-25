import React, { useState, useEffect } from 'react';
import { OneUserGameArea } from '../OneUserGameArea';
import { BtnKinds } from '../GameChoiceBtn';
import useSound from 'use-sound';

import winGameSound from '../../assets/sounds/win.mp3';
import drawGameSound from '../../assets/sounds/draw.mp3';
import loseGameSound from '../../assets/sounds/lose.mp3';

import './styles.css';


export const Game = () => {
  const [started, SetStarted] = useState(false);
  const [roundOver, SetRoundOver] = useState(true);
  const [firstPlayerScore, SetFirstPlayerScore] = useState(0);
  const [secondPlayerScore, SetSecondPlayerScore] = useState(0);
  const [firstPlayerTurn, SetFirstPlayerTurn] = useState(true);
  const [firstUserChoice, SetFirstUserChoice] = useState(null);
  const [secondUserChoice, SetSecondUserChoice] = useState(null);
  const [startMakingComputerChoice, setStartMakingComputerChoice] = useState(false);

  const [playWinGameSound] = useSound(winGameSound);
  const [playDrawGameSound] = useSound(drawGameSound);
  const [playLoseGameSound] = useSound(loseGameSound);

  const resetGame = () => {
    SetStarted(true);
    SetRoundOver(false);
    SetFirstPlayerScore(0);
    SetSecondPlayerScore(0);
    SetFirstPlayerTurn(true);
    SetFirstUserChoice(null);
    SetSecondUserChoice(null);
  }


  useEffect(() => {
    // Если первый игрок сделал свой выбор,...
    if (firstUserChoice !== null) {
      // ...передаем очередь хода второму игроку
      SetFirstPlayerTurn(false);
    }
  }, [firstUserChoice]);


  useEffect(() => {
    // Если очередь ходить второму игроку (а это комп), ...
    if (firstPlayerTurn === false) {
      // ...тогда делаем за него выбор
      setStartMakingComputerChoice(true);
    }
  }, [firstPlayerTurn]);


  useEffect(() => {
    if (secondUserChoice !== null) {
      // Определяем победителя игры
      const determineWinner = () => {
        if (firstUserChoice === secondUserChoice) {
          playDrawGameSound();
          return;
        }
        if (((firstUserChoice === BtnKinds.rock) && (secondUserChoice === BtnKinds.scissors)) ||
            ((firstUserChoice === BtnKinds.scissors) && (secondUserChoice === BtnKinds.paper)) ||
            ((firstUserChoice === BtnKinds.paper) && (secondUserChoice === BtnKinds.rock))) {
          SetFirstPlayerScore(firstPlayerScore + 1);
          playWinGameSound();
        } else {
          SetSecondPlayerScore(secondPlayerScore + 1);
          playLoseGameSound();
        }
      };
      determineWinner();
      // Завершаем очередной раунд игры
      SetRoundOver(true);
      setStartMakingComputerChoice(false);
    }
    
  }, [secondUserChoice]);


  return (
    <div className='game-area'>
      <div className='score-area'>
        {firstPlayerScore} : {secondPlayerScore}
      </div>

      <div className='choice-btns-area'>
        
        <div>
          <div>
            {started && firstPlayerTurn && 'Your choice:'}
          </div>
          <OneUserGameArea
            userCanMakeChoice={started && !roundOver && firstPlayerTurn}
            setUserChoice={(value) => {
              SetFirstUserChoice(value);
            }}
            userChoice={firstUserChoice}
            playsComputer={false}
          />
        </div>
        
        <div>
          <OneUserGameArea
            userCanMakeChoice={started && !roundOver && !firstPlayerTurn}
            setUserChoice={(value) => {
              SetSecondUserChoice(value);
            }}
            userChoice={secondUserChoice}
            playsComputer={true}
            startMakingComputerChoice={startMakingComputerChoice}
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
     
        <div className="prompts-block">
          {!started && 'To start, press "New game" button'}
          {started && !roundOver && 'Press "New game" to restart'}
          {started && roundOver && 'Press "Continue" to continue or "New game" to restart'}
        </div>

      </div>
      
    </div>
  );
};
