//important global variables
let gameBoard = document.querySelectorAll(".row > div");
let playerId = "X";
let turns = 0;
let gameOver = false;
let gameOverText = document.getElementById("game-over");
//players are assigned as objects and their character values are referenced
//to place corresponding marks
let players = [
  {
    id: 1,
    name: "",
    character: "X",
  },
  {
    id: 2,
    name: "",
    character: "O",
  },
];
let player1 = players[0];
let player2 = players[1];
//player randomization functionality
let currentPlayer = players[Math.floor(Math.random() * 2)];
//turnText displays whose turn it is
let turnText = document.getElementById("turnText");
let emptyCellsArray = [];

let twoPlayers = false;
const solo = document.getElementById("cpu");

//our key for the wincheck function to check answers against
let wins = [
  [gameBoard[0], gameBoard[1], gameBoard[2]],
  [gameBoard[3], gameBoard[4], gameBoard[5]],
  [gameBoard[6], gameBoard[7], gameBoard[8]],
  [gameBoard[0], gameBoard[3], gameBoard[6]],
  [gameBoard[1], gameBoard[4], gameBoard[7]],
  [gameBoard[2], gameBoard[5], gameBoard[8]],
  [gameBoard[0], gameBoard[4], gameBoard[8]],
  [gameBoard[2], gameBoard[4], gameBoard[6]],
];

for (let i = 0; i < gameBoard.length; i++) {
  gameBoard[i].addEventListener("click", cellClicked, { once: true });
}
//when a cell is clicked, this funtion is called to insert the proper marks
function cellClicked(e) {
  turns++;
  e.target.textContent = currentPlayer.character;

  if (!twoPlayers) {
    currentPlayer == player1;
  }
  if (!twoPlayers && currentPlayer == player2) {
    cpuTurn();
  }
  if (turns > 8 && gameOver === true) {
    tieGame();
  }

  winCheck();

  switchPlayer();
}

solo.addEventListener("click", function () {
  let computer = player2;
  player1.name = "Player 1";
  player2.name = "CPU";
  playerContainer.innerHTML = "OPPONENT: Computer";
});

// const multiPlayer = document.querySelector("vsHuman");
let gameSetup = document.getElementsByClassName("gameSetup")[0];
let playerNames = document.getElementById("vsHuman");
let playerContainer = document.getElementById("playerContainer");

if ((gameOver = true)) {
  turnText.innerHTML = "";
}

//event listeners to add player names and start games based on number of players
playerNames.addEventListener(
  "click",
  function () {
    twoPlayers = true;
    let p1Input = document.createElement("input");
    let p2Input = document.createElement("input");
    p1Input.addEventListener("change", function () {
      players[0].name = p1Input.value;
    });
    p2Input.addEventListener("change", function () {
      players[1].name = p2Input.value;
    });
    playerContainer.append(p1Input);
    playerContainer.append(p2Input);
    let playButton = document.createElement("button");
    playButton.innerHTML = "Play!";
    playerContainer.append(playButton);
    playButton.addEventListener("click", function () {
      if (player1.name !== "" && player2.name !== "") {
        turnText.innerText = `${currentPlayer.name}'s turn`;
      }
      playerContainer.innerHTML =
        "P1:" + player1.name + "  " + "P2:" + player2.name;
    });
  },
  { once: true }
);
let restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function resrart() {
  let clearBoard = document.querySelectorAll(".row > div");
  for (let i = 0; i > clearBoard.length; i++) {
    clearBoard.textContent[i] = "";
  }
  turns = 0;
  player1.name == "";
  player2.name == "";
  turnText == "";
  playerContainer.innerHTML == "";
  console.log(turns);
  console.log(player1.name, player2.name);
});

//this function is called when a move is made,
//and changes the letter on the next click
function switchPlayer() {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }

  turnText.innerText = `${currentPlayer.name}'s turn`;
}
//function to add end game message for tied games
function tieGame() {
  gameOverText.textContent = "It's a tie!";
}
//checks current marks against winning solutions
function winCheck() {
  for (let i = 0; i < wins.length; i++) {
    let winningSolution = wins[i];
    let winCtr = 0;

    for (let j = 0; j < winningSolution.length; j++) {
      if (winningSolution[j].textContent === currentPlayer.character) {
        winCtr++;
      }
    }
    if (winCtr === 3) {
      gameOver = true;
      // if a win happens and the game is 2 player
      if (twoPlayers) {
        if (currentPlayer.character === "X") {
          gameOverText.textContent = "";
          gameOverText.textContent = `${players[0].name} wins!`;
        } else {
          gameOverText.textContent = "";
          gameOverText.textContent = `${players[1].name} wins!`;
        }
        //win happens and game is single player
      } else {
        gameOverText.textContent = `${currentPlayer.character} wins!`;
      }
    }
  }
}
//function for CPU use. I struggled and struggled with this one and had came very close to
//making it work but was unable to complete this function successfully.
function cpuTurn() {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i].textContent == "") {
      emptyCellsArray.push(gameboard[i]);
    }
    console.log(emptyCellsArray);
  }
}
