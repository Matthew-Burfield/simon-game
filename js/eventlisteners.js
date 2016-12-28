const eventListenerModule = (function () {
 
  // privates
 
  const gameSquares = document.querySelectorAll('.game-square');
  const flashDisplay = document.querySelector('.score-container p.off');
  const startBtn = document.getElementById('start-btn');
  const strictBtn = document.getElementById('strict-btn');
 
  // Return an object exposed to the public
  return {
    turnOffGameSquares: function(handler) {
      gameSquares.forEach(gameSquare => gameSquare.classList.remove('clickable'));
      gameSquares.forEach(gameSquare => gameSquare.removeEventListener('click', handler));
    },

    turnOnGameSquares: function(handler) {
      gameSquares.forEach(gameSquare => gameSquare.classList.add('clickable'));
      gameSquares.forEach(gameSquare => gameSquare.addEventListener('click', handler));
    },

    enableStartAndStrictButtons: function(startHandler, strictHandler) {
      startBtn.addEventListener('click', startHandler);
      strictBtn.addEventListener('click', strictHandler);
    },

    disableStartAndStrictButtons: function(startHandler, strictHandler) {
      startBtn.removeEventListener('click', startHandler);
      strictBtn.removeEventListener('click', strictHandler);
      startBtn.classList.remove('light-on');
      strictBtn.classList.remove('light-on');
    },

    addGameAnimationEndEvents: function(animationEndHandler) {
      gameSquares.forEach(gameSquare => gameSquare.addEventListener('animationend', animationEndHandler));
    },

    addErrorAnimationEndEvent: function(animationEventHandler) {
      flashDisplay.addEventListener('animationend', animationEventHandler);
    }
  };
})();