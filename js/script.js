// constants //
var SOURCE_CARDS = [
  { img: 'img/mercury.png', matched: false },
  { img: 'img/venus.png', matched: false },
  { img: 'img/moon.png', matched: false },
  { img: 'img/chibi.png', matched: false },
  { img: 'img/mars.png', matched: false },
  { img: 'img/jupiter.png', matched: false },
  { img: 'img/saturn.png', matched: false },
  { img: 'img/neptune.png', matched: false },
  { img: 'img/uranus.png', matched: false },
  { img: 'img/pluto.png', matched: false }
];

const CARD_BACK = 'img/staff.png';

// variables //
let cards, firstCard, secondCard, ignoreClicks;
const startSound = new Audio('mp3/start.mp3');
const clickSound = new Audio('mp3/ding.wav');
const matchSound = new Audio('mp3/correct.mp3');
const resetSound = new Audio('mp3/reset.mp3')
const loseSound = new Audio('mp3/lose.mp3')
let seconds;


// cached elements //
const counter = document.getElementById('counter');
const playBtn = document.getElementById('start-game');
const resetBtn = document.getElementById('reset');
const playAgainBtn = document.getElementById('play-again');
const msgEl = document.querySelector('h2');
const timerEl = document.getElementById('counter');
const resetModal = document.getElementById('reset-modal-container');
const playModal = document.getElementById('start-modal-container');
const winModal = document.getElementById('win-modal-container');

// event listeners //
document.querySelector('main').addEventListener('click', handleChoice);
resetBtn.addEventListener('click', resetGame);
document.getElementById('start-game').addEventListener("click", startGame);

// functions //
init();

// initialize all state, then call render()
function init() {
  cards = getShuffledCards();
  firstCard = null;
  secondCard = null;
  ignoreClicks = false;
  seconds = 60;
  chances = 12;
  winner = null;
  render();
}

function render() {
  cards.forEach(function (card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  msgEl.innerHTML = `chances: ${chances}/12`;
}

function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({ ...card }, { ...card });
  }
  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);
  }
  return cards;
}

// update all impacted state, then call render()
function handleChoice(evt) {
  clickSound.play();
  const cardIdx = parseInt(evt.target.id);
  if (isNaN(cardIdx) || ignoreClicks) return;
  const card = cards[cardIdx];
  if (firstCard) {
    if (secondCard) {
      chances--;
      if (firstCard.img === secondCard.img) {
        // correct match
        firstCard.matched = secondCard.matched = true;
        matchSound.play();
        ignoreClicks = true;
      }
      firstCard = null;
      secondCard = null;
    } else {
      if (isNaN(cardIdx) || ignoreClicks ||
        cards[cardIdx] === firstCard) return;
      secondCard = card;
    }
  } else {
    firstCard = card;
  }
  render();
}

function startGame() {
  startSound.play();
  playModal.classList.add('hidden');
  resetModal.classList.remove('show');
  startTimer();
  document.querySelector('main').style.pointerEvents = 'auto';
  document.querySelector('main').style.opacity = '100%';
}

function startTimer() {
  function tick() {
    seconds--;
    counter.innerHTML =
      "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      gameOver();
    }
  }
  tick();
}

function resetGame() {
  resetSound.play();
  init();
  render();
  startGame();
}

// function getWinner() {

// }

function gameOver() {
  if (chances || seconds <= 0) {
    loseSound.play();
    resetModal.classList.add('show');
    timerEl.innerHTML = ``;
    msgEl.innerHTML = ``;
  }
}