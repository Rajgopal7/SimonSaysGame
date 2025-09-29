let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

// Flash for game
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
}

// Flash for user click
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 400);
}

// Increase level
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

// Check user answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart.`;

    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 1000);

    reset();
  }
}

// Button press by user
function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Attach click event to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Reset function
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

