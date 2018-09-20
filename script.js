//original question bank
var questionBank = [
    { question: 'According to folklore, Rome was founded by Romasaurus.', answer: 'false' },
    { question: 'In ancient rome, wearing the togas was a sign of Roman citizenship.', answer: 'true' },
    { question: 'In ancient rome, Romans used to wash clothes in pee.', answer: 'true' },
    { question: 'Rome became the capital city, after it took the title away from Florence.', answer: 'true' },
    { question: 'The tourist landmark known as the Spanish Steps were funded and constructed by the Spaniards.', answer: 'false' },
    { question: 'The colosseum can sit 80,000 people, similar to the capacity of Old Trafford.', answer: 'true' },
    { question: 'There is a city called Rome in America.', answer: 'true' },
    { question: 'Coins are collected every night at the Trevi Fountain and used for the city’s maintenance works.', answer: 'false' },
    { question: 'About 1000 Euros are collected every night at the Trevi fountain.', answer: 'false' },
    { question: 'Currently, Rome has 280 fountains and more than 900 churches.', answer: 'true' },
    { question: 'Rome is the second most popular tourist attraction in Italy, after Milan.', answer: 'false' },
    { question: 'Rome is often defined as the capital of 2 states as the Vatican City is an independent country inside the boundaries of Rome.', answer: 'true' },
];

//create a function to randomize question bank
function shuffle(array) {
    var m = array.length,
        t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

//randomizing the question bank
var randomizedBank = shuffle(questionBank);

//create an array of monuments to be erected
var monuments = [
    "Castel",
    "Vatican City",
    "Trevi Fountain",
    "Pantheon",
    "Colosseum"
]

//get Username
var userInput = prompt("How do we address you?");
var stateOfUser = prompt(`${userInput}, have you been to Rome before? Input y or n.`);
if (stateOfUser === "y") {
    alert(`Great, let's see how much you remember about this place!`);
} else {
    alert(`Time to take a trip yo!`);
};

//Display user instructions
alert("This game is simple - all you need to do is to answer 12 true and false questions.");
alert("For every question you answer correctly, a famous landmark of Rome would be built. And for every question you answer wrongly, a Visgoth would destroy the landmark you just built.")
alert("The goal is to get 5 landmarks up by the end of the game (at the 12th turn). You ready?")

//Indicate players name in header
var inputName = document.getElementsByClassName('inputName')[0];
inputName.textContent = userInput;
inputName.style.textTransform = 'capitalize';

//start from turn 1
var turn = 0;
var score = 0;
var turnsLeft = document.getElementsByClassName('turnsLeft')[0];
var trueButton = document.getElementsByClassName('true')[0];
var falseButton = document.getElementsByClassName('false')[0];
var gridSystem = document.getElementsByClassName('landmarksOfRome')[0];
var visgoth = document.getElementById('visgoth');
var smoke1 = document.getElementById('smoke1');
var smoke2 = document.getElementById('smoke2');
var smoke3 = document.getElementById('smoke3');
var smoke4 = document.getElementById('smoke4');
var smoke5 = document.getElementById('smoke5');
var smokeArray = [smoke1, smoke2, smoke3, smoke4, smoke5];
smoke1.style.visibility = 'hidden';
smoke2.style.visibility = 'hidden';
smoke3.style.visibility = 'hidden';
smoke4.style.visibility = 'hidden';
smoke5.style.visibility = 'hidden';
var correctSound = document.getElementById('correct');
var explosionSound = document.getElementById('explosion');
var construction = document.getElementById('construction');

// hide 5 icons and visgoth at the start
gridSystem.style.visibility = 'hidden';
visgoth.style.visibility = 'hidden';

//showcase question 1 before .appendchild happens
var questionList = document.getElementsByClassName('questionDisplayed')[0];
questionList.textContent = randomizedBank[0].question;

//append question number
var title = document.getElementsByClassName('question')[0];
title.textContent = `Question ${turn+1}`;

//create a function that:
var responseHandler = function(event) {
    // checks if answer is correct
    if (event.target.classList[0] === randomizedBank[turn].answer) {
        var newMonument = document.createElement('li');
        newMonument.setAttribute('type', '1');
        newMonument.setAttribute('class', 'monumentsList');
        newMonument.textContent = monuments[score];

        //landmark names should appear in sequence
        var monumentsArray = document.getElementsByClassName('monuments')[0];
        monumentsArray.appendChild(newMonument);

        //landmark icons should appear in sequence
        var landmarkIcons = document.getElementsByClassName('icons');
        setTimeout(function() {
            landmarkIcons[score].style.visibility = 'visible';
            //add to the existing score
            score++;
        }, 2400);

        //check counter turns green
        var checkCounter = document.getElementsByClassName('check')[0];
        checkCounter.style.backgroundColor = "rgb(" + 154 + "," + 205 + "," + 50 + "," + 0.5 + ")";
        checkCounter.style.color = "rgb(" + 0 + "," + 100 + "," + 0 + ")";
        checkCounter.style.borderStyle = 'none';
        checkCounter.textContent = "Correct!";

        //insert code to make sound appear
        correctSound.play();
        setTimeout(function() { construction.play(); }, 800);

    } else {
        var myList = document.querySelector('ul');
        var landmarkIcons = document.getElementsByClassName('icons');
        if (myList.lastChild) {
            //visgoth appears for 4seconds, after an interval of 0.2s
            setTimeout(function() { visgoth.style.visibility = 'visible'; }, 200);
            setInterval(function() { visgoth.style.visibility = 'hidden'; }, 4000);

            //remove the landmark name in the ordered list
            myList.removeChild(myList.lastChild);

            //smoke appears after visgoth appears
            setTimeout(function() { smokeArray[score].style.visibility = 'visible'; }, 600);
            setTimeout(function() { smokeArray[score].style.visibility = 'hidden'; }, 3000);

            //since player answered wrongly, reduce score by 1
            score--;

            //landmark disappears after 1sec
            setTimeout(function() { landmarkIcons[score].style.visibility = 'hidden'; }, 3000);
        }
        //check counter turns red
        var checkCounter = document.getElementsByClassName('check')[0];
        checkCounter.style.backgroundColor = "rgb(" + 240 + "," + 128 + "," + 128 + "," + 0.5 + ")";
        checkCounter.style.color = "rgb(" + 129 + "," + 0 + "," + 0 + ")";
        checkCounter.style.borderStyle = 'none';
        checkCounter.textContent = "Incorrect!";
        //explosion sound is triggered
        setTimeout(function() { explosionSound.play(); }, 1200);
        //change turn counter
        var count = 12 - turn;
        turnsLeft.textContent = `Turns Left: ${count}`
    }
    //goes to the next turn
    turn++;

    //change turn counter
    var count = 12 - turn;
    turnsLeft.textContent = `Turns Left: ${count}`;

    //change question number
    title.textContent = `Question ${turn+1}`;

    //show next question
    questionList.textContent = randomizedBank[turn].question;
}

//Checking mechanism to ensure game ends
//send game completion message and allow user to restart game when all 5 statues are up

setInterval(function() {
    if (document.getElementsByTagName('li').length === 5) {
        document.getElementsByClassName('questionDisplayed')[0].style.visibility = 'hidden';
        document.getElementsByClassName('answer')[0].style.visibility = 'hidden';
        document.getElementsByClassName('true')[0].style.visibility = 'hidden';
        document.getElementsByClassName('false')[0].style.visibility = 'hidden';
        var endOfGame = document.getElementsByClassName('question')[0];
        endOfGame.textContent = 'Prego!';
        endOfGame.style.marginTop = '150px';
        endOfGame.style.fontSize = '72px';
        endOfGame.style.color = (128, 128, 128, 0.8);
        var space = document.createElement('br');
        var restartGame = document.createElement('button');
        restartGame.setAttribute('class', 'restartButton');
        restartGame.textContent = 'Restart Game';
        restartGame.addEventListener('click', restart);
        restartGame.style.fontSize = '35px';
        restartGame.style.height = '60px';
        restartGame.style.width = '160px';
        endOfGame.appendChild(space);
        endOfGame.appendChild(restartGame);
    } else if (turn == 12) {
        //prompt user to restart game when all questions are exhausted
        document.getElementsByClassName('questionDisplayed')[0].style.visibility = 'hidden';
        document.getElementsByClassName('answer')[0].style.visibility = 'hidden';
        document.getElementsByClassName('true')[0].style.visibility = 'hidden';
        document.getElementsByClassName('false')[0].style.visibility = 'hidden';
        var endOfGame = document.getElementsByClassName('question')[0];
        endOfGame.textContent = 'You know more about Rome now, give this another go?';
        endOfGame.style.margin = '80px 110px 0px 110px';
        endOfGame.style.fontSize = '48px';
        endOfGame.style.color = (128, 128, 128, 0.8);
        var space = document.createElement('br');
        var restartGame = document.createElement('button');
        restartGame.setAttribute('class', 'restartButton');
        restartGame.textContent = 'Restart Game';
        restartGame.addEventListener('click', restart);
        restartGame.style.marginTop = '10px';
        restartGame.style.fontSize = '25px';
        restartGame.style.height = '60px';
        restartGame.style.width = '160px';
        endOfGame.appendChild(space);
        endOfGame.appendChild(restartGame);
        //if user do not build 5 landmarks at the end of 12 questions, all buildings disappear
        //INSERT CODE TO MAKE BUILDINGS DISAPPEAR
    }
}, 5000);

//create function to restart game
function restart(event) {
    location.reload();
}

//trigger next question once you click
trueButton.addEventListener('click', responseHandler);
falseButton.addEventListener('click', responseHandler);

//create animation - visgoths attacking buildings