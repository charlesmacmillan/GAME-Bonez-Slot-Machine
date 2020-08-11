// constant variables
// win logic may be something like if spot + spot + spot = 3 ? winner = dog1
const symbols = {
  "2": "url()",
  "3": "url()",
  "4": "url()",
  "5": "url()",
};
// state variables
// bones keep keeps your currency
// bet will be the input value
// board will be the mapping of the 3 slot machine viewports.
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
  } else return 0;
};
const handleClick = (e) => {
  betAmount = parseInt(bet.value);
  if (betAmount <= currentBones) {
    currentBones -= betAmount;
    message.textContent = "spinning...";
    //call function for animation and remapping of board here.
  } else if (isNaN(betAmount)) {
    message.textContent = "That is not a number, try again.";
  } else {
    message.textContent = "Not enough bones, try again.";
  }
  bet.value = "";
  win = getWinner();
  render();
};
const spinner = () => {
  columnEls.forEach(e => {
    let idx = Math.floor(Math.random())
  })
  //interval? recursion?
  //add event listener within a function?
};
const handleOther = () => {
  //if i add an event listener within the spin(animation & remapping) function,
  //I probably won't need this function.
};
const init = () => {
  board = [0, 0, 0];
  currentBones = 10;
  message.textContent = "Place your bet then hit Enter, or click SPIN!";
  reset.style.visibility = "hidden";
  render();
};
const render = () => {
  if (win) {
    currentBones += betAmount * win;
    message.textContent = `nice, you won ${betAmount * win} bones!`;
  } else if (currentBones === 0) {
    message.innerHTML = "Bummer, you're out of bones!";
    reset.style.visibility = "visible";
  }
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
    e.preventDefault();
    spin.click();
  }
});
stopper.addEventListener("click", function () {
  console.log("clicked");
});
