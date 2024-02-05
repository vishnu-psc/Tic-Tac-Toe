// Select all the boxes on the game board
let boxes = document.querySelectorAll(".box");

// Select the reset button
let rstBtn = document.querySelector("#reset-btn");

// Select the new game button
let newBtn = document.querySelector("#new-btn");

// Select the message container that displays the winner or draw message
let msgContainer = document.querySelector(".msg-container");

// Select the message text within the message container
let message = document.querySelector("#msg");

// Boolean variable to keep track of whose turn it is, true for 'O' and false for 'X'
let turnO = true;

// Initialize count to track the number of box clicks
let count = 0;


/**
 * The winPattern array represents all possible winning combinations in a game of Tic Tac Toe.
 * Each sub-array is a combination of three box indexes that would constitute a win. 
 * The combinations are sorted in the order of rows, columns, and then the diagonals.
 *
 * @type {number[][]}
 */
let winPattern = [
    // Rows from top to bottom
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns from left to right
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

/**
 * Resets the game by setting the turn to 'O', enabling boxes, and hiding the message container.
 */
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

// Select all boxes and add event listener to each one
boxes.forEach((box) => {

    // Add click event listener to the box
    box.addEventListener("click", () => {
        // Log that the box is clicked
        console.log("Box is clicked!");

        // If it's O's turn, set the box text to 'O' and switch to X's turn.
        // If it's X's turn, set the box text to 'X' and switch to O's turn.
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }

        // Disable the box after it's clicked
        box.disabled = true;

        // Increment the count after each click
        count++;

        // Check if there's a winner
        let isWinner = checkWinner();

        // If all boxes are clicked and there's no winner, declare the game as a draw
        if (count == 9 && !isWinner) {
            gameDraw();
        }
    })
});


/**
 * Displays a message indicating that the game is a draw.
 */
const gameDraw = () => {
    /**
     * Update the message element with the draw message.
     */
    msg.innerText = `Game is Draw.`;
    /**
     * Remove the 'hide' class from the message container to display the draw message.
     */
    msgContainer.classList.remove("hide");
    /**
     * Disable all the game boxes to prevent further interactions as the game is a draw.
     */
    disableBoxes();
}

/**
 * Disables all the boxes in the given array.
 * @param {Array} boxes - The array of boxes to be disabled.
 */
const disableBoxes = (boxes) => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

/**
 * Enable all the input boxes in the given array of boxes.
 *
 * @param {Array} boxes - An array of input boxes
 * @returns {void}
 */
const enableBoxes = () => {
    // Loop through each input box
    for (let box of boxes) {
        box.disabled = false; // Enable the input box
        box.innerText = ""; // Set the input box value to empty
    }
}

/**
 * Displays the winner in the message container.
 * @param {string} winner - the name of the winner
 * @return {void} 
 */
const showWinner = (winner) => {
    // Update the message text to display the winner
    msg.innerText = `Congratulation, Winner is ${winner}`;

    // Remove the "hide" class from the message container
    msgContainer.classList.remove("hide");

    // Disable the game boxes
    disableBoxes();
}

/**
 * Checks for a winner based on the win patterns
 */
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Check if all positions are filled
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            // Check if all positions have the same value
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner");
                showWinner(pos1Val);
            }
        }

    }
}

/**
 * This function adds event listeners to the new game and reset game buttons.
 * When either of these buttons are clicked, the resetGame function is called.
 */

// Add an event listener to the new game button
// When the new game button is clicked, the resetGame function is executed
newBtn.addEventListener("click", resetGame);

// Add an event listener to the reset game button
// When the reset game button is clicked, the resetGame function is executed
rstBtn.addEventListener("click", resetGame);
