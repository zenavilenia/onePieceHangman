let words = ["MONKEY D LUFFY", "RORONOA ZORO", "SANJI", "USOPP", "NAMI", "TONY TONY CHOPPER", "BROOK", "FRANKY", "NICO ROBIN"];
let word;
let indexWord = -1;
let wordTmp = [];
let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
                "Q","R","S","T","U","V","W","X","Y","Z"];
let guessLeft = 5;
let guessedWord = [];
let wins = 0;

let showGuessLeft = document.getElementById("guess");
let showWrongGuess = document.getElementById("wrong-guess");
let showWins = document.getElementById("wins");
let showWordtoGuess = document.getElementById("wordToGuess");
let showAnswer = document.getElementById("answer");
let showResponse = document.getElementById("response");
let showCharacter = document.getElementById("character");
let showAnyKey = document.getElementById("anykey");
let showHangman = document.getElementById("hangman");


window.onload = function() {
  selectNewWord();
}

window.addEventListener("keydown", function (event) {
  if(showResponse.innerHTML !== "")  {
    selectNewWord();
  } else {
    let key = event.key.toUpperCase();
    if(alphabet.indexOf(key) !== -1) {
      if(word.indexOf(key) !== -1) {
        changeWord(key);
      } else {
        if(guessedWord.indexOf(key) === -1) {
          wrongGuest(key);
          changeGuessLeft();
        }
      }
    }
  }
});

function selectNewWord() {
  wordTmp = [];
  guessLeft = 5;
  guessedWord = [];

  showWrongGuess.innerHTML = guessedWord;
  showGuessLeft.innerHTML = guessLeft;
  showAnswer.style.border = "";
  showResponse.innerHTML = "";
  showCharacter.innerHTML = "";
  showAnyKey.innerHTML = "";
  showHangman.innerHTML = '<img src="assets/images/hangman' + guessLeft + '.png" id="imgHangman">';

  let randomItem = words[Math.floor(Math.random()*words.length)];
  indexWord = words.indexOf(randomItem);
  word = words[indexWord].split("");

  for(let i in word) {
    if(word[i] === " ") {
      wordTmp.push("&nbsp;");
    } else {
      wordTmp.push("_");
    }
  }
  showWordtoGuess.innerHTML = wordTmp.join(" ");
}

function changeWord(key) {
  for(let i in word) {
    if(word[i] === key) {
      wordTmp.splice(i, 1, word[i]);
    }
  }

  document.getElementById("wordToGuess").innerHTML = wordTmp.join(" ");

  if(wordTmp.indexOf("_") === -1) {
    win();
  }
}

function changeGuessLeft() {
  guessLeft--;
  showGuessLeft.innerHTML = guessLeft;
  showHangman.innerHTML = '<img src="assets/images/hangman' + guessLeft + '.png" id="imgHangman">';

  if(guessLeft === 0) {
    lose();
  }
}

function lose() {
  showAnswer.style.border = "2px solid #000000";
  showResponse.innerHTML = "You Wrong :( its " + words[indexWord].toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  showCharacter.innerHTML = '<img src="assets/images/' + indexWord + '.png" id="imgShow">'
  showAnyKey.innerHTML = "Press any key to continue";
}

function win() {
  wins++;
  showWins.innerHTML = wins;
  showAnswer.style.border = "2px solid #000000";
  showResponse.innerHTML = "Correct! its " + words[indexWord].toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  showCharacter.innerHTML = '<img src="assets/images/' + indexWord + '.png" id="imgShow">'
  showAnyKey.innerHTML = "Press any key to continue";
}

function wrongGuest(key) {
  guessedWord.push(key);
  showWrongGuess.innerHTML = guessedWord.join(" ");
}
