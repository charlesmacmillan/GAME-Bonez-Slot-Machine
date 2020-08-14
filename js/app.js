// constant variables

const symbols = [
  {
    value: "2",
    style: '<img src="https://i.imgur.com/ASHUOoz.png" class="dogs"></img>',
  },
  {
    value: "2",
    style: '<img src="https://i.imgur.com/ASHUOoz.png" class="dogs"></img>',
  },
  {
    value: "2",
    style: '<img src="https://i.imgur.com/ASHUOoz.png" class="dogs"></img>',
  },
  {
    value: "2",
    style: '<img src="https://i.imgur.com/ASHUOoz.png" class="dogs"></img>',
  },
  {
    value: "3",
    style: '<img src="https://i.imgur.com/PM7jLaD.png" class="dogs"></img>',
  },
  {
    value: "3",
    style: '<img src="https://i.imgur.com/PM7jLaD.png" class="dogs"></img>',
  },
  {
    value: "3",
    style: '<img src="https://i.imgur.com/PM7jLaD.png" class="dogs"></img>',
  },
  {
    value: "3",
    style: '<img src="https://i.imgur.com/PM7jLaD.png" class="dogs"></img>',
  },
  {
    value: "4",
    style: '<img src="https://i.imgur.com/CUAhusj.png" class="dogs"></img>',
  },
  {
    value: "4",
    style: '<img src="https://i.imgur.com/CUAhusj.png" class="dogs"></img>',
  },
  {
    value: "4",
    style: '<img src="https://i.imgur.com/CUAhusj.png" class="dogs"></img>',
  },
  {
    value: "5",
    style: '<img src="https://i.imgur.com/rUyNBLi.png" class="dogs"></img>',
  },
  {
    value: "5",
    style: '<img src="https://i.imgur.com/rUyNBLi.png" class="dogs"></img>',
  },
  {
    value: "6",
    style: '<img src="https://i.imgur.com/ZWbIHB5.png" class="dogs"></img>',
  },
];

// state variables

let stopActive = false;
let currentBones, betAmount, board, win;

// cached element references

const spin = document.querySelector("#spin");
const reset = document.querySelector("#reset");
const bet = document.querySelector("#bet");
const stopper = document.querySelector("#stop");
const columnEls = document.querySelectorAll(".column");

//functions

const getWinner = () => {
  if (board[0] === board[1] && board[0] === board[2]) {
    return parseInt(board[0]);
  } else if (
    board[0] === board[1] ||
    board[0] === board[2] ||
    board[1] === board[2]
  ) {
    return 1;
  } else return 0;
};

const handleClick = (e) => {
  stopActive = false;
  betAmount = parseInt(bet.value);
  if (isNaN(betAmount)) {
    return (message.textContent = "That is not a number, try again.");
  } else if (currentBones === 0) return;
  else if (betAmount <= currentBones) {
    currentBones -= betAmount;
    message.textContent = "Press spacebar or click 'STOP' to stop spin";
    spinner();
  } else {
    return (message.textContent = "Not enough bones, try again.");
  }
};

const spinner = () => {
  if (stopActive) {
    bet.value = `${betAmount}`;
    win = getWinner();
    return render();
  }
  playReelSound();
  columnEls.forEach((e, i) => {
    let idx = Math.floor(Math.random() * symbols.length);
    columnEls[i].innerHTML = symbols[idx].style;
    board[i] = parseInt(symbols[idx].value);
  });
  setTimeout(spinner, 100);
};

const init = () => {
  board = [0, 0, 0];
  currentBones = 10;
  message.textContent = "Place your bet then press Enter, or click SPIN!";
  reset.style.visibility = "hidden";
  columnEls.innerHTML = "";
  render();
};

const render = () => {
  if (win) {
    playBark1();
    currentBones += betAmount * win;
    message.textContent = `nice, you won ${betAmount * win} bones!`;
  } else if (currentBones === 0) {
    playHowl();
    message.innerHTML = "Bummer, you're out of bones!";
    reset.style.visibility = "visible";
  } else if (currentBones < 10 && currentBones > 0) {
    message.textContent = `you lost ${betAmount} bones, try again!`;
    playWhine();
  }
  bones.textContent = `${currentBones}`;
};

init();

//event listeners

spin.addEventListener("click", handleClick);
reset.addEventListener("click", init);
bet.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) handleClick();
});
bet.addEventListener("keyup", (e) => {
  if (e.keyCode === 32) stopper.click();
});
stopper.addEventListener("click", function () {
  stopActive = true;
});

const playReelSound = () => {
  var audio = document.createElement("audio");
  audio.src = "https://freesound.org/data/previews/348/348503_321967-lq.mp3";
  audio.play();
};
const playBark1 = () => {
  var audio = document.createElement("audio");
  audio.src = "https://freesound.org/data/previews/420/420449_2402876-lq.mp3";
  audio.play();
};
const playWhine = () => {
  var audio = document.createElement("audio");
  audio.src = "https://freesound.org/data/previews/427/427127_8343580-lq.mp3";
  audio.play();
};
const playHowl = () => {
  var audio = document.createElement("audio");
  audio.src = "https://freesound.org/data/previews/398/398430_3862281-lq.mp3";
  audio.play();
};
