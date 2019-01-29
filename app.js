"use strict";
const chessPiecesArray = ["pawn", "rook", "knight", "bishop", "queen", "king"];
const letterArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
const initialBoardWithChessPieces = [
    ["rook black", "knight black", "bishop black", "queen black", "king black", "bishop black", "knight black", "rook black"],
    ["pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white"],
    ["rook white", "knight white", "bishop white", "queen white", "king white", "bishop white", "knight white", "rook white"]
];

window.onload = () => {
    boardCreate();
    chessPiecesInit();
    document.getElementById("loading").classList.add("display-none");
};

function boardCreate() {
    let chessApp = document.getElementById("chessApp");
    let board = document.createElement("div");
    board.className = "board";

    for (let i = 1; i <= 8; i++) {
        let row = document.createElement("div");
        row.className = "row";

        board.appendChild(row);

        for (let j = 1; j <= 8; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.name = letterArray[j - 1] + (9 - i);

            tile.dataset.rowIndex = i - 1;
            tile.dataset.columnIndex = j - 1;

            if ((i + j) % 2 == 0) {
                tile.classList.add("tile-even");
            } else {
                tile.classList.add("tile-odd");
            }

            row.appendChild(tile);
        }
    }

    chessApp.appendChild(board);
    chessApp.prepend(board);
}

function chessPiecesInit() {
    for (let indexRow = 0; indexRow < 8; indexRow++) {
        for (let indexColumn = 0; indexColumn < 8; indexColumn++) {
            let arrayItem = initialBoardWithChessPieces[indexRow][indexColumn];

            if (arrayItem !== "") {
                let tile = document.querySelector("[data-row-index='" + indexRow + "'][data-column-index='" + indexColumn + "']");
                let piece = document.createElement("div");
                piece.className = "chess-piece " + arrayItem;

                tile.appendChild(piece);
            }
        }
    }
}