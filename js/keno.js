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
      this.answers = [2, 5, 12, 16, 19, 21, 29, 31, 37, 38, 42, 44, 45, 50, 52, 65, 69, 71, 78, 80];
      return this.answers = this.answers.shuffle();
    },
    displayAnswers: function() {
      $.each(this.answers, function(i, answer) {
        return setTimeout((function() {
          return window.game.displayAnswer(answer);
        }), 300 * i);
      });
      return setTimeout((function() {
        return window.game.machine.win();
      }), 6000);
    },
    displayAnswer: function(number) {
      return $.observable(window.game.grid[number - 1]).setProperty("answer", true);
    },
    displayWinnerMessage: function() {
      $('#sound').html("<embed src='snd/slot_payoff.wav' hidden=true autostart=true loop=false>");
      return $('#winning-screen').css('z-index', '2').delay(1000).fadeIn();
    },
    pickedSpots: function() {
      var slot, _i, _len, _ref, _results;
      _ref = window.game.grid;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        slot = _ref[_i];
        if (slot.spot === "spot") {
          _results.push(slot.number);
        }
      }
      return _results;
    },
    activePlayButton: function() {
      var number;
      return window.game.totalSpots() === 6 && ((function() {
        var _i, _len, _ref, _results;
        _ref = window.game.pickedSpots();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          number = _ref[_i];
          if (__indexOf.call(window.game.fixedAnswers(), number) >= 0) {
            _results.push(number);
          }
        }
        return _results;
      })()).length === 6;
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
          $('#sound').html("<embed src='snd/button_click.wav' hidden=true autostart=true loop=false>");
          $('#play-button').removeClass('active').fadeOut();
          $('#grid').removeClass('active');
          window.game.generateAnswers();
          return window.game.displayAnswers();
        },
        oncollection: function() {
          $('#game').addClass('winning');
          $('#grid').addClass('winning');
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
      if (window.game.machine.is("betting")) {
        spotted = window.game.grid[$(this).attr("number") - 1].spot === "spot" ? "" : "spot";
        $.observable(window.game.grid[$(this).attr("number") - 1]).setProperty("spot", spotted);
        if (window.game.activePlayButton()) {
          return $('#play-button').addClass('active');
        } else {
          return $('#play-button').removeClass('active');
        }
      }
    });
    $('#play-button').on("click", function(event) {
      if (window.game.totalSpots() === 6) {
        $('#sound').html("<embed src='snd/button_click.wav' hidden=true autostart=true loop=false>");
        return window.game.machine.play();
      }
    });
    $('#sound').html("<embed src='snd/openingsound.wav' hidden=true autostart=true loop=false>");
    return $('#game').fadeIn(2000);
  });
}).call(this);
