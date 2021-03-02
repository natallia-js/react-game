import React, { useState, useEffect, useRef } from 'react';
import { OneUserGameArea } from '../OneUserGameArea';
import { BtnKinds } from '../GameChoiceBtn';
import useSound from 'use-sound';

import winGameSound from '../../assets/sounds/win.mp3';
import drawGameSound from '../../assets/sounds/draw.mp3';
import loseGameSound from '../../assets/sounds/lose.mp3';

import './styles.css';
import './animate.min.css';

import { saveInLocalStorage, getFromLocalStorage } from '../../additional/localStor';


const classNames = require('classnames');

const MAX_ROUNDS_PER_GAME = 10;
const MAX_GAMES_LOG = 10;


export const Game = () => {
  const [started, SetStarted] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('started')) {
      return { data: data.started, fromLocStor: true };
    } else {
      saveInLocalStorage({ started: false });
      return { data: false, fromLocStor: false };
    }
  });
  const [roundOver, SetRoundOver] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('roundOver')) {
      return { data: data.roundOver, fromLocStor: true };
    } else {
      saveInLocalStorage({ roundOver: true });
      return { data: true, fromLocStor: false };
    }
  });
  const [firstPlayerScore, SetFirstPlayerScore] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('firstPlayerScore')) {
      return { data: data.firstPlayerScore, fromLocStor: true };
    } else {
      saveInLocalStorage({ firstPlayerScore: 0 });
      return { data: 0, fromLocStor: false };
    }
  });
  const [secondPlayerScore, SetSecondPlayerScore] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('secondPlayerScore')) {
      return { data: data.secondPlayerScore, fromLocStor: true };
    } else {
      saveInLocalStorage({ secondPlayerScore: 0 });
      return { data: 0, fromLocStor: false };
    }
  });
  const [firstPlayerTurn, SetFirstPlayerTurn] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('firstPlayerTurn')) {
      return { data: data.firstPlayerTurn, fromLocStor: true };
    } else {
      saveInLocalStorage({ firstPlayerTurn: true });
      return { data: true, fromLocStor: false };
    }
  });
  const [firstUserChoice, SetFirstUserChoice] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('firstUserChoice')) {
      return { data: data.firstUserChoice, fromLocStor: true };
    } else {
      saveInLocalStorage({ firstUserChoice: null });
      return { data: null, fromLocStor: false };
    }
  });
  const [secondUserChoice, SetSecondUserChoice] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('secondUserChoice')) {
      return { data: data.secondUserChoice, fromLocStor: true };
    } else {
      saveInLocalStorage({ secondUserChoice: null });
      return { data: null, fromLocStor: false };
    }
  });
  const [startMakingComputerChoice, setStartMakingComputerChoice] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('startMakingComputerChoice')) {
      return { data: data.startMakingComputerChoice, fromLocStor: true };
    } else {
      saveInLocalStorage({ startMakingComputerChoice: false });
      return { data: false, fromLocStor: false };
    }
  });
  const [useSounds, SetUseSounds] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('useSounds')) {
      return { data: data.useSounds, fromLocStor: true };
     } else {
      saveInLocalStorage({ useSounds: true });
      return { data: true, fromLocStor: false };
     }
  });
  const [soundVolume, SetSoundVolume] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('soundVolume')) {
      return { data: data.soundVolume, fromLocStor: true };
    } else {
      saveInLocalStorage({ soundVolume: 1 });
      return { data: 1, fromLocStor: false };
    }
  });
  const [last10GameResults, SetLast10GameResults] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('last10GameResults')) {
      return { data: data.last10GameResults, fromLocStor: true };
    } else {
      saveInLocalStorage({ last10GameResults: [] });
      return { data: [], fromLocStor: false};
    }
  });
  const [currRound, SetCurrRound] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('currRound')) {
      return { data: data.currRound, fromLocStor: true };
    } else {
      saveInLocalStorage({ currRound: 1 });
      return { data: 1, fromLocStor: false };
    }
  });
  const [lostPlayer, SetLostPlayer] = useState(() => {
    const data = getFromLocalStorage();
    if (data && data.hasOwnProperty('lostPlayer')) {
      return { data: data.lostPlayer, fromLocStor: true };
    } else {
      saveInLocalStorage({ lostPlayer: 0 });
      return { data: 0, fromLocStor: false };
    }
  })

  const [playWinGameSound] = useSound(winGameSound, { volume: soundVolume.data });
  const [playDrawGameSound] = useSound(drawGameSound, { volume: soundVolume.data });
  const [playLoseGameSound] = useSound(loseGameSound, { volume: soundVolume.data });

  const newGameBtnRef = useRef();
  const continueBtnRef = useRef();


  function resetGame() {
    SetStarted({ data: true, fromLocStor: false });
    SetRoundOver({ data: false, fromLocStor: false });
    SetFirstPlayerScore({ data: 0, fromLocStor: false });
    SetSecondPlayerScore({ data: 0, fromLocStor: false });
    SetFirstPlayerTurn({ data: true, fromLocStor: false });
    SetFirstUserChoice({ data: null, fromLocStor: false });
    SetSecondUserChoice({ data: null, fromLocStor: false });
    SetCurrRound({ data: 1, fromLocStor: false });
    SetLostPlayer({ data: 0, fromLocStor: false });
  }


  function continueGame() {
    SetFirstUserChoice({ data: null, fromLocStor: false });
    SetSecondUserChoice({ data: null, fromLocStor: false });
    SetRoundOver({ data: false, fromLocStor: false });
    SetFirstPlayerTurn({ data: true, fromLocStor: false });
    SetCurrRound({ data: currRound.data + 1, fromLocStor: false });
    SetLostPlayer({ data: 0, fromLocStor: false });
  }


  useEffect(() => {
    function onKeyPress(event) {
      if (event.key === 'n') {
        newGameBtnRef.current.click();
      } else if (event.key === 'c') {
        continueBtnRef.current.click();
      }
    }

    window.addEventListener('keydown', onKeyPress);

    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, []);


  useEffect(() => {
    if (firstUserChoice.fromLocStor) {
      return;
    }
    saveInLocalStorage({ firstUserChoice: firstUserChoice.data });

    // Если первый игрок сделал свой выбор,...
    if (firstUserChoice.data !== null) {
      // ...передаем очередь хода второму игроку
      SetFirstPlayerTurn({ data: false, fromLocStor: false });
    }
  }, [firstUserChoice.data]);


  useEffect(() => {
    if (firstPlayerTurn.fromLocStor) {
      return;
    }
    saveInLocalStorage({ firstPlayerTurn: firstPlayerTurn.data });

    // Если очередь ходить второму игроку (а это комп), ...
    if (firstPlayerTurn.data === false) {
      // ...тогда делаем за него выбор
      setStartMakingComputerChoice({ data: true, fromLocStor: false });
    }
  }, [firstPlayerTurn.data]);


  useEffect(() => {
    if (secondUserChoice.fromLocStor) {
      return;
    }
    saveInLocalStorage({ secondUserChoice: secondUserChoice.data });

    if (secondUserChoice.data !== null) {
      // Определяем победителя раунда
      const determineWinner = () => {
        if (firstUserChoice.data === secondUserChoice.data) {
          if (useSounds.data) {
            playDrawGameSound();
          }
          return;
        }
        if (((firstUserChoice.data === BtnKinds.rock) && (secondUserChoice.data === BtnKinds.scissors)) ||
            ((firstUserChoice.data === BtnKinds.scissors) && (secondUserChoice.data === BtnKinds.paper)) ||
            ((firstUserChoice.data === BtnKinds.paper) && (secondUserChoice.data === BtnKinds.rock))) {
          SetFirstPlayerScore({ data: firstPlayerScore.data + 1, fromLocStor: false });
          SetLostPlayer({ data: 2, fromLocStor: false });
          if (useSounds.data) {
            playWinGameSound();
          }
        } else {
          SetSecondPlayerScore({ data: secondPlayerScore.data + 1, fromLocStor: false });
          SetLostPlayer({ data: 1, fromLocStor: false });
          if (useSounds.data) {
            playLoseGameSound();
          }
        }
      };
      determineWinner();

      // Завершаем очередной раунд игры
      SetRoundOver({ data: true, fromLocStor: false });
      setStartMakingComputerChoice({ data: false, fromLocStor: false });
    }
  }, [secondUserChoice.data]);


  useEffect(() => {
    if (!started.fromLocStor) {
      saveInLocalStorage({ started: started.data });
    }
  }, [started.data]);


  useEffect(() => {
    if (roundOver.fromLocStor) {
      return;
    }
    saveInLocalStorage({ roundOver: roundOver.data });

    if (roundOver.data && (currRound.data === MAX_ROUNDS_PER_GAME)) {
      if (last10GameResults.data.length < MAX_GAMES_LOG) {
        SetLast10GameResults({ data: [...last10GameResults.data, `{${firstPlayerScore.data}:${secondPlayerScore.data}}`], fromLocStor: false });
      } else {
        const newArr = last10GameResults.data;
        newArr.shift();
        SetLast10GameResults({ data: [...newArr, `{${firstPlayerScore.data}:${secondPlayerScore.data}}`], fromLocStor: false });
      }
      // завершаем игру
      SetStarted({ data: false, fromLocStor: false });
    }
  }, [roundOver.data]);


  useEffect(() => {
    if (!firstPlayerScore.fromLocStor) {
      saveInLocalStorage({ firstPlayerScore: firstPlayerScore.data });
    }
  }, [firstPlayerScore.data]);


  useEffect(() => {
    if (!secondPlayerScore.fromLocStor) {
      saveInLocalStorage({ secondPlayerScore: secondPlayerScore.data });
    }
  }, [secondPlayerScore.data]);


  useEffect(() => {
    if (!startMakingComputerChoice.fromLocStor) {
      saveInLocalStorage({ startMakingComputerChoice: startMakingComputerChoice.data });
    }
  }, [startMakingComputerChoice.data]);


  useEffect(() => {
    if (!useSounds.fromLocStor) {
      saveInLocalStorage({ useSounds: useSounds.data });
    }
  }, [useSounds.data]);


  useEffect(() => {
    if (!soundVolume.fromLocStor) {
      saveInLocalStorage({ soundVolume: soundVolume.data });
    }
  }, [soundVolume.data]);


  useEffect(() => {
    if (!last10GameResults.fromLocStor) {
      saveInLocalStorage({ last10GameResults: last10GameResults.data });
    }
  }, [last10GameResults.data]);


  useEffect(() => {
    if (!currRound.fromLocStor) {
      saveInLocalStorage({ currRound: currRound.data });
    }
  }, [currRound.data]);


  useEffect(() => {
    if (!lostPlayer.fromLocStor) {
      saveInLocalStorage({ lostPlayer: lostPlayer.data });
    }
  }, [lostPlayer.data]);


  return (
    <div className='game-area'>
      <div className={classNames('score-area', {
          'win': roundOver.data && (currRound.data === MAX_ROUNDS_PER_GAME) && (firstPlayerScore.data > secondPlayerScore.data),
          'lose': roundOver.data && (currRound.data === MAX_ROUNDS_PER_GAME) && (firstPlayerScore.data < secondPlayerScore.data),
          'draw': roundOver.data && (currRound.data === MAX_ROUNDS_PER_GAME) && (firstPlayerScore.data === secondPlayerScore.data),
        })}
      >
        <div className="score-area-1-block">
          {firstPlayerScore.data}
        </div>
        <div className="score-area-2-block">
          <span className="curr-round">Round {currRound.data} of {MAX_ROUNDS_PER_GAME}</span>
          {roundOver.data && (currRound.data === MAX_ROUNDS_PER_GAME) &&
            <>
              <br/>
              <div className="animate__animated animate__bounceInLeft">
                Game over. {
                  roundOver.data && (currRound.data === MAX_ROUNDS_PER_GAME) && (firstPlayerScore.data === secondPlayerScore.data) ? 'Draw' :
                  roundOver.data && (currRound.data === MAX_ROUNDS_PER_GAME) && (firstPlayerScore.data > secondPlayerScore.data) ? 'You win' : 'Computer wins'
                }
              </div>
            </>
          }
        </div>
        <div className="score-area-3-block">
          {secondPlayerScore.data}
        </div>
      </div>

      <div className='choice-btns-area'>

        <div>
          <div className="propose-user-choice-block">
            {
              started.data && firstPlayerTurn.data &&
              <div className="animate__animated animate__flash">
                'Your choice (click image button or press english "r", "s" or "p" on keyboard):'
              </div>
            }
          </div>
          <OneUserGameArea
            userCanMakeChoice={started.data && !roundOver.data && firstPlayerTurn.data}
            setUserChoice={(value) => {
              SetFirstUserChoice({ data: value, fromLocStor: false });
            }}
            userChoice={firstUserChoice.data}
            playsComputer={false}
            choiceLose={lostPlayer.data === 1}
            acceptKeyboardEvents={true}
          />
        </div>

        <div>
          <OneUserGameArea
            userCanMakeChoice={started.data && !roundOver.data && !firstPlayerTurn.data}
            setUserChoice={(value) => {
              SetSecondUserChoice({ data: value, fromLocStor: false });
            }}
            userChoice={secondUserChoice.data}
            playsComputer={true}
            startMakingComputerChoice={startMakingComputerChoice.data}
            choiceLose={lostPlayer.data === 2}
            acceptKeyboardEvents={false}
          />
        </div>

      </div>

      <div className='game-btns-area'>

        <div>

        <div>
          <button disabled={started.data && currRound.data === 1 && !roundOver.data}
            onClick={resetGame}
            ref={newGameBtnRef}
            className="fill new-game-btn"
           >
            New game
          </button>

          <button disabled={!started.data || (started.data && !roundOver.data)}
            onClick={continueGame}
            ref= {continueBtnRef}
            className="fill"
           >
            Continue
          </button>
        </div>

        <div className="prompts-block" id="blink">
          {!started.data && 'To start, press "New game" button or english "n" on keyboard'}
          {started.data && roundOver.data && 'Press "Continue" (or english "c" on keyboard) to continue or "New game" (or english "n" on keyboard) to restart'}
        </div>

        <div className="slidecontainer">
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={soundVolume.data}
            className="slider"
            onChange={event => {
              SetSoundVolume({ data: event.target.valueAsNumber, fromLocStor: false });
            }}
          />
          { useSounds.data &&
            <button className="sound-btn music-btn"
                    onClick={() => SetUseSounds({ data: false, fromLocStor: false })}
            >
            </button>
          }
          { !useSounds.data &&
            <button className="no-sound-btn music-btn"
                    onClick={() => SetUseSounds({ data: true, fromLocStor: false })}
            >
            </button>
          }
          </div>

        </div>

        <div className="game-res">
          <button
            className="fill clear-btn"
            onClick={() => {
              SetLast10GameResults({ data: [], fromLocStor: false });
            }}
          >
            &#10006; Clear
          </button>
          {`Last 10 game results: ${last10GameResults.data.join('; ')}`}
        </div>

      </div>

    </div>
  );
};
