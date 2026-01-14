// let you = document.querySelector('#userscore');
// let comp = document.querySelector('#compscore');

// let y = 0;
// let z = 0;

// const choices = document.querySelectorAll('.choice');
// const computerchoices = ['rock', 'paper', 'scissors'];

// choices.forEach(choice => {
//     choice.addEventListener('click', () => {
//         const userchoice = choice.id;
//         const computerchoice = computerchoices[Math.floor(Math.random() * 3)];

//         console.log("User choice: " + userchoice);
//         console.log("Computer choice: " + computerchoice);

//         if (userchoice === computerchoice) {
//             console.log("It's a tie!");
//         } 
//         else if (
//             (userchoice === 'rock' && computerchoice === 'scissors') ||
//             (userchoice === 'paper' && computerchoice === 'rock') ||
//             (userchoice === 'scissors' && computerchoice === 'paper')
//         ) {
//             y++;
//             you.innerText = y;
//             console.log("You win this round!");
//         } 
//         else {
//             z++;
//             comp.innerText = z;
//             console.log("Computer wins this round!");
//         }
//     });
// });
let you = document.getElementById('userscore');
let comp = document.getElementById('compscore');
let msg = document.getElementById('msg');
let tieText = document.getElementById('tie');

let y = 0;
let z = 0;

const choices = document.querySelectorAll('.choice');
const computerchoices = ['rock', 'paper', 'scissors'];

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userchoice = choice.id;
        const computerchoice = computerchoices[Math.floor(Math.random() * 3)];

        console.log("User choice:", userchoice);
        console.log("Computer choice:", computerchoice);

        // Hide tie text initially
        tieText.style.display = "none";

        if (userchoice === computerchoice) {
            msg.innerText = "It's a tie!";
            msg.style.color = "orange";
            tieText.style.display = "block";
        } 
        else if (
            (userchoice === 'rock' && computerchoice === 'scissors') ||
            (userchoice === 'paper' && computerchoice === 'rock') ||
            (userchoice === 'scissors' && computerchoice === 'paper')
        ) {
            y++;
            you.innerText = y;
            msg.innerText = "You Win 🎉";
            msg.style.color = "green";
        } 
        else {
            z++;
            comp.innerText = z;
            msg.innerText = "Computer Wins 💻";
            msg.style.color = "red";
        }
    });
});
