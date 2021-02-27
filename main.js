const display = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const letterInput = document.getElementById('letter-input');

let guessedLetters;
let word;
let numGuesses;
let letter;

function newGame(){
    guessedLetters = [];
    numGuesses = 0;
}

function printGame(word){
    output = ''
    specialChars = ['?', "'", ",", "!", "&"]
    for(let i=0; i < word.length; i++){
        if(guessedLetters.includes(word[i].toLowerCase())){
            output += word[i];
        } else if(specialChars.includes(word[i])){
            output += word[i];
        } else if(word[i] === ' '){
            output += '&nbsp &nbsp'
        } else {
            output += '_ ';
        }
    } 
    display.innerHTML = output;
}

function acceptWord(event){
    if(event.keyCode === 13){
        newGame();
        word = wordInput.value;
        wordInput.value = "";
        printGame(word);
    }
}

function acceptLetter(event){
    if(event.keyCode === 13){
        letter = letterInput.value.toLowerCase();
        if(letter.length === 1 && letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122){
            guessedLetters.push(letter);
            letterInput.value = '';
            printGame(word);
        } else {
            alert('Please enter a single letter only! All special characters needed are provided for you')
        }
    }
}

wordInput.addEventListener('keyup', acceptWord);
letterInput.addEventListener('keyup', acceptLetter);

