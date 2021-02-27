import React, { useState, useEffect } from 'react';
import { OneUserGameArea } from '../OneUserGameArea';
import { BtnKinds } from '../GameChoiceBtn';
import useSound from 'use-sound';

import winGameSound from '../../assets/sounds/win.mp3';
import drawGameSound from '../../assets/sounds/draw.mp3';
import loseGameSound from '../../assets/sounds/lose.mp3';

import './styles.css';

const MAX_ROUNDS_PER_GAME = 2;
const MAX_GAMES_LOG = 10;
const LOCAL_STORAGE_NAME = 'My_RSP_Game';


function saveInLocalStorage(obj) {
  if (!obj) {
    return;
  }
  const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({
    ...localStorageData,
    ...obj,
  }));
}


function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
}


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
      saveInLocalStorage({ currRound: 0 });
      return { data: 0, fromLocStor: false };
    }
  });


  const [playWinGameSound] = useSound(winGameSound, { volume: soundVolume.data });
  const [playDrawGameSound] = useSound(drawGameSound, { volume: soundVolume.data });
  const [playLoseGameSound] = useSound(loseGameSound, { volume: soundVolume.data });

  const resetGame = () => {
    SetStarted({ data: true, fromLocStor: false });
    SetRoundOver({ data: false, fromLocStor: false });
    SetFirstPlayerScore({ data: 0, fromLocStor: false });
    SetSecondPlayerScore({ data: 0, fromLocStor: false });
    SetFirstPlayerTurn({ data: true, fromLocStor: false });
    SetFirstUserChoice({ data: null, fromLocStor: false });
    SetSecondUserChoice({ data: null, fromLocStor: false });
    SetCurrRound({ data: 1, fromLocStor: false });
  }


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
      // Определяем победителя игры
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
          if (useSounds.data) {
            playWinGameSound();
          }
        } else {
          SetSecondPlayerScore({ data: secondPlayerScore.data + 1, fromLocStor: false });
          if (useSounds.data) {
            playLoseGameSound();
          }
        }
      };
      determineWinner();

      // Завершаем очередной раунд игры
      SetRoundOver({ data: true, fromLocStor: false });
      setStartMakingComputerChoice({ data: false, fromLocStor: false });
      /*
      if (currRound >= MAX_ROUNDS_PER_GAME) {
        if (last10GameResults.length < MAX_GAMES_LOG) {
          SetLast10GameResults([...last10GameResults, `{${firstPlayerScore}:${secondPlayerScore}}`]);
        } else {
          const newArr = last10GameResults;
          newArr.shift();
          SetLast10GameResults([...newArr, `{${firstPlayerScore}:${secondPlayerScore}}`]);
        }
        // завершаем игру
        SetStarted(false);
      }*/
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


  return (
    <div className='game-area'>
      <div className='score-area'>
        {firstPlayerScore.data} : {secondPlayerScore.data}
        <br/>
        <span className="curr-round">Раунд {currRound.data} из {MAX_ROUNDS_PER_GAME}</span>
      </div>

      <div className='choice-btns-area'>

        <div>
          <div>
            {started.data && firstPlayerTurn.data && 'Your choice:'}
          </div>
          <OneUserGameArea
            userCanMakeChoice={started.data && !roundOver.data && firstPlayerTurn.data}
            setUserChoice={(value) => {
              SetFirstUserChoice({ data: value, fromLocStor: false });
            }}
            userChoice={firstUserChoice.data}
            playsComputer={false}
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
          />
        </div>

      </div>

      <div className='game-btns-area'>

        <div>

        <div>
          <button
            onClick={() => {
              resetGame();
            }}
           >
            New game
          </button>

          <button disabled={!started.data || (started.data && !roundOver.data)}
            onClick={() => {
              SetFirstUserChoice({ data: null, fromLocStor: false });
              SetSecondUserChoice({ data: null, fromLocStor: false });
              SetRoundOver({ data: false, fromLocStor: false });
              SetFirstPlayerTurn({ data: true, fromLocStor: false });
              SetCurrRound({ data: currRound.data + 1, fromLocStor: false });
            }}
           >
            Continue
          </button>
        </div>

        <div className="prompts-block" id="blink">
          {!started.data && 'To start, press "New game" button'}
          {started.data && !roundOver.data && 'Press "New game" to restart'}
          {started.data && roundOver.data && 'Press "Continue" to continue or "New game" to restart'}
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
            <button className="sound-btn"
                    onClick={() => SetUseSounds({ data: false, fromLocStor: false })}
            >
            </button>
          }
          { !useSounds.data &&
            <button className="no-sound-btn"
                    onClick={() => SetUseSounds({ data: true, fromLocStor: false })}
            >
            </button>
          }
          </div>

        </div>

        <div className="game-res">
          {`Last 10 game results: ${last10GameResults.data.join('; ')}`}
        </div>

        <div className="clear-res">
          <button
            onClick={() => {
              SetLast10GameResults({ data: [], fromLocStor: false });
            }}
          >
            Clear last 10 game results
          </button>
        </div>

      </div>

    </div>
  );
};
