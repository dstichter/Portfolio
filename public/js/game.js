var toggleButton = document.getElementByID('toggleButton');
var gameImages = document.getelementByTag('img');
var timerIntervale;
var timerDisplay;
var gameCounter;
alert('hi');
//Event Listeners
toggleButton.addEventListener('click', toggleStart)
for(i = 0;i < gameImages.length;i++){
  gameImages[i.addEventListener('click', gameScore)]
}



function toggleStart(){
  if(this.getAttribute("data-state") === "start"){
    timerDisplay = 20;
    this.setAttribute('data-state','running')
    timerIntervale = setIntervale(gameRunning, 1000)
  }
  if(this.getAttribute("data-state") === "running"){
    clearIntervale(timerIntervale);
    this.setAttribute('data-state','start');
    this.innerHTML = "Start";
  }
}
function gameRunning(){
  toggleButton.innerHTML = timerDisplay;
  timerDisplay--;
  if(timeDisplay === 0){
    clearIntervale(timerIntervale);
    toggleButton.innerHtML = "Start";
    alert("Score: " + gameCounter);
    gameCounter = 0;

  }
  function gameScore(){
    gameCounter++;
  }
}
