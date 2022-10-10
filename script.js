// constants //
// each character object will be used twice and shuffled each time board is refreshed
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
let cards, firstCard, secondCard, ignoreClicks, winner;
let clickSound = new Audio('mp3/ding.mp3');
let matchSound = new Audio('mp3/correct.mp3');


// cached elements //
const msgEl = document.querySelector('h1');

// event listeners //
document.querySelector('main').addEventListener('click', handleChoice);
document.querySelector('main').addEventListener('click', () => {
  clickSound.play();
});
// document.querySelector('button').addEventListener('click', getWinner);

// functions //
init();

// initialize all state, then call render()
function init() {
    cards = getShuffledCards();
    firstCard = null;
    ignoreClicks = false;
    winner = null;
    render();
}
  
function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  // playBtn.disabled = !winner;
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
  if (isNaN(cardIdx) || ignoreClicks) return;
  const card = cards[cardIdx];
  if (firstCard) {
    if (secondCard) {
      if (firstCard.img === secondCard.img) {
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

// function getWinner() {
//   // when board is no longer clickable
//   if (ignoreClicks = null) return;
// }

// function hideButton() {
//   // hide button while game is in progress
//   playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';

// }