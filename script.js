// <!-- prompt("Who do we have today yo?"); -->

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
    { question: 'Rome has been often defined as capital of two states because the Vatican City is an independent country inside the city boundaries of Rome.', answer: 'true' },
];

//create a function to randomize question bank
function shuffle(array) {
  var m = array.length, t, i;

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
    "Colosseum",
    "Pantheon",
    "Trevi Fountain",
    "Spanish Steps",
    "Vatican City",
]

// //get Username
// var userInput = prompt("How do we address you?");
// var stateOfUser = prompt(`${userInput}, have you been to Rome before? Input y or n.`);
// if (stateOfUser === "y") {
//     alert(`Great, let's see how much you remember about this place!`);
// } else {
//     alert(`Time to take a trip yo!`);
// }

// //Display user instructions
// alert("This is how the game works. You only have to answer 12 true and false questions, and erect 5 landmarks of Rome in the process.");
// alert("For every question you answer correctly, a famous landmark of Rome would be erected. And for every question you answer wrongly, a Visgoth would take down the landmark you just built. Ready?");


//randomize questions

// //Indicate players name in header
// var inputName = document.getElementsByClassName('inputName')[0];
// inputName.textContent = userInput;
// inputName.style.textTransform = 'capitalize';

//start from turn 1
var turn = 0;
var score = 0;
var trueButton = document.getElementsByClassName('true')[0];
var falseButton = document.getElementsByClassName('false')[0];
var gridSystem = document.getElementsByClassName('landmarksOfRome')[0];

//hide 5 icons at the start
gridSystem.style.visibility = 'hidden';

//showcase question 1 before .appendchild happens
var questionList = document.getElementsByClassName('questionDisplayed')[0];
questionList.textContent = randomizedBank[0].question;

//append question number
var title = document.getElementsByClassName('question')[0];
title.textContent=`Question ${turn+1}`

//create a function that:
var responseHandler = function(event) {
    // checks if answer is correct
    if (event.target.classList[0] === randomizedBank[turn].answer) {
        var newMonument = document.createElement('li');
        newMonument.setAttribute('type', '1');
        newMonument.setAttribute('class', 'monumentsList');
        newMonument.textContent = monuments[score];
        //landmark icons should appear in sequence
        var landmarkIcons = document.getElementsByClassName('icons');
        landmarkIcons[score].style.visibility = 'visible';
        //landmark names should appear in sequence
        var monumentsArray = document.getElementsByClassName('monuments')[0];
        monumentsArray.appendChild(newMonument);
        //add to the existing score
        score++;

    } else {
        var myList = document.querySelector('ul');
        if (myList.lastChild) {
            //if there is a child in landmarks icons list, then remove it from sight
            var landmarkIcons = document.getElementsByClassName('icons');
            landmarkIcons[score].style.visibility = 'hidden'
            //remove landmark text if answer is wrong

             //once both icons and text are removed, remove the child
            myList.removeChild(myList.lastChild);
            //since player answered wrongly, reduce score by 1
            score--;
        } else {
            score = 0
        }
    }
    //goes to the next turn
    turn++;
    questionList.textContent = randomizedBank[turn].question;
    title.textContent=`Question ${turn+1}`
}

//TO DO: INSERT SMOKE + EXPLOSION AUDIO

//create function to restart game
function restart (event) {
    location.reload();
}

    //send game completion message and allow user to restart game when all 5 statues are up
    if (document.getElementsByTagName('li').length === 5) {
        document.getElementsByClassName('questionDisplayed')[0].style.visibility = 'hidden';
        document.getElementsByClassName('answer')[0].style.visibility = 'hidden';
        document.getElementsByClassName('true')[0].style.visibility = 'hidden';
        document.getElementsByClassName('false')[0].style.visibility = 'hidden';
        var endOfGame = document.getElementsByClassName('question')[0];
        endOfGame.textContent = 'Molto Bene!';
        endOfGame.style.marginTop = '150px';
        endOfGame.style.fontSize = '72px';
        endOfGame.style.color = (128, 128, 128, 0.8);
        var space = document.createElement('br');
        var restartGame = document.createElement('button');
        restartGame.setAttribute('class', 'restartButton');
        restartGame.textContent = 'Restart Game';
        restartGame.addEventListener('click',restart);
        restartGame.style.fontSize = '25px';
        restartGame.style.height = '60px';
        restartGame.style.width = '160px';
        endOfGame.appendChild(space);
        endOfGame.appendChild(restartGame);
    } else if (turn == 11) {
        document.getElementsByClassName('questionDisplayed')[0].style.visibility = 'hidden';
        document.getElementsByClassName('answer')[0].style.visibility = 'hidden';
        document.getElementsByClassName('true')[0].style.visibility = 'hidden';
        document.getElementsByClassName('false')[0].style.visibility = 'hidden';
        var endOfGame = document.getElementsByClassName('question')[0];
        endOfGame.textContent = 'Give this another go?';
        endOfGame.style.marginTop = '150px';
        endOfGame.style.fontSize = '72px';
        endOfGame.style.color = (128, 128, 128, 0.8);
        var space = document.createElement('br');
        var restartGame = document.createElement('button');
        restartGame.setAttribute('class', 'restartButton');
        restartGame.textContent = 'Restart Game';
        restartGame.addEventListener('click',restart);
        restartGame.style.fontSize = '25px';
        restartGame.style.height = '60px';
        restartGame.style.width = '160px';
        endOfGame.appendChild(space);
        endOfGame.appendChild(restartGame);
    }

//trigger next question once you click
trueButton.addEventListener('click', responseHandler);
falseButton.addEventListener('click', responseHandler);

//green and red counter to show correct and wrong

//if user do not build 5 landmarks at the end of 12 questions, all buildings disappear

//create animation - visgoths attacking buildings


