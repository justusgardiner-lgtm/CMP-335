let chips = 200;
let deckId = null;
let firstCardValue = null;

// assign ranks to the card
function getCardRank(value) {
  const ranks = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7,
    "8": 8, "9": 9, "10": 10, "JACK": 11, "QUEEN": 12,
    "KING": 13, "ACE": 14
  };
  return ranks[value];
}

//  Deal the first card and reset texts
async function drawOneCard() {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
  );
  const data = await response.json();
 // change deckId and FirstCardValue value
  deckId = data.deck_id;
  firstCardValue = data.cards[0].value;
  const cardImage = data.cards[0].image;

  // Display first card
  document.getElementById("card").innerText = firstCardValue;
  document.getElementById("image").src = cardImage;

  // Clear previous round results
  document.getElementById("Secondcard").innerText = "";
  document.getElementById("Secondimage").src = "";
  document.getElementById("betWon").innerText = "";
  document.getElementById("betLost").innerText = "";

}

// make bet
async function makeBet() {
  // Prevent betting before drawing the first card
  if (deckId === null || firstCardValue === null) {
    alert("Please deal the first card first!");
    return;
  }

  // Get and validate bet amount
  const betInput = document.getElementById("betAmount");
  const betAmount = Number(betInput.value);

  if (isNaN(betAmount) || betAmount <= 0) {
    alert("Please enter a valid bet amount.");
    return;
  }

  if (betAmount > chips) {
    alert("Bet amount exceeds chips owned.");
    return;
  }

  // Draw second card from the SAME deck using global deckId
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );
  
  const data = await response.json();

  const secondCardValue = data.cards[0].value;
  const secondCardImage = data.cards[0].image;

  // Display second card
  document.getElementById("Secondcard").innerText = secondCardValue;
  document.getElementById("Secondimage").src = secondCardImage;

  const firstRank = getCardRank(firstCardValue);
  const secondRank = getCardRank(secondCardValue);

  // Clear messages
  document.getElementById("betWon").innerText = "";
  document.getElementById("betLost").innerText = "";

  // Evaluate result
  if (secondRank > firstRank) {
    chips += betAmount;
    document.getElementById("betWon").innerText = `You won ${betAmount} chips!`;
  } else {
    chips -= betAmount;
    document.getElementById("betLost").innerText = `You lost ${betAmount} chips!`;
  }

  // Update chip count on page
  document.getElementById("chips").innerText = `Chips: ${chips}`;

  // Reset deck so player must draw a new first card for the next round
  deckId = null;
  firstCardValue = null;
}