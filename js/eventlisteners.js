const eventListenerModule = (function () {
 
  // privates
 
  // var basket = [];
  const gameSquares = document.querySelectorAll('.game-square');
  const flashDisplay = document.querySelector('.score-container p.off');
  const startBtn = document.getElementById('start-btn');
  const strictBtn = document.getElementById('strict-btn');
 
  // function privateFunction() {
  //   // do something
  // }
 
  // Return an object exposed to the public
  return {
 
    // // Add items to our basket
    // addItem: function( values ) {
    //   basket.push(values);
    // },
 
    // // Get the count of items in the basket
    // getItemCount: function () {
    //   return basket.length;
    // },
 
    // Public alias to a private function
    // doSomething: doSomethingPrivate,
 
    // Get the total value of items in the basket

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