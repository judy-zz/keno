window.game =
  generateAnswer: ->
    possible_slots = (slot for slot in window.game.grid when slot.answer != "answer")
    answer_num = Math.floor(Math.random() * (possible_slots.length + 1))
    window.game.grid[possible_slots[answer_num].txt - 1].answer = "answer"

$(document).ready ->
  window.game.grid = for num in [1..80]
    slot = 
      txt: num
      spot: ""
      answer: ""

  $("#slotTemplate").template("slotTemplate")
  
  $('#grid')
    .link(window.game.grid, 'slotTemplate')
    .on "click", ".slot", (event) ->
      spotted = if window.game.grid[$(this).attr("number") - 1].spot == "spot" then "" else "spot"
      window.game.grid[$(this).attr("number") - 1].spot = spotted

  # $('.slot').click ->
  #   $(this).children().toggleClass("spot")
  
