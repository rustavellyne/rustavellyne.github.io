var cells = getFieldCells('#field td');
var Player = defaultPlayer();
var aiPlayer = 'O';
var restartButton = document.querySelector('#restart');

restartButton.addEventListener('click', restartGame);

var currentPlayerElem = document.querySelector('#current-player');


startGame();

function startGame() {
    activateCells(cells);
    Player = defaultPlayer();


    //showCurrentPlayer(Player, currentPlayerElem)
}

function nextStep(id, role){
    if(cells[id]) return false;
    cells[id] = role;
    document.getElementById(id).className ='cell' + role;
    //var cell = this;
    //fillCell(id, role);
    //Player = getNextPlayer(Player);
    //showCurrentPlayer(Player, currentPlayerElem);
     //deactivateCell(cell);


    var winner = checkWin(cells);
    if (winner !== false || checkFieldFilled(cells)){
        gameOver(cells, winner, currentPlayerElem);
    }

}

function gameOver(cells, winner, currentPlayerElem){
    stopGame(cells);
    showWinner(winner);
    showCurrentPlayer('--', currentPlayerElem)

}


function showWinner(winner){
    if(winner !== false){
    alert(winner);
}else{
   alert('draw game')
    }
}

function restartGame(){
    startGame();
}

function defaultPlayer(){
    return 'X';
}
/*
function getNextPlayer(Player){
    if(Player == 'X'){
        return  'O';
    } else {
        return  'X';
    }
}
*/
function fillCell(cell, role){
    cell.innerHTML = role;
}

function activateCells(cells){
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].addEventListener('click', nextStep.bind(i, 'Player'));
    }
}

function deactivateCell(cell){
    cell.removeEventListener('click', nextStep);
}




function stopGame(cells) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', nextStep);
    }
}

function checkWin(cells) {
    var winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (var i = 0; i < winCombos.length; i++) {
        var wc = winCombos[i];
        if (cells[wc[0]].innerHTML == cells[wc[1]].innerHTML && cells[wc[1]].innerHTML == cells[wc[2]].innerHTML && cells[wc[0]].innerHTML != '') {
            return cells[wc[0]].innerHTML;
        }
    }
    return false;
}
    function checkFieldFilled(cells) {
        var isFilled = true;
        for (var i = 0; i < cells.length; i++){
            if (cells[i].innerHTML == ''){
                return false;
            }
        }
        return true;
}

function getFieldCells(selector) {
    return document.querySelectorAll(selector)
}

function showCurrentPlayer(name, elem){
    elem.innerHTML = name;
}

/*    AI  */

function Ai(){
    var id = Math.floor(Math.random()*9);
    cells[id] ? Ai(): nextStep(id, 'aiPlayer')
}
