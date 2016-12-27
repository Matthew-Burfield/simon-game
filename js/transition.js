const transitionModule = (function () {
 
  // privates
 
  // var basket = [];
 
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

    removeTransitionClasses: function(el) {
      el.classList.remove('current');
      el.classList.remove('red-current');
      el.classList.remove('yellow-current');
      el.classList.remove('blue-current');
      el.classList.remove('green-current');

      // // This line is to make the class remove and re-add so the transition will run again
      void el.offsetWidth;
    },

    addTransitionClasses: function(el) {
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
  };
})();