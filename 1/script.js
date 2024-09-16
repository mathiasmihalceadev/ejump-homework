const redCircle = document.querySelector('#red-circle');
const redSquare = document.querySelector('#red-square');
const blueCircle = document.querySelector('#blue-circle');
const blueSquare = document.querySelector('#blue-square');

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function handleDrop(event, color) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const draggableElement = document.querySelector(`#${data}`);

    if (draggableElement.classList.contains(color)) {
        event.target.appendChild(draggableElement);
        draggableElement.classList.add('border');
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

[redCircle, blueCircle].forEach(element => element.addEventListener('dragstart', handleDragStart));

redSquare.addEventListener('drop', (event) => handleDrop(event, 'red'));
blueSquare.addEventListener('drop', (event) => handleDrop(event, 'blue'));

[redSquare, blueSquare].forEach(element => element.addEventListener('dragover', handleDragOver));
