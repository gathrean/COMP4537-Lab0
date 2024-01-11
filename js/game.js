/**
 * Game class
 */
class Game {

    /**
     * Static variables for the Game class
     */
    static nextExpected = 1;    // Next expected button number
    static buttonsCount = 0;    // Number of buttons to be created (initial)
    static intervalId = null;   // Interval ID used for starting and resetting the game
    static buttons = [];        // Array of buttons
    static excellentMemoryAlert = "Excellent Memory!"; // Excellent memory alert message
    static wrongOrderAlert = "Wrong Order!"; // Wrong order alert message

    /**
     * Static function to reset the game
     */
    static resetGame() {
        Game.nextExpected = 1;
        Game.buttonsCount = 0;
        Game.buttons = [];

        clearInterval(Game.intervalId);

        document.querySelectorAll('.gameButton').forEach(button => {
            button.style.display = 'none';
            button.removeEventListener('click', button.onClick);
        });

        document.getElementById('submitButton').disabled = false;
    }

    /**
     * Static function to scatter the buttons
     */
    static scatterButtons() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        for (const button of Game.buttons) {
            const newX = Math.random() * (windowWidth - 100);
            const newY = Math.random() * (windowHeight - 100);

            button.element.style.position = 'absolute';
            button.element.style.left = `${newX}px`;
            button.element.style.top = `${newY}px`;
            button.element.style.display = 'block';
        }
    }

    /**
     * Static function to start the game
     * @param {*} numButtons
     */
    static startGame(numButtons) {
        Game.resetGame();
        Game.buttonsCount = numButtons;

        for (let i = 1; i <= numButtons; i++) {
            const newButton = new Button(i, Game.getRandomColor());
            document.body.appendChild(newButton.element);
            Game.buttons.push(newButton);
        }

        setTimeout(() => {
            Game.scatterButtons();
            Game.intervalId = setInterval(Game.scatterButtons, 2000);
        }, numButtons * 1000);
    }

    /**
     * Static function to get a random color
     * @returns {string} color code
     */
    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

/**
 * Function to create the form
 */
function createForm() {
    const formContainer = document.createElement('div');

    // Form HTML
    formContainer.innerHTML = `
        <p>How many buttons to create?</p>
        <form id="buttonForm">
            <input type="text" id="numButtons">
            <input type="submit" value="Go!" id="submitButton">
        </form>
    `;

    // Append the form to the body
    document.body.appendChild(formContainer);

    // Event listener for the form submission
    document.getElementById('buttonForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the form from submitting

        const numButtons = parseInt(document.getElementById('numButtons').value);

        // Checker to see if the user entered a valid number (between 3 and 7)
        if (numButtons >= 3 && numButtons <= 7 && !isNaN(numButtons)) {
            Game.startGame(numButtons);
            formContainer.style.display = 'none';
        } else {
            alert("Invalid number. Please enter a number between 3 and 7.");
        }
    });
}

/**
 * Function to render the form
 */
function render() {
    createForm();
}

// When the DOM is loaded, render the form
document.addEventListener('DOMContentLoaded', render);