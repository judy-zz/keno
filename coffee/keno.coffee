window.game =
  generateAnswer: ->
    possible_slots = (slot for slot in window.game.grid when slot.answer != "answer")
    answer_num = Math.floor(Math.random() * (possible_slots.length + 1))
    $.observable(window.game.grid[possible_slots[answer_num].number - 1]).setProperty("answer", true)
  slotClass: (answer) ->
    if answer then "slot answer" else "slot"
  spotClass: (spot) ->
    if spot then "spot" else ""

$(document).ready ->
  window.game.grid = for num in [1..80]
    slot =
      number: num
      spot: false
      answer: false
  
  $("#slotTemplate").template("slotTemplate")
  
  $('#grid')
    .link(window.game.grid, 'slotTemplate')
    .on "click", ".slot", (event) ->
      spotted = if window.game.grid[$(this).attr("number") - 1].spot == "spot" then "" else "spot"
      $.observable(window.game.grid[$(this).attr("number") - 1]).setProperty("spot", spotted)

