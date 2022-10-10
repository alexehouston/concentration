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
let cards; // array of 20 shuffled objects
let firstCard; // first card clicked
let numWrong;
let ignoreClicks;

// cached elements //
const playBtn = document.querySelector('button');
const msgEl = document.querySelector('h1');

// event listeners //
document.querySelector('main').addEventListener('click', handleChoice)

// functions //
init();

// initialize all state, then call render()
function init() {
    cards = getShuffledCards();
    firstCard = null;
    numWrong = 0;
    ignoreClicks = false;
    render();
}
  
  function render() {
    cards.forEach(function(card, idx) {
      const imgEl = document.getElementById(idx);
      const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
      imgEl.src = src;
    });
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
    if (firstCard.img === card.img) {
      // correct match
      firstCard.matched = card.matched = true;
    } else {
      numWrong++;
    }
    firstCard = null;
  } else {
    firstCard = card;
  }
  render();
}

// function resetGame () {
// // reset game when:
// // player has won
// // player has run out of guesses
// // player has pressed the 'play again' button
// }

// function hideButton() {
//     // game in-progress -> button hidden
//     // game over -> button visible
// }