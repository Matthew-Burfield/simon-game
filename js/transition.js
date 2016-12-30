const transitionModule = (function () {
 
  // privates variables
  
  // Return an object exposed to the public
  return {

    removeTransitionClasses: function(el) {
      el.classList.remove('current');

      // // This line is to make the class remove and re-add so the transition will run again
      void el.offsetWidth;
    },

    removeAllAnimationClasses: function() {
      const gameSquares = document.querySelectorAll('.game-square');
      gameSquares.forEach(gameSquare => {
        gameSquare.classList.remove('current')
        // // This line is to make the class remove and re-add so the transition will run again
        void gameSquare.offsetWidth;
      });

      
    },

    addTransitionClasses: function(el) {
      const audio = document.querySelector(`audio[data-key="${el.getAttribute('data-key')}"]`);
      if (!el.classList.contains('current')) {
        el.classList.add('current');
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
      }
    },

    commenceErrorDisplay: function(el) {
      const audio = document.getElementById('sound-error');
      if (!el.classList.contains('flash-error')) {
        el.classList.add('flash-error');
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
      }
    },

    endErrorDisplay: function(el) {
      el.classList.remove('flash-error');
    }
  };
})();