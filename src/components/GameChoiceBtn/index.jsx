import React, { useEffect, useRef } from 'react';

import './styles.css';
import '../Game/animate.min.css';


export const BtnKinds = Object.freeze({
  rock: 0,
  scissors: 1,
  paper: 2,
});


export const GameChoiceBtn = (props) => {
  const {
    btnKind,    // вид игровой кнопки (камень / ножницы / бумага)
    isBlocked,  // можно / нельзя нажимать на кнопку
    btnClicked, // callback, срабатывающий при нажатии на кнопку (без параметров)
    selected,   // true (выбрана пользователем) / false (не выбрана пользователем)
    lose,       // true (проигравший выбор пользователя) / false (выбор - еще - не проиграл)
    acceptKeyboardEvents,
  } = props;

  const btnRef = useRef();


  const getBtnClassNames = () => {
    let str = 'game-choice-btn';
    if (!isBlocked) {
      str += ' blink';
    }
    if (selected) {
      if (!lose) {
        str += ' selected-btn';
      } else {
        str += ' lose-btn';
      }
    }
    switch (btnKind) {
      case BtnKinds.rock:
        str += ' rock-btn';
        break;
      case BtnKinds.scissors:
        str += ' scissors-btn';
        break;
      case BtnKinds.paper:
        str += ' paper-btn';
        break;
      default:
        break;
    }
    return str;
  }


  const onBtnClick = () => {
    if (!isBlocked) {
      btnClicked();
    }
  };


  useEffect(() => {
    const onKeyPress = (event) => {
      if (((btnKind === BtnKinds.rock) && (event.key === 'r')) ||
          ((btnKind === BtnKinds.scissors) && (event.key === "s")) ||
          ((btnKind === BtnKinds.paper) && (event.key === "p"))) {
        btnRef.current.click();
      }
    };

    if (acceptKeyboardEvents) {
      window.addEventListener('keydown', onKeyPress);
    }

    return () => {
      if (acceptKeyboardEvents) {
        window.removeEventListener('keydown', onKeyPress);
      }
    };
  }, []);


  return (
    <div className={selected ? 'animate__animated animate__flip' : ''}>
      <button ref={btnRef}
        className={getBtnClassNames()}
        onClick={onBtnClick}
      >
      </button>
    </div>
  );
};
