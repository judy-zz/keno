(function() {
  window.game = {
    generateAnswer: function() {
      var answer_num, possible_slots, slot;
      possible_slots = (function() {
        var _i, _len, _ref, _results;
        _ref = window.game.grid;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slot = _ref[_i];
          if (slot.answer !== "answer") {
            _results.push(slot);
          }
        }
        return _results;
      })();
      answer_num = Math.floor(Math.random() * (possible_slots.length + 1));
      return window.game.grid[possible_slots[answer_num].txt - 1].answer = "answer";
    }
  };
  $(document).ready(function() {
    var num, slot;
    window.game.grid = (function() {
      var _results;
      _results = [];
      for (num = 1; num <= 80; num++) {
        _results.push(slot = {
          txt: num,
          spot: "",
          answer: ""
        });
      }
      return _results;
    })();
    $("#slotTemplate").template("slotTemplate");
    return $('#grid').link(window.game.grid, 'slotTemplate').on("click", ".slot", function(event) {
      var spotted;
      spotted = window.game.grid[$(this).attr("number") - 1].spot === "spot" ? "" : "spot";
      return window.game.grid[$(this).attr("number") - 1].spot = spotted;
    });
  });
}).call(this);
