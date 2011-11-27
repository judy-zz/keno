(function() {
  $(document).ready(function() {
    var num, slot;
    window.grid = (function() {
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
    $('#game').html($('#slotTemplate').render(window.grid));
    $('.slot').click(function() {
      return $(this).children().toggleClass("spot");
    });
    return {
      generateAnswers: function() {
        var num, _results;
        _results = [];
        for (num = 1; num <= 20; num++) {
          _results.push((function() {
            var answer_num, answer_slot, possible_slots, slot;
            possible_slots = (function() {
              var _i, _len, _ref, _results2;
              _ref = window.grid;
              _results2 = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                slot = _ref[_i];
                if (slot.answer !== "answer") {
                  _results2.push(slot);
                }
              }
              return _results2;
            })();
            answer_num = Math.floor(Math.random() * (possible_slots.length + 1));
            answer_slot = possible_slots[answer_num];
            return answer_slot.answer = "answer";
          })());
        }
        return _results;
      }
    };
  });
}).call(this);
