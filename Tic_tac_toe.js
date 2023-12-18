let boxes = Array.from(document.getElementsByClassName('box'));
let Result = document.getElementById('result');
let restartbtn = document.getElementById('btn');
let win_line = getComputedStyle(document.body).getPropertyValue('--winning_blocks');

const O_TEXT = '0';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startgame = () => {
    boxes.forEach(box => box.addEventListener('click', boxclicked));

}

function boxclicked(e) {
    const id = e.target.id;

    if (spaces[id] === null) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerhaswon() !== false) {
            Result.innerText = `${currentPlayer} has Won`;
            let winning_blocks = playerhaswon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = win_line);
            return;
        }     
        else if (isBoardFull()) {
            Result.innerText = "It's a tie!";
        } else{
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}
}
function isBoardFull() {
    return spaces.every(space => space !== null);
}

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function playerhaswon() {
    for (const Condition of winConditions) {

        let [a, b, c] = Condition;

        if (spaces[a] && (spaces[a] == spaces[b] && (spaces[a] == spaces[c]))) {
            return [a, b, c];
        }
    }
    return false;
}

restartbtn.addEventListener('click', restartgame);

function restartgame() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = " ";
        box.style.backgroundColor = '';
    });


    Result.innerText = " "

    currentPlayer = X_TEXT;
}


startgame();


