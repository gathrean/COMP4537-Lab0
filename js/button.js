/**
 * Button class
 */
class Button {

    /**
     * Button Constructor
     * @param {*} number 
     * @param {*} color 
     */
    constructor(number, color) {

        // Number passed to constructor is displayed on the button.
        this.number = number;

        // HTML element
        this.element = document.createElement('button');

        // All buttons will have the same width and height.
        this.element.style.width = '10em';
        this.element.style.height = '5em';

        // Set the specified color for the button.
        this.element.style.backgroundColor = color;

        // Button's text will be the number.
        this.element.textContent = number;

        this.element.classList.add('gameButton');

        // Event listener for button click.
        this.onClickHandler = this.onClick.bind(this);
        this.element.addEventListener('click', this.onClickHandler);
    }

    /**
 * Event Listener for the button when it's clicked.
 */
    onClick() {
        if (this.number === Game.nextExpected) {
            // If the button is clicked in the correct order, the button's text will be the next expected number.
            this.element.textContent = this.number;
            Game.nextExpected++; // Increment the next expected number

            // If the next expected number is greater than the number of buttons, the game is over.
            if (Game.nextExpected > Game.buttonsCount) {
                alert("Excellent Memory! You've clicked all buttons in the correct order.");
            }
        } else {
            alert("Wrong Order! Game Over. Please try again.");
            Game.resetGame();
        }
    }


    hideNumber() {
        this.element.textContent = '';
    }
}