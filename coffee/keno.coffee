$(document).ready ->
  window.grid = for num in [1..80]
    slot = 
      txt: num
      spot: ""
      answer: ""

  $("#slotTemplate").template("slotTemplate")
  
  $('#grid')
    .link(window.grid, 'slotTemplate')
    .on "click", ".slot", (event) ->
      spotted = if window.grid[$(this).attr("number") - 1].spot == "spot" then "" else "spot"
      window.grid[$(this).attr("number") - 1].spot = spotted
      console.log window.grid[$(this).attr("number") - 1].spot
      console.log spotted

  # $('.slot').click ->
  #   $(this).children().toggleClass("spot")
  
generateAnswers: ->
  for num in [1..20]
    do ->
      possible_slots = (slot for slot in window.grid when slot.answer != "answer")
      answer_num = Math.floor(Math.random() * (possible_slots.length + 1))
      answer_slot = possible_slots[answer_num]
      answer_slot.answer = "answer"

    
  
  