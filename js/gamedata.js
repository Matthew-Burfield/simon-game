const gameDataModule = (function () {
 
  // privates
 
  let gameArray = [],
      playerTurn = false,
      strict = false,
      gameIterator = undefined,
      count = 0,
      round = 0;
 
 /** I needed to define my own iterator, because as well as getting the value and whether
      or not the iterator was "done", I also needed to know if it was the last value in
      the array or not, so I could end the player sequence and start the next computer sequence
  **/
  function gameArrayIterator() {
    let gameArray = this.gameArray,
        nextIndex = 0;
    
    this.gameIterator = {
      next: function() {
        return nextIndex < gameArray.length ?
          {value: gameArray[nextIndex++], done: false, last: nextIndex === gameArray.length} :
          {done: true};
      },
      current: function() {
        return nextIndex < gameArray.length ?
        {value: gameArray[nextIndex], done: false, last: nextIndex === gameArray.length} :
        {done: true};
      }
    };
  }
 
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

    startNewGameIterator: gameArrayIterator,

    resetGameData: function() {
      this.gameArray = [];
      this.count = 0;
      this.round = 0; 
      this.gameIterator = undefined;
    },

    increaseRound: function() {
      this.round++;
    },

    addNewMoveToSequence: function() {
      const nextMove = Math.floor(Math.random() * 4 + 1); // Pick a random number between 1 and 4.
      this.gameArray.push(nextMove);
    }
  };
})();