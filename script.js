// constants //
var SOURCE_CARDS = [
  { img: 'https://i.imgur.com/ENXZfgZ.png', matched: false },
  { img: 'https://i.imgur.com/eJsnj4q.png', matched: false },
  { img: 'https://i.imgur.com/xPrKwEx.png', matched: false },
  { img: 'https://i.imgur.com/oDyA2Q8.png', matched: false },
  { img: 'https://i.imgur.com/7ry0qGw.png', matched: false },
  { img: 'https://i.imgur.com/Pq32aAQ.png', matched: false },
  { img: 'https://i.imgur.com/vIbyQqm.png', matched: false },
  { img: 'https://i.imgur.com/RieUif3.png', matched: false },
  { img: 'https://i.imgur.com/bcFIW8m.png', matched: false },
  { img: 'https://i.imgur.com/7FTE8DS.png', matched: false }
];

const CARD_BACK = 'https://i.imgur.com/rvG5lyo.png';

// variables //
let cards, firstCard, secondCard, ignoreClicks;
const startSound = new Audio('mp3/start.mp3');
const clickSound = new Audio('mp3/ding.wav');
const matchSound = new Audio('mp3/correct.mp3');
const resetSound = new Audio('mp3/reset.mp3')
let seconds;


// cached elements //
const counter = document.getElementById('counter');
const playBtn = document.getElementById('start');
const msgEl = document.querySelector('h1');
const modalEl = document.getElementById('modal-container');
const resetBtn = document.getElementById('reset');

// event listeners //
document.querySelector('main').addEventListener('click', handleChoice);
resetBtn.addEventListener('click', resetGame);
document.getElementById('start').addEventListener("click", startGame);

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
  startTimer();
  playBtn.remove();
  document.querySelector('main').style.pointerEvents = 'auto';
  document.querySelector('main').style.opacity = '100%';
  msgEl.innerHTML = `chances: ${chances}/12`;
}

function startTimer() {
  function tick() {
    seconds--;
    counter.innerHTML =
      "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      modalEl.classList.add('show');
    }
  }
  tick();
}

function resetGame() {
  resetSound.play();
  setTimeout(function () {
    startGame();
  }, 200);
}

function gameOver() {
  if (chances || seconds === 0) {
    modalEl.classList.add('show');
  }
}