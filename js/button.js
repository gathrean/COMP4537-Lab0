// DISCLOSURE: I've used ChatGPT to get started with the following code, 
// and I've fixed and tweaked it to make it work for this project along the way.

// Along the way I've learned a lot about how OOP works in JavaScript.
// Overall this was a solid Lab 0 / Warm-up project.

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
     * It also depends on when the button is clicked.
     */
    onClick() {
        if (this.number === Game.nextExpected) {
            // If the button is clicked in the correct order, the button's text will be the next expected number.
            this.element.textContent = this.number;
            Game.nextExpected++; // Increment the next expected number

            // If the next expected number is greater than the number of buttons, the game is over.
            if (Game.nextExpected > Game.buttonsCount) {
                alert(excellentMemoryAlert);
                this.showNumber();

                setTimeout(() => {
                    Game.startGame();
                }, 3000);
            }
        } else {
            alert(wrongOrderAlert);

            this.showNumber();

            setTimeout(() => {
                Game.startGame();
            }, 3000);
        }
    }

    /**
     * Hide the button's number by setting the text to an empty string.
     * I use this when the buttons are scattering
     */
    hideNumber() {
        this.element.textContent = '';
    }

    /**
     * Show the button's number by setting the text to the number.
     * I use this after an alert
     */
    showNumber() {
        Game.buttons.forEach(button => {
            button.element.textContent = button.number;
        });
    }

}