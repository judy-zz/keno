$(document).ready ->
  window.grid = for num in [1..80]
    slot = 
      txt: num
      spot: ""
      answer: ""
  
  $('#game').html($.render(window.grid, '#slotTemplate'))

  $('.slot').click ->
    $(this).children().toggleClass("spot")
  
  generateAnswers: ->
    for num in [1..20]
      do ->
        possible_slots = (slot for slot in window.grid when slot.answer != "answer")
        answer_num = Math.floor(Math.random() * (possible_slots.length + 1))
        answer_slot = possible_slots[answer_num]
        answer_slot.answer = "answer"

    
  
  