const display = document.getElementById('word_display');
const seedInput = document.getElementById('seed_input');
const letterInput = document.getElementById('letter_input');
const guessTracker = document.getElementById('guess_tracker');
const hintDisplay = document.getElementById('hint');

let guessedLetters;
let seed;
let word;
let wrongGuesses;
let letter;

function newGame(){
    guessedLetters = [];
    wrongGuesses = [];
    guessTracker.innerHTML = "No wrong guesses so far";
    display.innerHTML = '';
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

function acceptSeed(event){
    if(event.keyCode === 13){
        newGame();
        seed = seedInput.value;
        hint.innerHTML = `Hint: ${seed}`;
        seedInput.value = "";
        generateWord();
    }
}
async function generateWord(){
    try {
        const response = await fetch(`https://api.datamuse.com/words?ml=${seed}&max=15`);
        if(response.ok){
            const jsonResponse = await response.json();
            if(jsonResponse.length > 0){
                let index = Math.floor(Math.random() * jsonResponse.length);
                word = jsonResponse[index].word;
                printGame(word);
            } else {
                display.innerHTML = 'No related words found. Please try again';
            }
        }
    } catch(error) {
        console.log(error);
        display.innerHTML = "Sorry, something went wrong. Please try again."
        newGame();
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
    let loseMessage = `Too many wrong letters! I'm here to suck your blood! (The answer was ${word}).`

    if(!output.includes('_')){
        message.innerHTML = winMessage;
        display.appendChild(message);
    } else if(wrongGuesses.length === 7){
        message.innerHTML = loseMessage;
        display.appendChild(message);
    }
}

seedInput.addEventListener('keyup', acceptSeed);
letterInput.addEventListener('keyup', acceptLetter);

