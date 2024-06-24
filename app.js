let popupBtn = document.getElementById("popup");
let container = document.querySelector(".container");
let containerSize = 960;

container.style.height = `${containerSize}px`;
container.style.width = `${containerSize}px`;

function createGrid(squareQuantity) {
    let squareSize = containerSize / squareQuantity;
    let totalSquares = Math.pow(squareQuantity, 2);

    for (let i = 0; i < totalSquares; i++) {
        let square = document.createElement("div");
        square.className = "box";
        square.style.height = `${squareSize}px`;
        square.style.width = `${squareSize}px`;
        container.appendChild(square);
    }
}

createGrid(16); // Initial grid creation with default size
addColoringEvent();

popupBtn.addEventListener("click", () => {
    container.innerHTML = ""; // Clear existing grid
    let userInput = prompt("Enter the number of squares per side (max 100):");

    let numSquares = parseInt(userInput);
    if (isNaN(numSquares) || numSquares < 1 || numSquares > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    createGrid(numSquares); // Create new grid with user input
    addColoringEvent(); // Add event listeners for coloring
});

function addColoringEvent() {
    let isMouseDown = false;
    let squares = document.querySelectorAll(".box");

    function getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    squares.forEach(square => {
        square.addEventListener("mousedown", function (e) {
            if (e.button === 0) {
                isMouseDown = true;
                square.style.backgroundColor = getRandomColor();
            }
        });

        square.addEventListener("mouseover", function () {
            if (isMouseDown) {
                square.style.backgroundColor = getRandomColor();
            }
        });

        square.addEventListener("mouseup", function () {
            isMouseDown = false;
        });
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
}
