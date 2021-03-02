const display = document.getElementById('word_display');
const seedInput = document.getElementById('seed_input');
const letterInput = document.getElementById('letter_input');
const guessTracker = document.getElementById('guess_tracker');
const hintDisplay = document.getElementById('hint');
const dracula = document.querySelector('img');

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
    hintDisplay.style.visibility = 'visible';
    guessTracker.style.visibility = 'visible';
    letterInput.style.display = 'none';
    dracula.style.display = 'none';
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
                letterInput.style.display = 'block';
                seedInput.style.display = 'none';
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
    let winMessage = `You figured out <span class = "bloody">${word}</span> and escaped Dracula...this time! Enter another word to play again.`;
    let loseMessage = `<span class = "bloody">Too many wrong letters! I'm here to suck your blood! The answer was <span class = "white">${word}</span></span>`;
    let end = false;
    if(!output.includes('_')){
        display.innerHTML = winMessage;
        end = true;
    } else if(wrongGuesses.length === 7){
        display.innerHTML = loseMessage;
        dracula.style.display = 'block';
        hintDisplay.style.visibility = 'hidden';
        guessTracker.style.visibility = 'hidden';
        end=true;
    }
    if(end){
        seedInput.style.display = 'block';
        letterInput.style.display = 'none';
    }
}

seedInput.addEventListener('keyup', acceptSeed);
letterInput.addEventListener('keyup', acceptLetter);

