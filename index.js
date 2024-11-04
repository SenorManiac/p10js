let start = null;
let end = null;
let resetButton = document.getElementById('btn');


function createChessboard() {
    const chessboard = document.getElementById('chessboard');
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        const x = Math.floor(i / 8);
        const y = i % 8;

        if ((x + y) % 2 === 0) {
            cell.style.backgroundColor = 'darkgrey'; 
        } else {
            cell.style.backgroundColor = '#d3d3d3'; 
        }
        cell.addEventListener('click', handleCellClick);
        chessboard.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    const x = Math.floor(cellIndex / 8);
    const y = cellIndex % 8;

    if (!start) {
        start = [x, y];
        event.target.classList.add('start');
    } else if (!end) {
        end = [x, y];
        event.target.classList.add('end');
        const path = shortestKnightMoves(start, end);
        console.log('Shortest path:', path);
        highlightPath(path);
    }
}

function highlightPath(path) {
    const cells = document.querySelectorAll('.cell');
    path.forEach(([x, y], index) => {
        const cellIndex = x * 8 + y;
        cells[cellIndex].classList.add('highlight');
        cells[cellIndex].textContent = index + 1; 
    });
}

function shortestKnightMoves(start, end) {
    const directions = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
    const queue = [[start, 0, []]]; 
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
        const [currentPosition, moves, path] = queue.shift();
        if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
            return path.concat([currentPosition]);
        }

        for (const direction of directions) {
            const newPosition = [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
            if (newPosition[0] >= 0 && newPosition[0] < 8 && newPosition[1] >= 0 && newPosition[1] < 8 && !visited.has(newPosition.toString())) {
                visited.add(newPosition.toString());
                queue.push([newPosition, moves + 1, path.concat([currentPosition])]);
            }
        }
    }

}

function reset() { 
    start = null;
    end = null;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('start', 'end', 'highlight');
        cell.textContent = '';
    });
}

createChessboard();

resetButton.addEventListener('click', reset);