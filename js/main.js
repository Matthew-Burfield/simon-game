'use strict';

function startBtnHandler(e) {
  gameReset();
  if (!e.currentTarget.classList.contains('light-on')) {
    document.querySelector('div.start').classList.add('light-on');
    setupComputerTurn(true);
  } else {
    document.querySelector('div.start').classList.remove('light-on');
    // Remove all event listeners
  }
}

function strictBtnHandler(e) {
  if (!e.currentTarget.classList.contains('light-on')) {
    gameDataModule.strict = true;
    document.querySelector('div.strict').classList.add('light-on');
  } else {
    gameDataModule.strict = false;
    document.querySelector('div.strict').classList.remove('light-on');
  }
}

function gameReset() {
  gameDataModule.resetGameData();
  eventListenerModule.turnOffGameSquares(playerTurnClick);
  document.querySelector('.score-container p.on').innerHTML = '';
}

function playerTurnClick(e) {
  transitionModule.addTransitionClasses(e.currentTarget);
}

function computerSequence() {
  if (gameDataModule.gameIterator) {
    const currIterator = gameDataModule.gameIterator.next();

    if (!currIterator.done) {
      const el = document.querySelector(`.game-square[data-key="${currIterator.value}"]`);
      transitionModule.addTransitionClasses(el);
    } else {
      setupPlayerTurn();
    }
  }
}

function checkPlayerSequence(e) {
  if (gameDataModule.gameIterator) {
    let currIterator = gameDataModule.gameIterator.next();

    if (!currIterator.done) { //The iterator isn't done, so check that the item clicked is the right one for the sequence.
      if (Number(e.currentTarget.getAttribute('data-key')) === currIterator.value) { 
        if (currIterator.last) {
          setupComputerTurn(true); // This is the last item in the gameArray; switch back to the computer sequence now.
        }
      } else {
        // Player has selected the wrong value.
        const flashDisplay = document.querySelector('.score-container p.off');
        transitionModule.commenceErrorDisplay(flashDisplay);
      }
    } // end if (!currIterator.done)
  } // end if(gameInterator) 
}

function errorAnimationHandler(e) {
  const flashDisplay = document.querySelector('.score-container p.off');
  transitionModule.endErrorDisplay(flashDisplay);
  if (gameDataModule.strict) {
    gameReset();
    document.querySelector('div.start').classList.remove('light-on');
  } else {
    setupComputerTurn(false);
  }
}

function gameButtonAnimationHandler(e) {
  transitionModule.removeTransitionClasses(this);
  if (e.animationName === "gameButtonPress") {
    if (gameDataModule.playerTurn) {
      checkPlayerSequence(e);
    } else { 
      computerSequence();
    }
  }
}

function setupComputerTurn(increaseLevel) {
  gameDataModule.playerTurn = false;
  gameDataModule.startNewGameIterator();
  if (increaseLevel) {
    gameDataModule.increaseRound();
    gameDataModule.addNewMoveToSequence();
  }
  eventListenerModule.turnOffGameSquares(playerTurnClick);
  document.querySelector('.score-container p.on').innerHTML = gameDataModule.round;
  computerSequence();
}

function setupPlayerTurn() {
  gameDataModule.playerTurn = true;
  eventListenerModule.turnOnGameSquares(playerTurnClick);
  gameDataModule.startNewGameIterator();
  
}

document.getElementById("on-off-switch").addEventListener('change', function(e) {
  
  if (e.currentTarget.checked) {
    eventListenerModule.enableStartAndStrictButtons(startBtnHandler, strictBtnHandler);
  } else {
    gameReset();
    eventListenerModule.disableStartAndStrictButtons(startBtnHandler, strictBtnHandler);
  }
});

eventListenerModule.addErrorAnimationEndEvent(errorAnimationHandler);
eventListenerModule.addGameAnimationEndEvents(gameButtonAnimationHandler);
