// инициируем поле для игры
var origBoard;
//инициируем участников
const huPlayer = 'X';
const aiPlayer = 'O';
// двумерный  масив выиграшных комбинаций
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
//получаем все что с классом cell в итоге получаем массив состоящий из 9 td
const cells = document.querySelectorAll('.cell');
//console.log(cells);

//вызов функции
startGame();
//описываем функции старта игры
function startGame() {
    //прячем div конца игры
    document.querySelector(".endgame").style.display = "none";
    // генерируем массив со значениями 0-8 и записываем его в origBoard
    origBoard = Array.from(Array(9).keys());
   // инициализация цикла длинной равной количеству наших ячеек
    for (var i = 0; i < cells.length; i++) {
        // 1) содержимое каждой ячейки стираем
        cells[i].innerText = '';
        //  удаляем фон каждой ячейки
        cells[i].style.removeProperty('background-color');
        // на каждую ячейку навешиваем событие click с обработчкиком turnClick
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    //если тип сожержимого ячейки = числу(тоесть не Х или О) то
if (typeof origBoard[square.target.id] == 'number') {
    //передаем в функцию turn номер клетки и игрока делаем ход кароче
    turn(square.target.id, huPlayer);
      //если не победа , не ничья то запуск функции turn с параметкрами функции хода ИИ и именем ИИ игрока
    if (!checkWin(origBoard,huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
}
}

function turn(squareId, player) {
    // присваеваем ячейке  игрока
origBoard[squareId] = player;
   // записываем в ячейку на поле значение игрока
document.getElementById(squareId).innerText = player;
   //переменной присваеваем функцию в которую передаем наше поле и текущего игрока
let gameWon = checkWin(origBoard, player)
  // в  gameWon возвратится значение то запустится функция gameover, а если null то продолжится
if (gameWon) gameOver(gameWon)
}
// проверка на победу
function checkWin(board, player) {
// c помощью метода reduce перебираем если е = игрок то индекс записывается в масив а
let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a,[]);
// присваевам пустое значение на случай если победной комбинаци не будет
let gameWon = null;
// перебираем многомерный масив где index (выиграшный масив из трех ячеек)
for (let [index, win] of winCombos.entries()) {
    // проверяем кадждое елемент win масивчика совпали с plays.indexOf(индексами) если значение больше -1 значит числа из выишрашынх комбинаций совпало снашими ходами
    if (win.every(elem => plays.indexOf(elem) > -1)) {
        //записываем выиграшную комбинацию и игрока
       // записываем index масивчика и победителя
        gameWon = {index: index, player: player};
        //прерываем цикл
        break;
    }
}
//передаем результат
return gameWon;
}
//функция конца игры
function gameOver(gameWon) {
    //цикл в котором проходимся по елементам полученой комбинации
for (let index of winCombos[gameWon.index]) {
    //назначаем каждому едементу с id фон с цветом если победил игрок то синий иначе карасный
    document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
}
// циклом отцепляем от каждой ячейки события
for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
}
// передаем в функцию текст результата
declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}
//описываем фугкцию результата получаем текст
function declareWinner(who) {
    //назначаем класу ендгейм видимость
document.querySelector(".endgame").style.display = "block";
    // также текст в блоке будет такой который получили
document.querySelector(".endgame .text").innerText = who;
}


function emptySquares() {
return origBoard.filter(s => typeof s == 'number');
}
//случайное число
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}

//ход ИИ
function bestSpot() {
    //возвращает случайный  елемент свободных ячеек
return emptySquares()[getRandomInt(0,emptySquares().length)];
}
//ничья
function checkTie() {
//если пустых клеток 0
if (emptySquares().length == 0) {

    for (var i = 0; i < cells.length; i++) {
        //циклом красим все в зеленый и убираем обработчки событий
        cells[i].style.backgroundColor = "green";
        cells[i].removeEventListener('click', turnClick, false);
    }
    //передаем текст ничьи
    declareWinner("Tie Game!")
    //возвращаем true в проверку на следующих ход для Ai
    return true;
}
return false;
}
/*
*/
