let vm = new Vue({
  el: "#app",
  data() {
    return {
      voicePitch: 1.5,
      phrase: 'whatever...',
      clearButtonVisible: false,
    }
  },
  
  methods: {
    speakPhrase() {
      let utterance = new SpeechSynthesisUtterance(this.phrase);
      
      utterance.pitch = this.voicePitch
      
      window.speechSynthesis.speak(utterance)
     
      let vm = this;
      utterance.onstart = function() {
        vm.animateMouth(true);
      }
      
      utterance.onend = function() {
        vm.animateMouth(false);
      }
    },
    
    showClearButton() {
      if(this.phrase != '') {
        this.clearButtonVisible = true;
      } else {
        this.clearButtonVisible = false;
      }
    },
    
    clearInput() {
      if(this.phrase != '') {
        this.phrase = '';
        this.clearButtonVisible = false;
      }
    },
    
    animateMouth(bool) {
      if(bool) {
        TweenMax.to('.line' , 0.25, {
          scaleY: 5.5,
          backgroundColor: '#0e4871',
          yoyo: true,
          repeat: -1,
          ease: Power4.ease,
        });
      } else {
        TweenMax.to('.line' , 0.2, {
          scaleY: 1,
          backgroundColor: '#4cff05',
          repeat: 0,
          yoyo: false,
        });
      }
    }
  },

  created() {
    this.animateMouth(true);
  }
});