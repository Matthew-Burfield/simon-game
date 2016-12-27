const gameDataModule = (function () {
 
  // privates
 
  let gameArray = [],
      playerTurn = false,
      strict = false,
      gameIterator = undefined,
      count = 0,
      round = 0;
 
  function gameArrayIterator(){
    let nextIndex = 0;
    
    return {
       next: function(){
           return nextIndex < gameArray.length ?
               {value: gameArray[nextIndex++], done: false, last: nextIndex === gameArray.length} :
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

    newGameIterator: gameArrayIterator
  };
})();