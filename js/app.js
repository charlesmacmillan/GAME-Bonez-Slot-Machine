// constant variables
// win logic may be something like if spot + spot + spot = 3 ? winner = dog1
const symbols = {
  dog1: {
    style: "url()",
    value: 1,
  },
  dog2: {
    style: "url()",
    value: 2,
  },
  dog3: {
    style: "url()",
    value: 3,
  },
  dog4: {
    style: "url()",
    value: 4,
  },
};
// state variables
// bones keep keeps your currency
// bet will be the input value
// board will be the mapping of the 3 slot machine viewports.
let currentBones, betAmount, board;
// cached element references
// the ID's of bones and message will be used and changed throughout the use of the page without caching them into a variable
//functions
const handleClick = (e) => {
  betAmount = parseInt(bet.value);
  if (betAmount <= currentBones) {
    currentBones -= betAmount;
    message.textContent = "spinning...";
  } else if (isNaN(betAmount)) {
    message.textContent = "That is not a number, try again.";
  } else {
    message.textContent = "Not enough bones, try again.";
  }
  bet.value = "";
  render();
};
const init = () => {
  board = [0, 0, 0];
  currentBones = 10;
  message.textContent = "Place your bet then hit Enter, or click SPIN!";
  reset.style.visibility = "hidden";
  render();
};
const render = () => {
  if (currentBones === 0) {
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
