document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let previousInput = "";
    let operator = null;

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate() {
        let result;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        if (isNaN(num1) || isNaN(num2)) return;

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num2 !== 0 ? num1 / num2 : "Error"; // Prevent division by zero
                break;
            default:
                return;
        }

        currentInput = result.toString();
        previousInput = "";
        operator = null;
        updateDisplay(currentInput);
    }

    document.querySelector(".buttons").addEventListener("click", function (event) {
        const value = event.target.getAttribute("data-value");

        if (!value) return; // Ignore clicks on empty spaces

        if (!isNaN(value) || value === ".") {
            if (value === "." && currentInput.includes(".")) return;
            currentInput += value;
            updateDisplay(currentInput);
        } 
        else if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = null;
            updateDisplay("0");
        } 
        else if (value === "←") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || "0");
        } 
        else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput === "") return;
            if (previousInput !== "") calculate();
            operator = value;
            previousInput = currentInput;
            currentInput = "";
        } 
        else if (value === "=") {
            calculate();
        }
    });
});
