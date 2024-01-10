class Button {
    constructor(number) {
        this.number = number;
        this.element = document.createElement('button');
        this.element.style.width = '10em';
        this.element.style.height = '5em';
        this.element.textContent = number;
    }
}

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