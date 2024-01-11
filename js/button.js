/**
 * Button class
 */
class Button {

    /**
     * Button Constructor
     * @param {*} number 
     */
    constructor(number) {

        // Number passed to constructor is displayed on the button.
        this.number = number;
        
        // HTML element
        this.element = document.createElement('button');

        // All buttons will have the same width and height.
        this.element.style.width = '10em';
        this.element.style.height = '5em';
        
        // Random color for each button.
        this.element.style.backgroundColor = this.getRandomColor();

        // Button's text will be the number.
        this.element.textContent = number;
        
        this.element.classList.add('gameButton');

        // Event listener for button click.
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    /**
     * Random Color function to be used in the Button constructor
     * @returns {string} color code
     */
    getRandomColor() {

        // HEX digits to randomize the color codes
        const letters = '0123456789ABCDEF';

        // Program uses the Math.random for generating the 6-digit code.
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    /**
     * Event Listener for the button when it's clicked.
     */
    onClick() {
        if (this.number === Button.nextExpected) {
            // If the button is clicked in the correct order, the button's text will be the next expected number.
            this.element.textContent = this.number;
            Button.nextExpected++; // Increment the next expected number

            // If the next expected number is greater than the number of buttons, the game is over.
            if (Button.nextExpected > Button.buttonsCount) {
                alert(excellentMemoryAlert);
            }
        } else {
            alert(wrongOrderAlert);
            Button.resetGame();
        }
    }

    /**
     * Static function to reset the game
     */
    static resetGame() {
        Button.nextExpected = 1;
        Button.buttonsCount = 0;
        Button.buttons = [];

        clearInterval(Button.intervalId);

        document.querySelectorAll('.gameButton').forEach(button => {
            button.style.display = 'none';
            button.removeEventListener('click', this.onClick);
        });

        document.getElementById('submitButton').disabled = false;
    }

    /**
     * Static function to scatter the buttons
     */
    static scatterButtons() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        for (const button of Button.buttons) {
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
        Button.resetGame();
        Button.buttonsCount = numButtons;

        for (let i = 1; i <= numButtons; i++) {
            const newButton = new Button(i);
            document.body.appendChild(newButton.element);
            Button.buttons.push(newButton);
        }

        setTimeout(() => {
            Button.scatterButtons();
            Button.intervalId = setInterval(Button.scatterButtons, 2000);
        }, numButtons * 1000);
    }
}

/**
 * Static variables for the Button class
 */
Button.nextExpected = 1;    // Next expected button number
Button.buttonsCount = 0;    // Number of buttons to be created (initial)
Button.intervalId = null;   // Interval ID used for starting and resetting the game
Button.buttons = [];        // Array of buttons

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

        // Checker to see if user entered a valid number (between 3 and 7)
        if (numButtons >= 3 && numButtons <= 7 && !isNaN(numButtons)) {
            Button.startGame(numButtons);
            formContainer.style.display = 'none';
        } else {
            alert(invalidNumberAlert);
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