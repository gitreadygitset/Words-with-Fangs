const display = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const letterInput = document.getElementById('letter-input');

const guessedLetters = [];
let word; 

function printGame(word){
    output = ''
    for(let i=0; i < word.length; i++){
        if(guessedLetters.includes(word[i].toLowerCase())){
            output += word[i]+ '';
        } else {
            output += '_ ';
        }
    }
    display.innerHTML = output;
}

function acceptWord(event){
    if(event.keyCode === 13){
        word = wordInput.value;
        wordInput.value = "";
        printGame(word);
    }
}

function acceptLetter(letter){
    if(letter.keyCode >= 65 && letter.keyCode <= 90){
        guessedLetters.push(letter.key);
        letterInput.value = '';
        printGame(word);
    }
}

wordInput.addEventListener('keyup', acceptWord);
letterInput.addEventListener('keyup', acceptLetter);



