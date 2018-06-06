document.getElementById("runInput").onclick = runInput;

var arr;
var formattedInpArr;
var calculatedInpArr;
var outputJSON;

function runInput(){
  if(isInputValid()){
    document.getElementById("textResult").innerHTML = "";
    Plotly.purge("heatMap");
    calculateKLargest();
    displayTextResult();
    createHeatMap();
  }
  else{
    alert("Incorrect Input");
  }
}

function createHeatMap(){
  const data = [
    {
      z: calculatedInpArr,
      type: 'heatmap'
    }
  ];
  Plotly.plot('heatMap', data);
  document.getElementById('heatMap').on('plotly_click', data => alert(`(${data.points[0].x} ,  ${data.points[0].y}  score: ${data.points[0].z}`));
}

function displayTextResult(){
  let K = parseInt(arr[0]);
  const currentDiv = document.getElementById("textResult");
  let newDiv, newTextNode;
  for(let i = 0; i < K; i++){
    // create a new div element
    newDiv = document.createElement("div");
    newTextNode = document.createTextNode(`( ${outputJSON[i].x },   ${outputJSON[i].y}  score:  ${outputJSON[i].sum} )`);
    newDiv.appendChild(newTextNode);
    // add the newly created element and its content into the DOM
    currentDiv.appendChild(newDiv);
  }
}

function calculateKLargest(){
  let n = parseInt(arr[1]);
  //convert input 1D array to 2D array
  formattedInpArr = new Array(n);
  let cnt = 2;
  for(let i=0; i < n; i++) {
    formattedInpArr[i] = new Array(n);
    for(let j=0; j < n; j++) {
      formattedInpArr[i][j] = parseInt(arr[cnt]);
      cnt++;
    }
  }

  //compute sum of 2D array
  calculatedInpArr = new Array(n);
  for(let i=0; i < n; i++) {
    calculatedInpArr[i] = new Array(n);
    for(let j=0; j < n; j++) {
      calculatedInpArr[i][j] = getSum(i, j);
    }
  }

  //create JSON Object sorted by sum
  outputJSON = [];
  cnt = 0;
  for(let i=0; i < n; i++) {
    for(let j=0; j < n; j++) {
      outputJSON[cnt] = {};
      outputJSON[cnt].x = i;
      outputJSON[cnt].y = j;
      outputJSON[cnt].sum = calculatedInpArr[i][j];
      cnt++;
    }
  }

  //sort json based on sum
  outputJSON.sort((a, b) => b.sum - a.sum);
}

function getSum(x, y){
  let sum = 0;
  let n = parseInt(arr[1]);
  for(let i=x-1; i <= x+1; i++) {
    for(let j=y-1; j <= y+1; j++) {
      sum += getSumUtil(i, j);
    }
  }
  return sum;
}

function getSumUtil(i,  j){
  const n = parseInt(arr[1]);
  return isIndexOutOfBounds(i, j, n) ?  0 : formattedInpArr[i][j];
}

function isIndexOutOfBounds(i,j,n) {
  return i < 0 || j < 0 || i >= n || j >= n;
}

function isInputValid(){
  let inp = document.getElementById("comment").value;
  arr = inp.split(" ");
  return ! (arr.length < 3 || arr.length != (arr[1]*arr[1] + 2) || (arr[0] > arr[1]*arr[1]));
}
