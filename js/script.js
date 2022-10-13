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

const startSound = new Audio('mp3/start.mp3');
const clickSound = new Audio('mp3/ding.wav');
const matchSound = new Audio('mp3/correct.mp3');
const resetSound = new Audio('mp3/reset.mp3')
const loseSound = new Audio('mp3/lose.mp3')
const winSound = new Audio('mp3/win.mp3');
const wrongSound = new Audio('mp3/wrong.mp3');

// variables //
let cards, selectedCard, ignoreClicks, matches, seconds, chances;

// cached elements //
const chancesEl = document.querySelector('h2');
const timerEl = document.getElementById('counter');
const resetModal = document.getElementById('reset-modal-container');
const playModal = document.getElementById('start-modal-container');
const winModal = document.getElementById('win-modal-container');

// event listeners //
document.querySelector('main').addEventListener('click', handleChoice);
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('start-game').addEventListener("click", startGame);
document.getElementById('play-again').addEventListener('click', resetGame);


// functions //
init();

// initialize all state, then call render()
function init() {
  cards = getShuffledCards();
  selectedCard = null;
  ignoreClicks = false;
  seconds = 60;
  chances = 20;
  matches = 0;
  winner = null;
  render();
}

function render() {
  cards.forEach(function (card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === selectedCard) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  chancesEl.innerHTML = `chances: ${chances}/20`;
  timerEl.innerHTML = `0:${seconds}`;
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

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id);
  const card = cards[cardIdx];
  if (ignoreClicks || isNaN(cardIdx) || card.matched) return;
  clickSound.play();
  if (selectedCard && selectedCard === card) {
    selectedCard = null;
  } else if (selectedCard) {
    if (card.img === selectedCard.img) {
      card.matched = selectedCard.matched = true;
      matchSound.play();
      selectedCard = null;
      winner = cards.every(card => card.matched);
    } else {
      ignoreClicks = true;
      card.matched = true;
      chances--;
        setTimeout(function () {
        ignoreClicks = false;
        selectedCard = null;
        card.matched = false;
        wrongSound.play();
        render();
      }, 800);
    }
  } else {
    selectedCard = card;
  }
  if (chances <= 0) {
    gameOver();
  }
  if (winner === true) {
    winGame();
  }
  if (seconds <= 0) {
    gameOver();
  }
  render();
}

function startGame() {
  startSound.play();
  playModal.classList.add('hidden');
  winModal.classList.remove('show')
  resetModal.classList.remove('show');
  init();
  startTimer();
}

function startTimer() {
  function tick() {
    seconds--;
    render(seconds);
  }
  timeCount = setInterval(tick, 1000);
}

function resetTimer() {
  clearInterval(timeCount);
  seconds = 60;
  render(seconds);
}

function winGame() {
    winSound.play();
    render();
    winModal.classList.add('show');
    timerEl.style.visibility = 'hidden';
    chancesEl.style.visibility = 'hidden';
}

function resetGame() {
  resetTimer();
  startGame();
  resetModal.classList.remove('show');
  timerEl.style.visibility = 'visible';
  chancesEl.style.visibility = 'visible';
}

function gameOver() {
  loseSound.play();
  render();
  resetModal.classList.add('show');
  timerEl.style.visibility = 'hidden';
  chancesEl.style.visibility = 'hidden';
}