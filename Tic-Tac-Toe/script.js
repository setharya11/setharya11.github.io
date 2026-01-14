"use strict";

const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector(".reset-btn");
const newbtn = document.querySelector(".nwbtn");
const msg = document.getElementById("msg");
const msgContainer = document.getElementById("msg-container");

let turnX = true;
let moveCount = 0;

const winpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "") {
      box.textContent = turnX ? "X" : "O";
      box.disabled = true;
      turnX = !turnX;
      moveCount++;
      checkWin();
    }
  });
});

const showMessage = (text) => {
  msg.innerText = text;
  msgContainer.classList.remove("hide");
};

const resetGame = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  turnX = true;
  moveCount = 0;
  msgContainer.classList.add("hide");
};

resetButton.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);

const checkWin = () => {
  for (let pattern of winpatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      showMessage(`Winner is ${boxes[a].textContent}`);
      boxes.forEach((box) => (box.disabled = true));
      return;
    }
  }

  // DRAW CONDITION
  if (moveCount === 9) {
    showMessage("It's a Draw!");
  }
};
