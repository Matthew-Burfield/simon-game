'use strict';

let gameArray = [];
let playerTurn = false;
let gameIterator = '';
// test gameArray
  //gameArray = [4,4,3,2,1];
let count = 0;

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

function startGame() {
  gameArray = [];
  count = 0;
  setupComputerTurn();
}

function computerSequence() {
  let currIterator = gameIterator.next();

  if (!currIterator.done) {
    //console.log(`The value is ${gameIterator.next().value} at ${new Date()}`);
    //document.querySelector('.nextMove').innerHTML = "Players Move";
    const el = document.querySelector(`.game-square[data-key="${currIterator.value}"]`);
    if (el.classList.contains('green')) {
      el.classList.add('green-current');
    } else if (el.classList.contains('blue')) {
      el.classList.add('blue-current');
    } else if (el.classList.contains('yellow')) {
      el.classList.add('yellow-current');
    } else if (el.classList.contains('red')) {
      el.classList.add('red-current');
    }
    el.classList.add('current');
  }
  if (currIterator.done) {
    setupPlayerTurn();
  }
}

function checkPlayerSequence(e) {
  let currIterator = gameIterator.next();

  if (!currIterator.done) {
    //The iterator isn't done, so check that the item clicked is the right one for the sequence.
    if (Number(e.currentTarget.getAttribute('data-key')) !== currIterator.value) {
      // We have the wrong value. Alert the player and restart the game
      document.querySelector('.player-selection').innerHTML = 'You have failed!!';
    } else {
      document.querySelector('.player-selection').innerHTML = 'Good, next selection';
    }
  }
  if (currIterator.last) {
    setupComputerTurn();
  }
}

// function addTransition(e) {
//   this.classList.add('current');
// }

function handleTransitionEndEvent(e) {
  this.classList.remove('current');
  this.classList.remove('red-current');
  this.classList.remove('yellow-current');
  this.classList.remove('blue-current');
  this.classList.remove('green-current');
  
  // // This line is to make the class remove and re-add so the transition will run again
  void this.offsetWidth;
  
  /* We only want to call computerSequence once per element.
     Without this condition, transitionend is called for each transition
     I.e. transitions for width, height, color, size etc */
  
  if (playerTurn) {
    checkPlayerSequence(e);
  } else {
    if (e.propertyName === "background-color") {
      computerSequence();
    }
  }
}

function setupComputerTurn() {
  playerTurn = false;
  const gameSquares = document.querySelectorAll('.game-square');
  gameSquares.forEach(gameSquare => gameSquare.classList.remove('clickable'));
  gameSquares.forEach(gameSquare => gameSquare.removeEventListener('click', handleTransitionEndEvent));
  document.querySelector('.player-turn').innerHTML = "Computers Turn";

  const nextMove = Math.floor(Math.random() * 4 + 1); // Pick a random number between 1 and 4.
  gameArray.push(nextMove);
  gameIterator = gameArrayIterator(gameArray);
  computerSequence();
}

function setupPlayerTurn() {
  playerTurn = true;
  const gameSquares = document.querySelectorAll('.game-square');
  // gameSquares.forEach(gameSquare => gameSquare.removeEventListener('transitionend', handleTransitionEndEvent));
  gameSquares.forEach(gameSquare => gameSquare.classList.add('clickable'));
  gameSquares.forEach(gameSquare => gameSquare.addEventListener('click', handleTransitionEndEvent));
  document.querySelector('.player-turn').innerHTML = "Players Turn";
  gameIterator = gameArrayIterator(gameArray);
  
}

const gameSquares = document.querySelectorAll('.game-square');
//gameSquares.forEach(gameSquare => gameSquare.addEventListener('click', addTransition));
gameSquares.forEach(gameSquare => gameSquare.addEventListener('transitionend', handleTransitionEndEvent));

document.querySelector('.nextMove').addEventListener('click', setupComputerTurn);

//startGame();
