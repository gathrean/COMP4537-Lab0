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
        this.element.textContent = number;

        // HTML element
        this.element = document.createElement('button');

        // All buttons will have the same width and height.
        this.element.style.width = '10em';
        this.element.style.height = '5em';

        // Button's text will be the number.
        this.element.textContent = number;

        // Random color for each button.
        this.element.style.backgroundColor = this.getRandomColor();

        // Event listener for button click.
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    /**
     * Random Color function to be used in the Button constructor
     * @returns {string} color code
     */
    getRandomColor() {
        const letters = '0123456789ABCDEF'; // HEX digits to randomize the color codes

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
            this.element.textContent = this.number;
            Button.nextExpected++;

            if (Button.nextExpected > Button.buttonsCount) {
                alert(excellentMemoryAlert)
            }
        } else {
            alert(wrongOrderAlert);
        }
    }
}

Button.nextExpected = 1;
Button.buttons = []; // Array of buttons

function createForm() {
    const formContainer = document.createElement('div');

    formContainer.innerHTML = `
        <p>How many buttons to create?</p>
        <form id="buttonForm">
            <input type="text" id="numButtons">
            <input type="submit" value="Go!" id="submitButton">
        </form>
    `;

    document.body.appendChild(formContainer);
}

function render() {
    createForm();
}

document.addEventListener('DOMContentLoaded', render);