
//Game Categories and words

gameWords = [
    {
        category: 'Phrase',
        words: ['HAKUNA MATATA', 'A BIG FISH IN A SMALL POND', 'A DAY LATE AND A DOLLAR SHORT', 'EVERY DOG HAS HIS DAY']
    },
    {
        category: 'Place',
        words: ['SEATTLE WASHINGTON', 'DISNEYLAND', 'DOMINICAN REPUBLIC', 'HONOLULU']
    },
    {
        category: 'Thing',
        words: ['MICROWAVE', 'CONVENTIONAL OVEN', 'CHESS BOARD', 'TELEVISION']
    },
    {
        category: 'Person',
        words: ['STEVE CARELL', 'JENNIFER ANISTON', 'LEBRON JAMES', 'STEPHEN CURRY']
    }
];

//Player Object

const Player1 = {
    bank: 0,
    name: 'Player 1'
};

//Random Category && Word

let randomCategory = Math.floor(Math.random() * gameWords.length);
let randomWords = Math.floor(Math.random() * gameWords[randomCategory].words.length);

let currentCategory = gameWords[randomCategory].category;

let currentWord = gameWords[randomCategory].words[randomWords];

// console.log(currentCategory);
// console.log(currentWord);

//Split Word in order to see if letterGuess is in the word

let wordSplit  = currentWord.split('');

console.log(wordSplit)

// console.log(wordSplit);

//Generate word boxes

generateWordBoxs = (wordSplit) => {
    for(i = 0; i < wordSplit.length; i++){
            $('<div>').addClass('letter-box').text(`${wordSplit[i]}`).appendTo('.letter-container')
            $('<div>').addClass('letter-box-cover').attr('id', `${wordSplit[i]}`).text(`${wordSplit[i]}`).appendTo('.cover-container')
    }
}

// generateWordCovers = (wordSplit) => {
//     for(i = 0; i < wordSplit.length; i++){
//             $('<div>').addClass('letter-box-cover').attr('id', `${wordSplit[i]}`).text(`${wordSplit[i]}`).appendTo('.cover-container')
//     }
// }

// generateWordCovers(wordSplit)
generateWordBoxs(wordSplit)

//Guess Letter

const letterGuess = [];

$(() => {  
    $('.guess-letter-box').on('submit', (event) => {
    const letterInput = $('#guess-letter-box').val();
    letterGuess.push(letterInput.toUpperCase());
    // console.log(letterInput);
    event.preventDefault();
    $(event.currentTarget).trigger('reset');
    
    correctLetter(wordSplit);
    incorrectLetter(wordSplit);
    })

});

console.log(letterGuess);

//Player Guess

const playerGuess = [];

$(() => {  
    $('.guess-box').on('submit', (event) => {
    const guessInput = $('#guess-box').val();
    playerGuess.push(guessInput.toUpperCase());
    // console.log(inputValue)
    event.preventDefault();
    $(event.currentTarget).trigger('reset');

    correctWord();
    })
});

// console.log(playerGuess);

//Letter guess matches current word

correctLetter = (wordSplit) => {
    for(i = 0; i < wordSplit.length; i++)
    if (wordSplit[i] == letterGuess[0]){
        $(`.cover-container > #${letterGuess[0]}`).css(`visibility`,`hidden`)
        letterGuess.pop()
        wheelPayout()
        alert(`Nice one! Spin the wheel again`)
    } 
    if (Player1.bank > 5000) {
        alert(`Congrats! You've won the game, you take home all the money you earned!`)
    }
}

incorrectLetter = (wordSplit) => {
    for(i = 0; i < wordSplit.length; i++)
    if (wordSplit[i] != letterGuess[0]){
        letterGuess.pop()
    } 
}

//Wheel payout

wheelPayout = () => {
    if (deg == 7045){
        Player1.bank += 50
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
    }
    if (deg == 7345){
        Player1.bank += 100
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
    }
    if (deg == 7265){
        Player1.bank += 150
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
    }
    if (deg == 7245){
        Player1.bank += 200
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
    }
    if (deg == 7150){
        Player1.bank += 250
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
    }
    if (deg == 7450){
        Player1.bank += 300
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
    }
}

//Word guess matches current word

correctWord = () => {
    if(currentWord == playerGuess){
        Player1.bank += 500;
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
        alert(`Thats correct! Great job, you get a $500 bonus!`)
        playerGuess.pop()
        createNewWord()
    } else {
        alert(`That's not it!`)
        Player1.bank -= 500;
        $newScore.text(`Bank: $${Player1.bank}`).appendTo('.guess-container')
        playerGuess.pop()
        createNewWord()
    }
    if (Player1.bank > 5000) {
        alert(`Congrats! You've won the game, you take home all the money you earned!`)
    }
};

//Generate new word  

createNewWord = () => {
    $('.letter-box').remove()
    $('.letter-box-cover').remove()
    generateWordBoxs(newRandomWord())

}

//Display current category

$displayCategory = $('<h2>').text(`Category: ${currentCategory}`).appendTo('.guess-container')

//Display current Bank

$newScore = $('<h1>').text(`Bank: $${Player1.bank}`).appendTo('.guess-container')


//New Random word

newRandomWord = () => {
    let randomCategory = Math.floor(Math.random() * gameWords.length);
    let randomWords = Math.floor(Math.random() * gameWords[randomCategory].words.length);
    let currentCategory = gameWords[randomCategory].category;
    currentWord = gameWords[randomCategory].words[randomWords];
    wordSplit = currentWord.split('')
    $displayCategory.text(`Category: ${currentCategory}`).appendTo('.guess-container')
    return wordSplit
}

//Join random word

// newWordJoin = newRandomWord().join('')

// console.log(newWordJoin)

//Game instructions modal

$(() => { 
    const $openBtn = $('#openModal');

    const $modal = $('#modal');

    const $closeBtn = $('#close');

    const openModal = () => {
      $modal.css('display', 'block');
    }

    const closeModal = () => {
      $modal.css('display', 'none');
    }

    $openBtn.on('click', openModal)

    $closeBtn.on('click', closeModal);

    // $openBtn.trigger('click')
})

//Wheel Jquery 

const $wheel = $('#wheel')
const $spinbtn = $('#spin-btn')
degArray = [7045, 7345, 7265, 7245, 7150,7450]
randomDeg = Math.floor(Math.random() * degArray.length);
deg = degArray[randomDeg]

$spinbtn.on('click', () => {
    randomDeg = Math.floor(Math.random() * degArray.length);
    deg = degArray[randomDeg]
    $spinbtn.css(`pointerEvents`, `none`);
    $wheel.css(`transition`, `all 10s ease-out`).css(`transform`, `rotate(${deg}deg)`)
    console.log(deg)
})

$wheel.on('transitionend', () => {
    $spinbtn.css(`pointerEvents`, `auto`)
    $wheel.css(`transition`, `none`)
    const newDeg = deg % 360;
    $wheel.css(`transform`, `rotate(${newDeg}deg)`)
})  

