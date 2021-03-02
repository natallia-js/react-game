import React, { useEffect, useRef } from 'react';
import { BtnKinds, GameChoiceBtn } from '../GameChoiceBtn';

import './styles.css';


export const OneUserGameArea = (props) => {
  const {
    userCanMakeChoice,
    setUserChoice,
    userChoice,
    playsComputer,
    startMakingComputerChoice,
    choiceLose,
    acceptKeyboardEvents,
  } = props;

  const btnsAreaRef = useRef();


  useEffect(() => {
    const checkIfUserCanClick = (event) => {
      // Не даем пользователю нажимать на кнопки, если в этой области играет комп
      if (playsComputer) {
        event.stopPropagation();
      }
    }

    btnsAreaRef.current.addEventListener('click', checkIfUserCanClick);

    return () => {
      if (btnsAreaRef.current) {
        btnsAreaRef.current.removeEventListener('click', checkIfUserCanClick);
      }
    }
  }, []);


  const userMadeChoice = (choice) => {
    setUserChoice(choice);
  };


  useEffect(() => {
    if (!startMakingComputerChoice) {
      return;
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    userMadeChoice(getRandomInt(3));

}, [startMakingComputerChoice]);


  return (
    <div className="btns-area" ref={btnsAreaRef}>
      <div className="top-block">
        <GameChoiceBtn
          btnKind={BtnKinds.rock}
          isBlocked={!userCanMakeChoice}
          btnClicked={() => userMadeChoice(BtnKinds.rock)}
          selected={userChoice === BtnKinds.rock}
          lose={(userChoice === BtnKinds.rock) && choiceLose}
          acceptKeyboardEvents={acceptKeyboardEvents}
        />
        <GameChoiceBtn
          btnKind={BtnKinds.scissors}
          isBlocked={!userCanMakeChoice}
          btnClicked={() => userMadeChoice(BtnKinds.scissors)}
          selected={userChoice === BtnKinds.scissors}
          lose={(userChoice === BtnKinds.scissors) && choiceLose}
          acceptKeyboardEvents={acceptKeyboardEvents}
        />
      </div>
      <div className="bottom-block">
        <GameChoiceBtn
          btnKind={BtnKinds.paper}
          isBlocked={!userCanMakeChoice}
          btnClicked={() => userMadeChoice(BtnKinds.paper)}
          selected={userChoice === BtnKinds.paper}
          lose={(userChoice === BtnKinds.paper) && choiceLose}
          acceptKeyboardEvents={acceptKeyboardEvents}
        />
      </div>
    </div>
  );
};
