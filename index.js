// const startButton = document.querySelector(".start-btn");
// const gameScreen = document.getElementById("game-screen");
// const displayArea = document.getElementById("display-area");

// const colors = [
//     { name: "red", code: "red", key: "d" },
//     { name: "green", code: "green", key: "f" },
//     { name: "blue", code: "blue", key: "j" },
//     { name: "black", code: "black", key: "k" }
// ];

// let currentColor = null;

// startButton.addEventListener("click", () => {
//     document.querySelector(".instructions").style.display = "none";
//     startButton.style.display = "none";
//     gameScreen.style.display = "block";
//     nextTrial();
// });

// function nextTrial() {
//     // Randomize between text or rectangle
//     const randomType = Math.random() > 0.5 ? "text" : "rectangle";
//     currentColor = colors[Math.floor(Math.random() * colors.length)];

//     displayArea.innerHTML = ""; // Clear previous display

//     if (randomType === "text") {
//         // Display the name of the color
//         const colorText = document.createElement("span");
//         colorText.textContent = currentColor.name;
//         colorText.style.color = currentColor.code;
//         displayArea.appendChild(colorText);
//     } else {
//         // Display a rectangle of the color
//         const rectangle = document.createElement("div");
//         rectangle.className = "rectangle";
//         rectangle.style.backgroundColor = currentColor.code;
//         displayArea.appendChild(rectangle);
//     }

//     // Listen for user input
//     listenForInput();
// }

// function listenForInput() {
//     document.addEventListener("keydown", function handler(event) {
//         // Check if the pressed key is one of the allowed keys
//         const validKeys = ["d", "f", "j", "k"];
//         if (!validKeys.includes(event.key)) {
//             return; // Ignore keys that aren't in the valid keys list
//         }

//         // If the key is valid, check if it's correct
//         if (event.key === currentColor.key) {
//             console.log("Correct!");
//         } else {
//             console.log("Incorrect!");
//         }

//         // Remove the event listener and move to the next trial
//         document.removeEventListener("keydown", handler);
//         setTimeout(nextTrial, 1000); // Move to the next trial
//     });
// }
const startButton = document.querySelector(".start-btn");
const gameScreen = document.getElementById("game-screen");
const displayArea = document.getElementById("display-area");

const colors = [
    { name: "red", code: "red", key: "d" },
    { name: "green", code: "green", key: "f" },
    { name: "blue", code: "blue", key: "j" },
    { name: "black", code: "black", key: "k" },
];

let currentColor = null;
let correctCount = 0;
let mistakeCount = 0;
let currentRound = 0;
let isWarmup = true; // Warmup phase for first 5 rounds
let timer; // Timer for the 60-second countdown

startButton.addEventListener("click", () => {
    document.body.style.cursor = 'none';
    document.querySelector(".instructions").style.display = "none";
    startButton.style.display = "none";
    gameScreen.style.display = "block";
    nextTrial();
});

// Show results at the end of the experiment
function showResults() {
    document.body.style.cursor = 'auto';
    document.body.innerHTML = `
        <div style="text-align: center; font-size: 2rem;">
            <p>Experiment Finished!</p>
            <p>Correct Answers: ${correctCount}</p>
            <p>Mistakes: ${mistakeCount}</p>
        </div>
    `;
}

// Start a 60-second timer after the warmup phase
function startTimer() {
    let timeLeft = 60;
    // const timerDisplay = document.createElement("div");
    // timerDisplay.style.fontSize = "1.5rem";
    // timerDisplay.style.textAlign = "center";
    // timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;
    // document.body.appendChild(timerDisplay);

    timer = setInterval(() => {
        timeLeft--;
        // timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults(); // Show results when timer ends
        }
    }, 1000);
}

// Show a red X for incorrect answers
function showMistakeFeedback() {
    document.getElementById('display-area').style.visibility = "hidden"
    const feedback = document.createElement("div");
    feedback.innerText = "X";
    feedback.style.color = "red";
    feedback.style.fontSize = "5rem";
    feedback.style.position = "absolute";
    feedback.style.top = "60%";
    feedback.style.left = "50%";
    feedback.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(feedback);
    setTimeout(() => {
        feedback.remove();
        document.getElementById('display-area').style.visibility = "visible"
    }, 300); // Remove after 0.5 seconds
}
var listened = false
// Handle user input
function listenForInput() {
    document.addEventListener("keydown", function handler(event) {

        
        const validKeys = ["d", "f", "j", "k"];
        if (!validKeys.includes(event.key)) return; // Ignore invalid keys

        // Check correctness
        if (event.key === currentColor.key) {
            if (isWarmup == false) {
                correctCount++;
            }
            
        } else {
            if (isWarmup == false) {
                mistakeCount++;
            }
            showMistakeFeedback(); // Show feedback for mistakes
        }

        // Move to the next trial immediately
        document.removeEventListener("keydown", handler);
        nextTrial();
    });
}

// Generate the next trial
function nextTrial() {
    currentRound++;
    console.log(currentRound)
    // Check if warmup phase is over
    if (currentRound > 5 && isWarmup) {
        isWarmup = false;
        startTimer(); // Start the timer after warmup
    }

    // Randomize between text or rectangle
    const randomType = Math.random() > 0.5 ? "text" : "rectangle";
    currentColor = colors[Math.floor(Math.random() * colors.length)];

    displayArea.innerHTML = ""; // Clear the previous display
    

    setTimeout(() => {
        if (randomType === "text") {
            // Display the name of the color
            const colorText = document.createElement("span");
            colorText.textContent = currentColor.name;
            colorText.style.color = currentColor.code;
            displayArea.appendChild(colorText);
        } else {
            // Display a rectangle of the color
            const rectangle = document.createElement("div");
            rectangle.className = "rectangle";
            rectangle.style.backgroundColor = currentColor.code;
            displayArea.appendChild(rectangle);
            
        }
        listenForInput(); // Start listening for input
    }, 200);
    

    
}
