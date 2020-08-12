// constant variables
// win logic may be something like if spot + spot + spot = 3 ? winner = dog1
const symbols = [
  {
    value: "1",
    style: '<img src="https://i.imgur.com/1nCvO3O.png" class="dogs"></img>',
  },
  {
    value: "2",
    style: '<img src="https://i.imgur.com/8rIYNYr.png" class="dogs"></img>',
  },
  {
    value: "3",
    style: '<img src="https://i.imgur.com/DVNYZG8.png" class="dogs"></img>',
  },
  {
    value: "4",
    style: '<img src="https://i.imgur.com/5mwPiY6.png" class="dogs"></img>',
  },
  {
    value: "5",
    style: '<img src="https://i.imgur.com/ZzBmHRX.png" class="dogs"></img>',
  },
];
// state variables
// bones keep keeps your currency
// bet will be the input value
// board will be the mapping of the 3 slot machine viewports.
let stopActive = false;
let currentBones, betAmount, board, win;
// cached element references
const spin = document.querySelector("#spin"); //spin button
const reset = document.querySelector("#reset"); //reset button
const bet = document.querySelector("#bet"); //bet input
const stopper = document.querySelector("#stop"); //stop button
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
  // bet.value = `${betAmount}`;
  // win = getWinner();
  // render();
};

const spinner = () => {
  if (stopActive) {
    bet.value = `${betAmount}`;
    win = getWinner();
    return render();
  }
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
  message.textContent = "Place your bet then hit Enter, or click SPIN!";
  reset.style.visibility = "hidden";
  columnEls.innerHTML = "";
  render();
};
const render = () => {
  if (win) {
    currentBones += betAmount * win;
    message.textContent = `nice, you won ${betAmount * win} bones!`;
  } else if (currentBones === 0) {
    message.innerHTML = "Bummer, you're out of bones!";
    reset.style.visibility = "visible";
  } else if (currentBones < 10 && currentBones > 0)
    message.textContent = `you lost ${betAmount} bones, try again!`;
  bones.textContent = `${currentBones}`;
};
init();

//event listeners
//spin button
spin.addEventListener("click", handleClick);
//reset button (created when there's a loss)
reset.addEventListener("click", init);
bet.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleClick();
  }
});
bet.addEventListener("keyup", (e) => {
  if (e.keyCode === 32) {
    stopper.click();
  }
})
stopper.addEventListener("click", function () {
  stopActive = true;
});
