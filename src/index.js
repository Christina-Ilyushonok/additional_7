module.exports = function solveSudoku(matrix) {
    return solveSudoku1(matrix, 0, 0);
}

function solveSudoku1(board, row, col) {
    if (col === board[0].length) {
        row++;
        if (row === board.length) {
            return board;
        }
        col = 0;
    }
    if (board[row][col] > 0) {
        return solveSudoku1(board, row, col + 1);
    } else {
        let candidateNumbers = getNumber(board, row, col);
        let iter = candidateNumbers.values();
        let item = iter.next().value;
        while (item){

            board[row][col] = item;
            if (solveSudoku1(board, row, col + 1)) return board;
            board[row][col] = 0;
            item = iter.next().value;
        }
    }
    return false;
}

function getNumber(board, row, col) {
    const intsToAvoid = new Set();
    for (let i = 0; i < board[0].length; i++) {
        if (board[row][i] > 0) {
            intsToAvoid.add(board[row][i]);
        }
    }


    for (let i = 0; i < board.length; i++) {
        if (board[i][col] > 0) {
            intsToAvoid.add(board[i][col]);
        }
    }


    let lowerRowIndex = Math.floor(row / 3) * 3;
    let lowerColumnIndex = Math.floor(col / 3) * 3;

    for (let i = lowerRowIndex; i < lowerRowIndex + 3; i++) {
        for (let j = lowerColumnIndex; j < lowerColumnIndex + 3; j++) {
            if (board[i][j] > 0) {
                intsToAvoid.add(board[i][j]);
            }
        }
    }

    const candidateInts = new Set();
    for (let i = 1; i <= board.length; i++) {
        if (!intsToAvoid.has(i)) {
            candidateInts.add(i);
        }
    }
    return candidateInts;
}
