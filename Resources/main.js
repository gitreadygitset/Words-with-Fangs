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
    return output;
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
                tallyWrongGuesses();
                let output = printGame(word);
                checkForEnd(output);
            } else {
                alert('You already guessed that letter!')
            }
        } else {
            alert('Please enter a single letter only! All special characters needed are provided for you.')
        }
        letterInput.value = '';
    }   
}

function tallyWrongGuesses(){
    if(!word.includes(letter)){
        wrongGuesses.push(letter);
        guessTracker.innerHTML = `Wrong guesses so far: ${wrongGuesses.join(', ')}`;
    }
}

function checkForEnd(output){
    const message = document.createElement('p');
    let winMessage = "You figured out the answer and escaped Dracula...this time! Enter another word to play again.";
    let loseMessage = "Too many wrong letters! I'm here to suck your blood!"

    if(!output.includes('_')){
        message.innerHTML = winMessage;
        display.appendChild(message);
    } else if(wrongGuesses.length === 7){
        message.innerHTML = loseMessage;
        display.appendChild(message);
    }
}

wordInput.addEventListener('keyup', acceptWord);
letterInput.addEventListener('keyup', acceptLetter);

