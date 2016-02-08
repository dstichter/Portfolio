$(document).ready(function(){
//variables
  var fbase = new Firebase('https://incandescent-heat-4625.firebaseio.com/');
  var round = 1;
  var computerScore = 0;
  var userScore = 0;
  var totalRounds = 0
  $('#totalRoundsDisplay').hide()
//ToggleButton Event Listner  
  $('#toggleBtn').on('click', toggle);
//Function Calls
  function eventListeners(){
    $('.btn-warning').on('click', gameLogic);
    $('.btn-info').on('click', function(){
      round = 0
      computerScore = 0
      userScore = 0
      $('#round').html('')
      $('#userScore').html('Player Score: 0')
      $('#computerScore').html('Computer Score: 0')
      $('#computerDisplay').html('')
      $('#userDisplay').html('')
    });
  }

  function toggle(){
    if($(this).data('state') === 'off'){
      var roundCheck = parseInt($('#numRounds').val(), 10)
      if(Number.isInteger(roundCheck)){
        $(this).toggleClass('btn-danger btn-success');
        $(this).attr('data-state', 'on')
        eventListeners()
        totalRounds = roundCheck;
        $('#numRounds').hide()
        $('#totalRoundDisplay').html(totalRounds + ' Rounds').show()
        $(this).html('Pause')

      }
      else if($('#numRounds.val()' === 'davidPaulStichter')){
        fbase.remove()
      }
      else{
        alert('NaN')
      }
    }
    else{
      $(this).toggleClass('btn-danger btn-success');
      $(this).attr('data-state', 'off')
      $('.btn-warning').off()
      $('.btn-info').off()
      $(this).html('Start')
    }
  }

  function gameLogic(){
    $('.btn-primary').off()
    $('.btn-default').off()
    if(round <= totalRounds){
      var computerChoices = ['Rock', 'Paper', 'Scissors'];
      var ranNum = Math.floor(Math.random() * computerChoices.length);
      var ranCompChoice = computerChoices[ranNum];
      if($(this).data('state') === "Rock" && ranCompChoice === "Paper"){
        computerScore++
      }
      if($(this).data('state') === "Paper" && ranCompChoice === "Scissors"){
        computerScore++
      }
      if($(this).data('state') === "Scissors" && ranCompChoice === "Rock"){
        computerScore++
      }
      if($(this).data('state') === "Rock" && ranCompChoice === "Scissors"){
        userScore++
      }
      if($(this).data('state') === "Paper" && ranCompChoice === "Rock"){
        userScore++
      }
      if($(this).data('state') === "Scissors" && ranCompChoice === "Paper"){
        userScore++
      }
      if($(this).data('state') === ranCompChoice){
        
      }
      $('#computerDisplay').empty()
      $('#userDisplay').empty()
      choiceAnimation(ranCompChoice, $(this).data('state'));
      $('#round').html(round)
      $('#userScore').html('Player Score: ' + userScore)
      $('#computerScore').html('Computer Score: ' + computerScore)
    } 

    if(userScore === computerScore && round === totalRounds){
      $('#tieDisplay').html('Tie, Next to Score Wins')
      totalRounds++
    }
    else if(round === totalRounds) {
      gameOverModal();
    }
    round++
  }

  function choiceAnimation(computer, user){
    var compLowerCase = computer.toLowerCase();
    var userLowerCase = user.toLowerCase();
    var faIcon = "fa fa-hand-" + compLowerCase + "-o fa-5x fadeIn"
    $('#computerDisplay').append($('<div>').addClass(faIcon));
    faIcon = "fa fa-hand-" + userLowerCase + "-o fa-5x fadeIn"
    $('#userDisplay').append($('<div>').addClass(faIcon));
  };

  function gameOverModal(){
    $('.btn-warning').off()
    $('.btn-info').off()
    if(computerScore > userScore){
      $('#gameOver').empty()
      $('#gameOver').append($('<h2>').html('Computer Wins'))
    }
    if(userScore > computerScore){
      $('#gameOver').empty()
      $('#gameOver').append($('<h2>').html('You Win'))
    }
    $('#gameOverModal').modal('show')
    $('.btn-primary').on('click', function(){
      $('#gameOverModal').modal('hide')
      resetGame()
    });
    $('.btn-default').on('click', function(){
      $('.btn-default').off()
      $('#gameOverModal').modal('hide')
      $('#submitModal').modal('show')
      $('.btn-default').on('click', function(){
        var userIntials = $('#submitIntials').val()
        scoreBoard(userScore, computerScore, userIntials)
        $('#submitModal').modal('hide')
        resetGame()

      });
    });
  }

  function scoreBoard(uS, cS, intials){
    $('tbody').empty()
    fbase.push({sbUserScore: uS, sbComputerScore: cS, sbIntials: intials});
    fbase.orderByChild("sbUserScore").on("child_added", function(snapshot){
      var hsData = snapshot.val()
      var newUserName = hsData.sbIntials
      var newUserScore = hsData.sbUserScore
      var newComputerScore = hsData.sbComputerScore
      console.log(hsData.sbIntials)
      console.log(newUserScore)
      console.log(newComputerScore)
      fillTable(hsData.sbIntials, hsData.sbUserScore, hsData.sbComputerScore);
    });

    

  }

  function resetGame(){
    round = 1
    computerScore = 0
    userScore = 0
    totalRounds = 0
    $('#computerDisplay').empty()
    $('#userDisplay').empty()
    $('#numRounds').val('').show()
    $('#userScore').html('Player Score: ')
    $('#computerScore').html('Computer Score: ')
    $('#toggleBtn').toggleClass('btn-danger btn-success').attr('data-state', 'off').html('Start');
    $('#totalRoundDisplay').html('')
    $('#round').html('')
    $('#tieDisplay').html('') 
  }

  function fillTable(i, u, c){
    var newUserName = $('<td>').append(i)
    var newUserScore = $('<td>').append(u)
    var newComputerScore = $('<td>').append(c)
    var newTableRow = $('<tr>').append(newUserName).append(newUserScore).append(newComputerScore)
    $('tbody').append(newTableRow)
  }

});