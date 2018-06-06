document.getElementById("runInput").onclick = runInput;

function runInput(){
  if(isInputValid()){
    calculateKLargest();
    displayTextResult();
    createHeatMap();
  }
  else{
    alert("Incorrect Input");
  }
}

function createHeatMap(){
}

function displayTextResult(){
}

function calculateKLargest(){
}

function isInputValid(){
}
