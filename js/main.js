'use strict';

let gameArray = [];
let playerTurn = false;
let strict = false;
let gameIterator = undefined;
let count = 0;
let round = 0;

/** I needed to define my own iterator, because as well as getting the value and whether
      or not the iterator was "done", I also needed to know if it was the last value in
      the array or not, so I could end the player sequence and start the next computer sequence
**/
function gameArrayIterator(array){
    var nextIndex = 0;
    
    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false, last: nextIndex === array.length} :
               {done: true};
       }
    };
}

function startBtnHandler(e) {
  gameReset();
  if (!e.currentTarget.classList.contains('light-on')) {
    document.querySelector('div.start').classList.add('light-on');
    setupComputerTurn();
  } else {
    document.querySelector('div.start').classList.remove('light-on');
    // Remove all event listeners
  }
}

function strictBtnHandler(e) {
  if (!e.currentTarget.classList.contains('light-on')) {
    strict = true;
    document.querySelector('div.strict').classList.add('light-on');
  } else {
    strict = false;
    document.querySelector('div.strict').classList.remove('light-on');
  }
}

function gameReset() {
  gameArray = [], count = 0, round = 0, gameIterator = undefined;
  eventListenerModule.turnOffGameSquares(playerTurnClick);
  document.querySelector('.score-container p.on').innerHTML = '';
}

function playerTurnClick(e) {
  const el = e.currentTarget;
  transitionModule.addTransitionClasses(el);
}

function computerSequence() {
  if (gameIterator) {
    let currIterator = gameIterator.next();

    if (!currIterator.done) {
      const el = document.querySelector(`.game-square[data-key="${currIterator.value}"]`);
      transitionModule.addTransitionClasses(el);
    }
    if (currIterator.done) {
      setupPlayerTurn();
    }
  }
}

function checkPlayerSequence(e) {
  if (gameIterator) {
    let currIterator = gameIterator.next();

    if (!currIterator.done) {
      //The iterator isn't done, so check that the item clicked is the right one for the sequence.
      if (Number(e.currentTarget.getAttribute('data-key')) === currIterator.value) {
        // This is the last item in the gameArray, so we can switch back to the computer sequence now.
        // Otherwise, we don't need to do anything as we're just waiting for another click event
        if (currIterator.last) {
          setupComputerTurn();
        }
      } else {
        // Player has selected the wrong value.

        // if strict mode, end game. If not strict mode, show error on display, then repeat current computer sequence.
        if (strict) {
          // Game over, flash !! on screen three times. Turn off start button light, and resetGame()
          gameReset();
          displayError();
          document.querySelector('div.start').classList.remove('light-on');
        } else {
          // Incorrect sequence. flash !! on screen three times. Repeat current computer sequence
          displayError();
          setTimeout(function() { setupComputerTurn() }, 1400);
        } // end if (strict)
      } // end if (Number(e.currentTarget.getAttribute('data-key')) === currIterator.value)
    } // end if (!currIterator.done)
  } // end if(gameInterator) 
}

function displayError() {
  const displayNum = document.querySelector('.score-container p.on');
  const interval = 200; //milliseconds
  setTimeout(function(){ displayNum.innerHTML = "" }, 1 * interval);
  setTimeout(function(){ displayNum.innerHTML = "00" }, 2 * interval);
  setTimeout(function(){ displayNum.innerHTML = "" }, 3 * interval);
  setTimeout(function(){ displayNum.innerHTML = "00" }, 4 * interval);
  setTimeout(function(){ displayNum.innerHTML = "" }, 5 * interval);
  setTimeout(function(){ displayNum.innerHTML = "00" }, 6 * interval);
  setTimeout(function(){ displayNum.innerHTML = "" }, 7 * interval);
  if (!strict) {
    setTimeout(function(){ displayNum.innerHTML = round }, 6 * interval);
  }
}

function handleTransitionEndEvent(e) {
  transitionModule.removeTransitionClasses(this);
  
  /* We only want to call computerSequence once per element.
     Without this condition, transitionend is called for each transition
     I.e. transitions for width, height, color, size etc */
  
  if (e.animationName === "gameButtonPress") {
    if (playerTurn) {
      checkPlayerSequence(e);
    } else { 
      computerSequence();
    }
  }
}

function setupComputerTurn() {
  playerTurn = false;
  round++;
  
  document.querySelector('.score-container p.on').innerHTML = round;
  eventListenerModule.turnOffGameSquares(playerTurnClick);

  const nextMove = Math.floor(Math.random() * 4 + 1); // Pick a random number between 1 and 4.
  gameArray.push(nextMove);
  gameIterator = gameArrayIterator(gameArray);
  computerSequence();
}

function setupPlayerTurn() {
  playerTurn = true;
  eventListenerModule.turnOnGameSquares(playerTurnClick);
  gameIterator = gameArrayIterator(gameArray);
  
}

document.getElementById("on-off-switch").addEventListener('change', function(e) {
  
  if (e.currentTarget.checked) {
    eventListenerModule.enableStartAndStrictButtons(startBtnHandler, strictBtnHandler);
  } else {
    gameReset();
    eventListenerModule.disableStartAndStrictButtons(startBtnHandler, strictBtnHandler);
  }
});

eventListenerModule.addTransitionEndEvent(handleTransitionEndEvent);
