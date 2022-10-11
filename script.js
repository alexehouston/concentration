// constants //
var SOURCE_CARDS = [
    {img: 'https://i.imgur.com/ENXZfgZ.png', matched: false},
    {img: 'https://i.imgur.com/eJsnj4q.png', matched: false},
    {img: 'https://i.imgur.com/xPrKwEx.png', matched: false},
    {img: 'https://i.imgur.com/oDyA2Q8.png', matched: false},
    {img: 'https://i.imgur.com/7ry0qGw.png', matched: false},
    {img: 'https://i.imgur.com/Pq32aAQ.png', matched: false},
    {img: 'https://i.imgur.com/vIbyQqm.png', matched: false},
    {img: 'https://i.imgur.com/RieUif3.png', matched: false},
    {img: 'https://i.imgur.com/bcFIW8m.png', matched: false},
    {img: 'https://i.imgur.com/7FTE8DS.png', matched: false}
];

const CARD_BACK = 'https://i.imgur.com/rvG5lyo.png';

// variables //
let cards, firstCard, secondCard, ignoreClicks;
let clickSound = new Audio('mp3/ding.wav');
let matchSound = new Audio('mp3/correct.mp3');
let seconds;


// cached elements //
const msgEl = document.querySelector('h1');
const resetBtn = document.querySelector('button');
const counter = document.getElementById("counter");

// event listeners //
document.querySelector('main').addEventListener('click', handleChoice);
resetBtn.addEventListener('click', resetGame);

// functions //
init();

// initialize all state, then call render()
function init() {
    cards = getShuffledCards();
    firstCard = null;
    secondCard = null;
    ignoreClicks = false;
    seconds = 60;
    chances = 15;
    winner = null;
    render();
}
  
function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  msgEl.innerHTML = `chances: ${chances}/15`;
}
  
function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({...card}, {...card});
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
  const cardIdx = parseInt(evt.target.id);
  startTimer();
  if (isNaN(cardIdx) || ignoreClicks) return;
  clickSound.play();
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

function startTimer() {
  function tick() {
    seconds--;
    counter.innerHTML =
      "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      init();
    }
  }
  tick();
}

function startChances() {
  msgEl.innerHTML = `chances: ${chances} / 15`;
}

function resetGame() {
  init();
  clickSound.play();
  startTimer();
}

const button = document.querySelector("button");
button.addEventListener("click", event => {
  init();
  button.remove();
});