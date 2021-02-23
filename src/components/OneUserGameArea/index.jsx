import React from 'react';
import { BtnKinds, GameChoiceBtn } from '../GameChoiceBtn';

import './styles.css';


export const OneUserGameArea = (props) => {
  const {
    userCanMakeChoice,
    setUserChoice,
    userChoice,
  } = props;


  return (
    <div className="btns-area">
      <div className="top-block">
        <GameChoiceBtn
          btnKind={BtnKinds.rock}
          isBlocked={!userCanMakeChoice}
          btnClicked={() => { setUserChoice(BtnKinds.rock) }}
          selected={userChoice === BtnKinds.rock}
        />
        <GameChoiceBtn
          btnKind={BtnKinds.scissors}
          isBlocked={!userCanMakeChoice}
          btnClicked={() => { setUserChoice(BtnKinds.scissors) }}
          selected={userChoice === BtnKinds.scissors}
        />
      </div>
      <div className="bottom-block">
        <GameChoiceBtn
          btnKind={BtnKinds.paper}
          isBlocked={!userCanMakeChoice}
          btnClicked={() => { setUserChoice(BtnKinds.paper) }}
          selected={userChoice === BtnKinds.paper}
        />
      </div>
    </div>
  );
};
