import React from 'react';

import './styles.css';


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
  } = props;

  const getBtnClassNames = () => {
    let str = 'game-choice-btn';
    if (!isBlocked) {
      str += ' blink';
    }
    if (selected) {
      str += ' selected-btn';
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

  return (
    <button
      className={getBtnClassNames()}
      onClick={() => {
        if (!isBlocked) {
          btnClicked();
        }}
      }
    >
    </button>
  );
};
