const display = document.getElementById('word_display');
const wordInput = document.getElementById('word_input');
const letterInput = document.getElementById('letter_input');
const guessTracker = document.getElementById('guess_tracker');

let guessedLetters;
let word;
let wrongGuesses;
let letter;

function newGame(){
    guessedLetters = [];
    wrongGuesses = [];
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
            if(!guessedLetters.includes(letter)){
                guessedLetters.push(letter);
                tallyGuesses();
                printGame(word);
            } else {
                alert('You already guessed that letter!')
            }
        } else {
            alert('Please enter a single letter only! All special characters needed are provided for you.')
        }
        letterInput.value = '';
    }   
}

function tallyGuesses(){
    if(!word.includes(letter)){
        wrongGuesses.push(letter);
        guessTracker.innerHTML = `Wrong guesses so far: ${wrongGuesses.join(', ')}`;
    }
}

wordInput.addEventListener('keyup', acceptWord);
letterInput.addEventListener('keyup', acceptLetter);

