
// FireBase Settings
var firebaseConfig = {
  apiKey: "AIzaSyDhkji_vhA58VnWYVdcRJpzxDbNkuGxk50",
  authDomain: "snake-and-ladder-web.firebaseapp.com",
  databaseURL: "https://snake-and-ladder-web.firebaseio.com",
  projectId: "snake-and-ladder-web",
  storageBucket: "snake-and-ladder-web.appspot.com",
  messagingSenderId: "664238188861",
  appId: "1:664238188861:web:c140a2df78a363491b3d54",
  measurementId: "G-N56P30TGP8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const UserDb = firestore.collection("UserPlayed");

// dom element constants
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
const number = document.querySelector('#number');

// constants to control game
var player = 0;
var defaultChange = 60;
var defaultLeft = 10;
var defaultBottom = 10;
var snakeBoard = document.querySelector('.snake-board');

// default Settings
const defaultSetting = ()=>{
  snakeBoard.style.marginTop = (window.innerHeight/2 -300)+'px'
  if(window.innerWidth< 690){
    defaultChange = 50
    snakeBoard.style.marginTop = (window.innerHeight/2 -150)+'px'
  }   

  if (window.innerWidth < 566){
    defaultChange = 30;
    
    snakeBoard.style.marginTop = (window.innerHeight/2 -150)+'px'
  }     
}
defaultSetting()
  const PLAY_ICON = '<i class="fas fa-play"></i>';
  const ladderStart = ["01", "05", "10", "53", "58", "79"];
  const snakeStart = ["42", "49", "54", "77", "83", "86", "92"];
  const snakeEndBottom = [1, 0, 0, 1, 6, 4, 3];
  const snakeEndleft = [3, 4, 7, 5, 2, 8, 0];
  const ladderEndBottom = [2, 4, 5, 9, 7, 9];
  const ladderEndLeft = [2, 4, 1, 4, 8, 8];
  var  computer = false;
  var canPlay = true

// constraints
  const positionConstrain = {
    maxRightPosition: 9,
    maxTopPosition: 9,
    minRightPosition: 0,
    minTopPosition: 0
  };

// player Objects
  const players = [
    (firstPlayer = {
      name: "",
      left: 0,
      bottom: 0,
      playerElement: document.querySelector(".player1"),
      move: false,
      playerBoard: player1Board,
      nameDisplay:document.querySelector('#player1-name'),
      stepNo: 0,
      X1: 0,
      X2: 0,
      Y1: 0,
      Y2: 0,
      getSix: false,
      color:'red'
    }),
    (secondPlayer = {
      name: "",
      left: 0,
      bottom: 0,
      playerElement: document.querySelector(".player2"),
      move: false,
      playerBoard: player2Board,
      nameDisplay:document.querySelector('#player2-name'),
      stepNo: 0,
      X1: 0,
      X2: 0,
      Y1: 0,
      Y2: 0,
      getSix: false,
      color:'blue'
    })
  ];
 
// play with computer
  const play_with_computer = ()=>{
    player2.value="COMPUTER"
    player2.setAttribute('readonly','true')
    computer = true;
    
}   

// clicking start btn 
  startBtn.addEventListener("click",function(e) {
    e.preventDefault()
    // console.log('ok')
    let start_game = false;
    const player1Name = player1.value;
    const player2Name = player2.value; 
    UserDb.doc().set({
      player1 : player1Name,
      player2 : player2Name
    })
    if (player2Name.length > 0 && player1Name.length > 0) {
      start_game = true;
    }  
    if (start_game) {
      players[0].name = player1Name;
      players[1].name = player2Name;
      backdrop.addClass("hide-backdrop");
      $(".Entry-box").addClass("hide-Entry-box");
      $(".first-screen").addClass("hide");
      initialSetUp();
    }
  });
  
  // Initial Setup
  const initialSetUp = () => {
    dice.innerHTML = PLAY_ICON;
    dice.style.color = players[player].color
    playerInfo.innerHTML = `${players[0].name} turn`;
    for (let i = 0; i <= 1; i++) {
      players[i].nameDisplay.textContent = `${players[i].name}`;
    }
  };
  
  // Event Listener of play Icon
  dice.addEventListener("click", () => {
    play()
    
  });
  
  const make_true = ()=>{
    canPlay=true;
    dice.innerHTML = PLAY_ICON;  
    dice.style.color = players[player].color
  }
  // play function
  const play=()=>{
    if(canPlay){
      canPlay = false;
      let toMove = getRandomNumber();
      rolling()
      setTimeout(()=>showDice(toMove),1000)
      }
      else{
        // console.log('wait')
      }
    }
    
  
  // generation of random no
  const getRandomNumber = () => {
    let number = Math.floor(7 * Math.random());
    if (number === 0) {
      number = 6;
    }  
    return number;
  };
  
  const rolling =()=>{
    dice.textContent = 'Rolling'
  }  
  
  // Show DIce Function
  const showDice = toMove => {
    number.textContent = `${toMove}`;
    if (players[player].move) {
      setStep(player, toMove);
      move(player, toMove);
      showStep(player, toMove);      
      setTimeout(()=>piece1(player,toMove),1000)
    } 
    else {
      if (toMove === 6) {
        players[player].move = true;
        make_true()
        if (players[player].name === 'COMPUTER' && toMove===6){
          setTimeout(play,2000)
        }
      }
      else {
        changePlayer(player);
        
      }
    }
  };

  const piece1 =  (player,toMove)=>{
    checkLadder(player)
    checkSnake(player)
      if(toMove===6){
         make_true()
        }
      if (toMove !== 6) {
        changePlayer(player);
        }
      if (players[player].name === 'COMPUTER' && toMove===6){
        dice.innerHTML = PLAY_ICON;  
        dice.style.color = players[player].color
        setTimeout(play,2000)
        }
    }
  
  // set step
  const setStep = (player, number) => {
    if (number === 6) {
      players[player].getSix = true;
    }
    players[player].stepNo++;
  };
  
  // change player
  const changePlayer = p => {
   
    if (p === 0) {
      players[player].getSix = false;  
      player = 1;
      playerInfo.innerHTML = `${players[1].name} turn`;
      make_true()
     }
    else {
      players[player].getSix = false;  
      player = 0;
      playerInfo.innerHTML = `${players[0].name} turn`;
      make_true()
      
    }
    if (players[player].name === 'COMPUTER'){
      make_true()
      setTimeout(play,2000)
    }
 
    
  };  
  
  const move = (player, toMove) => {
    let dumyPerson = Object.assign({}, players[player]);
    // let dumyPerson = { ...players[player] };  
    if (players[player].bottom % 2 === 0) {
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
      } 
      else {
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
      } else {
        dumyPerson.left =
          positionConstrain.maxRightPosition - players[player].left;
        dumyPerson.bottom = players[player].bottom;
        dumyPerson.left++;        
        if (players[player].left === positionConstrain.minRightPosition) {          
          dumyPerson.left = 0;
          dumyPerson.bottom = +players[player].bottom + 1;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {          
          dumyPerson.left = 0;
          dumyPerson.bottom = players[player].bottom + 1;
        }
      }  
      setFinalCordinates(player, dumyPerson.left, dumyPerson.bottom);
    }
  };
  
  
  // set initial co-ordinate
  const setInitialCordinates = (player, left, bottom) => {
    players[player].X1 = left;
    players[player].Y1 = bottom;
  };
  
  // set final cordinate
  const setFinalCordinates = (player, left, bottom) => {
    players[player].X2 = left;
    players[player].Y2 = bottom;
  };
  
  // move right
  const moveRight = (player, toMove) => {
    if (positionConstrain.maxRightPosition - players[player].left < toMove) {
      let movedDistance = positionConstrain.maxRightPosition - players[player].left;
      playerSetPosition(player, positionConstrain.maxRightPosition);
      playerSetHeight(player, players[player].bottom + 1);
      playerSetPosition(player,positionConstrain.maxRightPosition - (toMove - movedDistance) + 1
      );
    } else {
      const move = (players[player].left = players[player].left + toMove);
      playerSetPosition(player, move);
    }
  };
  const moveLeft = (player, toMove) => {
    if(players[player].left - toMove < 0 && players[player].bottom === positionConstrain.maxTopPosition){
      if(toMove===6 ){
        // console.log("got 6 but cant move")
        changePlayer(player)
      }
    }
    else{
      if(players[player].bottom === positionConstrain.maxTopPosition && players[player].left === toMove ){
        changePlayer(player)
      }
      console.log('in else')
      // if(players[player].left - toMove === 0 ){
      //   changePlayer()
      //   console.log("q likha")
      // }
      if (players[player].left - toMove < 0) {
        let movedDistance = players[player].left - positionConstrain.minRightPosition;
        playerSetPosition(player, positionConstrain.minRightPosition);
        playerSetHeight(player, players[player].bottom + 1);
        playerSetPosition(player, toMove - movedDistance - 1);
      } else {
        const move = (players[player].left = players[player].left - toMove);
        playerSetPosition(player, move);
      }
    }    
  };
  
  // player set position
  const playerSetPosition = (player, move) => {    
      SetPosition(player, move);  
  };
  
  // set position
  const SetPosition = (player, move) => {
    players[player].left = move;
    players[player].playerElement.style.left = `${players[player].left * defaultChange + defaultLeft}px`;
  };
  
  // set height
  const playerSetHeight = (player, height) => {
    players[player].bottom = height;
    players[player].playerElement.style.bottom = `${players[player].bottom * defaultChange + defaultBottom}px`;
  };
  
  // showstep
  const showStep = (player, toMove) => {
    const li = document.createElement("li");
    let initialPos = players[player].Y1.toString() + players[player].X1.toString();
    if (initialPos === "01") {
      initialPos = "start";
    }
    const finalPos =
      players[player].Y2.toString() + players[player].X2.toString();
      if (finalPos === "90") {
        finalPos = "100";
      }
    players[player].playerBoard.prepend(li);
    li.textContent = `${players[player].stepNo}. ${initialPos} to ${finalPos} on ${toMove}`;
    if(finalPos === '100'){
      win(player)
      initialSetUp()
    }
  };
  
  // checkLadder
  const checkLadder = player => {
    let ladderNumber =
      players[player].bottom.toString() + players[player].left.toString();
  
    let ladderIndex = ladderStart.findIndex(ladder => {
      return ladder === ladderNumber;
    });
  
    if (ladderIndex >= 0) {
      dumyPerson = Object.assign({},players[player]);
      // const dumyPerson = { ...players[player] };
      if (players[player].bottom % 2 === 0) {
        dumyPerson.left++;
        
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {
          dumyPerson.left = 0;
          dumyPerson.bottom = players[player].bottom + 1;
        }
      } else {
      
        dumyPerson.left = positionConstrain.maxRightPosition - players[player].left;
        dumyPerson.left++;  
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 0;          
          dumyPerson.bottom = players[player].bottom+1;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {        
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
      }
  
      setInitialCordinates(player, dumyPerson.left, dumyPerson.bottom);
      SetPosition(player, ladderEndLeft[ladderIndex]);
      playerSetHeight(player, ladderEndBottom[ladderIndex]);
      dumyPerson.left = players[player].left;
      dumyPerson.bottom = players[player].bottom;
      dumyPerson.left++;
      // error
      if (players[player].bottom % 2 === 0) {
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {
          dumyPerson.left = 0;
          dumyPerson.bottom = players[player].bottom + 1;
        }
      } else {
        dumyPerson.left = positionConstrain.maxRightPosition - players[player].left;
        dumyPerson.left++;
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 0;          
          dumyPerson.bottom = players[player].bottom+1;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {        
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
      }  
      setFinalCordinates(player, dumyPerson.left, dumyPerson.bottom);
      showPositionIfLadder(player);
    }
  };
  
  // showPositionIfLadder
  const showPositionIfLadder = player => {
    const li = document.createElement("li");
    const initialPos =
      players[player].Y1.toString() + players[player].X1.toString();
    const finalPos =
      players[player].Y2.toString() + players[player].X2.toString();
    players[player].playerBoard.prepend(li);
    li.textContent = `${players[player].stepNo}. ${initialPos} to ${finalPos} due to Ladder`;
  };  
  
  // checkSnake  
  const checkSnake = player => {
    let snakeNumber =
      players[player].bottom.toString() + players[player].left.toString();
    let snakeIndex = snakeStart.findIndex(snake => {
      return snake === snakeNumber;
    });
    if (snakeIndex >= 0) {
      
      dumyPerson = Object.assign({},players[player]);
      // const dumyPerson = { ...players[player] };
      if (players[player].bottom % 2 === 0) {
        dumyPerson.left++;        
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {
          dumyPerson.left = 0;
          dumyPerson.bottom = players[player].bottom + 1;
        }
      } else {
        dumyPerson.left =
          positionConstrain.maxRightPosition - players[player].left;
        dumyPerson.left++;
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 0;          
          dumyPerson.bottom = players[player].bottom+1;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {        
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
      }
  
      setInitialCordinates(player, dumyPerson.left, dumyPerson.bottom);
      SetPosition(player, snakeEndleft[snakeIndex]);
      playerSetHeight(player, snakeEndBottom[snakeIndex]);
      dumyPerson.left = players[player].left;
      dumyPerson.bottom = players[player].bottom;
      
      if (players[player].bottom % 2 === 0) {
        dumyPerson.left++;
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {
          dumyPerson.left = 0;
          dumyPerson.bottom = players[player].bottom + 1;
        }
      } else {
        dumyPerson.left =
          positionConstrain.maxRightPosition - players[player].left;
        dumyPerson.left++;
        if (players[player].left === positionConstrain.minRightPosition) {
          dumyPerson.left = 0;          
          dumyPerson.bottom = players[player].bottom+1;
        }
        if (players[player].left === positionConstrain.maxRightPosition) {        
          dumyPerson.left = 1;
          dumyPerson.bottom = players[player].bottom;
        }
      }  
      setFinalCordinates(player, dumyPerson.left, dumyPerson.bottom);
      showPositionIfSnake(player);
    }
  };
  
  // showPositionIfSnake
  const showPositionIfSnake = player => {
    const li = document.createElement("li");
    const initialPos = players[player].Y1.toString() + players[player].X1.toString();
    const finalPos = players[player].Y2.toString() + players[player].X2.toString();
    players[player].playerBoard.prepend(li);
    li.textContent = `${players[player].stepNo}. ${initialPos} to ${finalPos} due to Snake`;
  };
  
  // win
  const win = player => {
    showWinnername(player);
    resetGame();
  };
  
  const showWinnername = winner => {
    winnerBox.textContent = `${players[winner].name} WINS`;
    winnerBackdrop.style.visibility = 'visible';
    winnerBackdrop.style.top = "0px";
  };
  const resetGame = () => {
    for (i = 0; i <= 1; i++) {
      players[i].left = players[i].bottom = 0;
      players[i].playerElement.style.left = `${defaultLeft}px`;
      players[i].playerElement.style.bottom = `${defaultBottom}px`;
    }
  };
  
