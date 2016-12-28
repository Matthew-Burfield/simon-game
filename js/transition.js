const transitionModule = (function () {
 
  // privates variables
 
  // Return an object exposed to the public
  return {

    removeTransitionClasses: function(el) {
      el.classList.remove('current');

      // // This line is to make the class remove and re-add so the transition will run again
      void el.offsetWidth;
    },

    addTransitionClasses: function(el) {
      el.classList.add('current');
    },

    commenceErrorDisplay: function(el) {
      el.classList.add('flash-error');
    },

    endErrorDisplay: function(el) {
      el.classList.remove('flash-error');
    }
  };
})();