(function() {
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  Array.prototype.shuffle = function() {
    return this.sort(function() {
      return 0.5 - Math.random();
    });
  };
  window.game = {
    fixedAnswers: function() {
      return [1, 12, 29, 42, 57, 68];
    },
    generateAnswers: function() {
      var answer_num, number, possible_answers, _ref;
            if ((_ref = this.answers) != null) {
        _ref;
      } else {
        this.answers = window.game.fixedAnswers();
      };
      while (this.answers.length < 20) {
        possible_answers = (function() {
          var _results;
          _results = [];
          for (number = 1; number <= 80; number++) {
            if (__indexOf.call(this.answers, number) < 0) {
              _results.push(number);
            }
          }
          return _results;
        }).call(this);
        answer_num = Math.floor(Math.random() * possible_answers.length);
        this.answers.push(possible_answers[answer_num]);
      }
      return this.answers = this.answers.shuffle();
    },
    displayAnswers: function() {
      var answer, _i, _len, _ref, _results;
      _ref = this.answers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        answer = _ref[_i];
        _results.push(window.game.displayAnswer(answer));
      }
      return _results;
    },
    displayAnswer: function(number) {
      return $.observable(window.game.grid[number - 1]).setProperty("answer", true);
    },
    displayWinnerMessage: function() {
      return alert("You won!");
    },
    slotClass: function(answer, spot) {
      if (answer) {
        if (spot) {
          return "slot good-answer";
        } else {
          return "slot bad-answer";
        }
      } else {
        if (spot) {
          return "slot spot";
        } else {
          return "slot";
        }
      }
    },
    spotClass: function(spot) {
      if (spot) {
        return "spot";
      } else {
        return "";
      }
    },
    totalSpots: function() {
      var slot;
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = window.game.grid;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slot = _ref[_i];
          if (slot.spot === "spot") {
            _results.push(slot);
          }
        }
        return _results;
      })()).length;
    },
    machine: StateMachine.create({
      initial: 'betting',
      events: [
        {
          name: 'play',
          from: 'betting',
          to: 'playing'
        }, {
          name: 'win',
          from: 'playing',
          to: 'collection'
        }
      ],
      callbacks: {
        onbeforeplay: function() {
          if (window.game.totalSpots() !== 6) {
            alert("Please select exactly 6 spots.");
            return false;
          }
        },
        onplaying: function() {
          $('#play-button').removeClass('active').fadeOut();
          window.game.generateAnswers();
          return window.game.displayAnswers();
        },
        oncollection: function() {
          return window.game.displayWinnerMessage();
        }
      }
    })
  };
  $(document).ready(function() {
    var num, slot;
    window.game.grid = (function() {
      var _results;
      _results = [];
      for (num = 1; num <= 80; num++) {
        _results.push(slot = {
          number: num,
          spot: false,
          answer: false
        });
      }
      return _results;
    })();
    $("#slotTemplate").template("slotTemplate");
    $('#grid').link(window.game.grid, 'slotTemplate').on("click", ".slot", function(event) {
      var spotted;
      spotted = window.game.grid[$(this).attr("number") - 1].spot === "spot" ? "" : "spot";
      $.observable(window.game.grid[$(this).attr("number") - 1]).setProperty("spot", spotted);
      if (window.game.totalSpots() === 6) {
        return $('#play-button').addClass('active');
      } else {
        return $('#play-button').removeClass('active');
      }
    });
    return $('#play-button').on("click", function(event) {
      if (window.game.totalSpots() === 6) {
        return window.game.machine.play();
      }
    });
  });
}).call(this);
