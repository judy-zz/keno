Array::shuffle = -> @sort -> 0.5 - Math.random()

window.game =
  fixedAnswers: ->
   [1, 12, 29, 42, 57, 68]
  generateAnswers: ->
    @answers ?= window.game.fixedAnswers()
    while @answers.length < 20
      possible_answers = (number for number in [1..80] when number not in @answers)
      answer_num = Math.floor(Math.random() * (possible_answers.length))
      @answers.push possible_answers[answer_num]
    @answers = @answers.shuffle()
  displayAnswers: ->
    $.each @answers, (i, answer) ->
      setTimeout (-> window.game.displayAnswer(answer)), 300 * i
    setTimeout (-> window.game.machine.win()), 6000 # 300 * 20 answers
  displayAnswer: (number) ->
    $.observable(window.game.grid[number - 1]).setProperty("answer", true)
  displayWinnerMessage: ->
    $('#winning-screen').css('z-index', '2').delay(1000).fadeIn()
  slotClass: (answer, spot) ->
    if answer
      if spot 
        "slot good-answer"
      else
        "slot bad-answer"
    else
      if spot
        "slot spot"
      else
        "slot"
  spotClass: (spot) ->
    if spot then "spot" else ""
  totalSpots: ->
    (slot for slot in window.game.grid when slot.spot == "spot").length
  machine: StateMachine.create {
    initial: 'betting'
    events:
      [
        { name: 'play', from: 'betting', to: 'playing' }
        { name: 'win',  from: 'playing', to: 'collection' }
      ]
    callbacks:
      onbeforeplay: ->
        if window.game.totalSpots() != 6
          alert("Please select exactly 6 spots.")
          return false
      onplaying: ->
        $('#play-button').removeClass('active').fadeOut()
        $('#grid').removeClass('active')
        window.game.generateAnswers()
        window.game.displayAnswers()
      oncollection: ->
        # set cookie
        $('#game').addClass('winning')
        $('#grid').addClass('winning')
        window.game.displayWinnerMessage()
  }

$(document).ready ->

  window.game.grid = for num in [1..80]
    slot =
      number: num
      spot: false
      answer: false
  
  $("#slotTemplate").template("slotTemplate")
  
  # IF GAME HAS ALREADY BEEN PLAYED VIA COOKIE
  #   window.game.machine.win()
  # else

  $('#grid')
    .link(window.game.grid, 'slotTemplate')
    .on "click", ".slot", (event) ->
      if window.game.machine.is("betting")
        spotted = if window.game.grid[$(this).attr("number") - 1].spot == "spot" then "" else "spot"
        $.observable(window.game.grid[$(this).attr("number") - 1]).setProperty("spot", spotted)
        if window.game.totalSpots() == 6
          $('#play-button').addClass('active')
        else
          $('#play-button').removeClass('active')
  
  $('#play-button')
    .on "click", (event) ->
      if window.game.totalSpots() == 6
        window.game.machine.play()

  $('#game').fadeIn(2000)

  

  
