const blocks = document.getElementsByClassName("row-block");
const dice = document.querySelector(".dice");
const playerInfo = document.querySelector(".player-info");
const winnerBackdrop = document.querySelector(".winner-box");
const winnerBox = document.querySelector(".winner");
const player1StepBoard = document.querySelector(".playerS1 ul");
const player2StepBoard = document.querySelector(".playerS2 ul");
const startBtn = document.querySelector(".start-btn");
const player1 = document.querySelector(".inp1");
const player2 = document.querySelector(".inp2");
const backdrop = $(".backdrop");
const player1Board = document.querySelector("#first-player-board");
const player2Board = document.querySelector("#second-player-board");
const playerBackdrops = document.querySelectorAll(".playerBackdrop");

var player = 0;
const defaultChange = 60;
const defaultLeft = 10;
const defaultBottom = 10;
const PLAY_ICON = '<i class="fas fa-play"></i>';
const ladderStart = ["01", "05", "10", "53", "58", "79"];
const snakeStart = ["42", "49", "54", "77", "83", "86", "92"];
const snakeEndBottom = [1, 0, 0, 1, 6, 4, 3];
const snakeEndleft = [3, 4, 7, 5, 2, 8, 0];
const ladderEndBottom = [2, 4, 5, 9, 7, 9];
const ladderEndLeft = [2, 4, 1, 4, 8, 8];

const positionConstrain = {
  maxRightPosition: 9,
  maxTopPosition: 9,
  minRightPosition: 0,
  minTopPosition: 0
};

const players = [
  (firstPlayer = {
    name: "",
    left: 0,
    bottom: 0,
    playerElement: document.querySelector(".player1"),
    move: false,
    playerBoard: player1Board,
    stepNo: 0,
    X1: 0,
    X2: 0,
    Y1: 0,
    Y2: 0,
    getSix: false
  }),
  (secondPlayer = {
    name: "",
    left: 0,
    bottom: 0,
    playerElement: document.querySelector(".player2"),
    move: false,
    playerBoard: player2Board,
    stepNo: 0,
    X1: 0,
    X2: 0,
    Y1: 0,
    Y2: 0,
    getSix: false
  })
];

const initialSetUp = () => {
  dice.innerHTML = PLAY_ICON;
  playerInfo.innerHTML = `${players[0].name} turn`;
  for (let i = 0; i <= 1; i++) {
    players[i].playerBoard.textContent = `${players[i].name}`;
  }

  // let blockNo = 100;
  // for (i = 0; i < 100; i++) {
  //   blocks[i].textContent = `${blockNo--}`;
  // }
};
const getRandomNumber = () => {
  let number = Math.floor(7 * Math.random());
  if (number === 0) {
    number = 6;
  }
  return number;
};
const showDice = number => {
  dice.textContent = `${number}`;
};
const setStep = (player, number) => {
  if (number === 6) {
    players[player].getSix = true;
  }
  players[player].stepNo++;
};
const move = (player, toMove) => {
  let dumyPerson = { ...players[player] };

  if (players[player].bottom % 2 === 0) {
    dumyPerson.left = players[player].left;
    dumyPerson.bottom = players[player].bottom;
    dumyPerson.left++;
    if (players[player].left === positionConstrain.minRightPosition) {
      dumyPerson.left = 1;
      dumyPerson.bottom = players[player].bottom;
    }
    if (players[player].left === positionConstrain.maxRightPosition) {
      dumyPerson.left = 0;
      dumyPerson.bottom = players[player].bottom + 1;
    }
    setInitialCordinates(player, dumyPerson.left, dumyPerson.bottom);
    moveRight(player, toMove);
    if (players[player].bottom % 2 !== 0) {
      dumyPerson.left =
        positionConstrain.maxRightPosition - players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      if (players[player].left === positionConstrain.minRightPosition) {
        dumyPerson.left = 1;
        dumyPerson.bottom = players[player].bottom;
      }
      if (players[player].left === positionConstrain.maxRightPosition) {
        dumyPerson.left = 1;
        dumyPerson.bottom = players[player].bottom;
      }
    } else {
      dumyPerson.left = players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      if (players[player].left === positionConstrain.minRightPosition) {
        dumyPerson.left = 1;
        dumyPerson.bottom = players[player].bottom;
      }
      if (players[player].left === positionConstrain.maxRightPosition) {
        dumyPerson.left = 0;
        dumyPerson.bottom = players[player].bottom + 1;
      }
      players[player].X2 = dumyPerson.left;
      players[player].Y2 = dumyPerson.bottom;
    }

    setFinalCordinates(player, dumyPerson.left, dumyPerson.bottom);
  } else {
    dumyPerson.left = positionConstrain.maxRightPosition - players[player].left;
    dumyPerson.bottom = players[player].bottom;
    dumyPerson.left++;
    if (players[player].left === positionConstrain.minRightPosition) {
      dumyPerson.left = 0;
      dumyPerson.bottom = players[player].bottom + 1;
    }
    if (players[player].left === positionConstrain.maxRightPosition) {
      dumyPerson.left = 1;
      dumyPerson.bottom = players[player].bottom;
    }
    setInitialCordinates(player, dumyPerson.left, dumyPerson.bottom);
    moveLeft(player, toMove);
    if (players[player].bottom % 2 === 0) {
      dumyPerson.left = players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      if (players[player].left === positionConstrain.minRightPosition) {
        dumyPerson.left = 1;
        dumyPerson.bottom = players[player].bottom;
      }
      if (players[player].left === positionConstrain.maxRightPosition) {
        dumyPerson.left = 0;
        dumyPerson.bottom = players[player].bottom + 1;
      }
      players[player].X2 = dumyPerson.left;
      players[player].Y2 = dumyPerson.bottom;
    } else {
      dumyPerson.left =
        positionConstrain.maxRightPosition - players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      console.log(dumyPerson.left);
      if (players[player].left === positionConstrain.minRightPosition) {
        console.log("left dumy if min");
        dumyPerson.left = 0;
        dumyPerson.bottom = +players[player].bottom + 1;
      }
      if (players[player].left === positionConstrain.maxRightPosition) {
        console.log("left dumy max");
        dumyPerson.left = 0;
        dumyPerson.bottom = players[player].bottom + 1;
      }
    }

    setFinalCordinates(player, dumyPerson.left, dumyPerson.bottom);
  }
};
const setFinalCordinates = (player, left, bottom) => {
  players[player].X2 = left;
  players[player].Y2 = bottom;
};
const setInitialCordinates = (player, left, bottom) => {
  players[player].X1 = left;
  players[player].Y1 = bottom;
};

const showStep = (player, toMove) => {
  const li = document.createElement("li");
  let initialPos =
    players[player].Y1.toString() + players[player].X1.toString();
  if (initialPos === "01") {
    initialPos = "start";
  }
  const finalPos =
    players[player].Y2.toString() + players[player].X2.toString();
  players[player].playerBoard.append(li);
  li.textContent = `${players[player].stepNo}. ${initialPos} to ${finalPos} on ${toMove}`;
};
// const display = playerName => {
//   playerInfo.innerHTML = `<p>${playerName} is moving</p>`;
// };
const moveRight = (player, toMove) => {
  if (positionConstrain.maxRightPosition - players[player].left < toMove) {
    let movedDistance =
      positionConstrain.maxRightPosition - players[player].left;
    playerSetPosition(player, positionConstrain.maxRightPosition);
    playerSetHeight(player, players[player].bottom + 1);
    playerSetPosition(
      player,
      positionConstrain.maxRightPosition - (toMove - movedDistance) + 1
    );
  } else {
    const move = (players[player].left = players[player].left + toMove);
    playerSetPosition(player, move);
  }
};
const playerSetHeight = (player, height) => {
  players[player].bottom = height;
  players[player].playerElement.style.bottom = `${players[player].bottom *
    defaultChange +
    defaultBottom}px`;
};
const moveLeft = (player, toMove) => {
  if (players[player].left - toMove < 0) {
    let movedDistance =
      players[player].left - positionConstrain.minRightPosition;
    playerSetPosition(player, positionConstrain.minRightPosition);
    playerSetHeight(player, players[player].bottom + 1);
    playerSetPosition(player, toMove - movedDistance - 1);
  } else {
    const move = (players[player].left = players[player].left - toMove);
    playerSetPosition(player, move);
  }
};
const playerSetPosition = (player, move) => {
  if (players[player].bottom === positionConstrain.maxTopPosition) {
    if (move === positionConstrain.minRightPosition) {
      SetPosition(player, move);
      win(player);
      resetGame();
    } else {
      SetPosition(player, move);
    }
  } else {
    SetPosition(player, move);
  }
};
const SetPosition = (player, move) => {
  players[player].left = move;
  players[player].playerElement.style.left = `${players[player].left *
    defaultChange +
    defaultLeft}px`;
};

const win = player => {
  showWinnername(player);
  resetGame();
};
const showWinnername = winner => {
  winnerBox.textContent = `${players[winner].name} WINS`;
  winnerBackdrop.style.display = "block";
  winnerBackdrop.style.opacity = "1";
  winnerBackdrop.style.top = "0px";
};
const resetGame = () => {
  for (i = 0; i <= 1; i++) {
    players[i].left = players[i].bottom = 0;
    players[i].playerElement.style.left = `${defaultLeft}px`;
    players[i].playerElement.style.bottom = `${defaultBottom}px`;
  }
};

const changePlayer = p => {
  if (p === 0) {
    players[player].getSix = false;

    player = 1;
    playerInfo.innerHTML = `${players[1].name} turn`;
  } else {
    players[player].getSix = false;

    player = 0;
    playerInfo.innerHTML = `${players[0].name} turn`;
  }
};
const checkLadder = player => {
  let ladderNumber =
    players[player].bottom.toString() + players[player].left.toString();

  let ladderIndex = ladderStart.findIndex(ladder => {
    return ladder === ladderNumber;
  });

  if (ladderIndex >= 0) {
    const dumyPerson = { ...players[player] };
    if (players[player].bottom % 2 === 0) {
      dumyPerson.left = players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      if (players[player].left === positionConstrain.maxRightPosition) {
        dumyPerson.left = 0;
        dumyPerson.bottom = players[player].bottom + 1;
      }
    } else {
      dumyPerson.left =
        positionConstrain.maxRightPosition - players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
    }

    setInitialCordinates(player, dumyPerson.left, dumyPerson.bottom);
    SetPosition(player, ladderEndLeft[ladderIndex]);
    playerSetHeight(player, ladderEndBottom[ladderIndex]);
    dumyPerson.left = players[player].left;
    dumyPerson.bottom = players[player].bottom;
    dumyPerson.left++;
    setFinalCordinates(player, dumyPerson.left, dumyPerson.bottom);
    showPositionIfLadder(player);
  }
};
const checkSnake = player => {
  let snakeNumber =
    players[player].bottom.toString() + players[player].left.toString();

  let snakeIndex = snakeStart.findIndex(snake => {
    return snake === snakeNumber;
  });
  if (snakeIndex >= 0) {
    const dumyPerson = { ...players[player] };
    if (players[player].bottom % 2 === 0) {
      dumyPerson.left = players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      if (players[player].left === positionConstrain.maxRightPosition) {
        dumyPerson.left = 0;
        dumyPerson.bottom = players[player].bottom + 1;
      }
    } else {
      dumyPerson.left =
        positionConstrain.maxRightPosition - players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
    }

    setInitialCordinates(player, dumyPerson.left, dumyPerson.bottom);
    SetPosition(player, snakeEndleft[snakeIndex]);
    playerSetHeight(player, snakeEndBottom[snakeIndex]);
    dumyPerson.left = players[player].left;
    dumyPerson.bottom = players[player].bottom;
    dumyPerson.left++;
    if (players[player].bottom % 2 === 0) {
      dumyPerson.left = players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      if (players[player].left === positionConstrain.maxRightPosition) {
        dumyPerson.left = 0;
        dumyPerson.bottom = players[player].bottom + 1;
      }
    } else {
      dumyPerson.left =
        positionConstrain.maxRightPosition - players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
    }
    if (players[player].left === positionConstrain.minRightPosition) {
      dumyPerson.left = 0;
      dumyPerson.bottom = +players[player].bottom + 1;
    }
    if (players[player].left === positionConstrain.maxRightPosition) {
      dumyPerson.left = 0;
      dumyPerson.bottom = players[player].bottom + 1;
    }
    setFinalCordinates(player, dumyPerson.left, dumyPerson.bottom);
    showPositionIfSnake(player);
  }
};
const showPositionIfLadder = player => {
  const li = document.createElement("li");
  const initialPos =
    players[player].Y1.toString() + players[player].X1.toString();
  const finalPos =
    players[player].Y2.toString() + players[player].X2.toString();
  players[player].playerBoard.append(li);
  li.textContent = `${players[player].stepNo}. ${initialPos} to ${finalPos} due to Ladder`;
};
const showPositionIfSnake = player => {
  const li = document.createElement("li");
  const initialPos =
    players[player].Y1.toString() + players[player].X1.toString();
  const finalPos =
    players[player].Y2.toString() + players[player].X2.toString();
  players[player].playerBoard.append(li);
  li.textContent = `${players[player].stepNo}. ${initialPos} to ${finalPos} due to Snake`;
};

dice.addEventListener("click", () => {
  let toMove = getRandomNumber();
  showDice(toMove);
  if (players[player].move) {
    setStep(player, toMove);
    move(player, toMove);
    showStep(player, toMove);
    checkLadder(player);
    checkSnake(player);
    if (toMove !== 6) {
      changePlayer(player);
    }
  } else {
    if (toMove === 6) {
      players[player].move = true;
    } else {
      changePlayer(player);
    }
  }
});

startBtn.addEventListener("click", () => {
  let isOk = false;
  const player1Name = player1.value;
  const player2Name = player2.value;
  if (player2Name.length > 0 && player1Name.length > 0) {
    isOk = true;
  }
  if (isOk) {
    players[0].name = player1Name;
    players[1].name = player2Name;
    backdrop.addClass("hide-backdrop");
    $(".Entry-box").addClass("hide-Entry-box");
    $(".first-screen").addClass("hide");
    initialSetUp();
  }
});
