"use strict";
const constants = {
    chessAppId: "chessApp",
    loadingId: "loading",
    boardClassName: "board",
    rowClassName: "row",
    tileClassName: "tile",
    tileEvenClassName: "tile-even",
    tileOddClassName: "tile-odd",
    chessPieceClassName: "chess-piece",
    displayNoneClassName: "display-none",
    loadingDummyTimeOut: 750,
    pawn: "pawn",
    rook: "rook",
    knight: "knight",
    bishop: "bishop",
    queen: "queen",
    king: "king",
    chessPiecesArray: ["pawn", "rook", "knight", "bishop", "queen", "king"],
    letterArray: ["A", "B", "C", "D", "E", "F", "G", "H"],
    initialBoardWithChessPieces: [
        ["rook black", "knight black", "bishop black", "queen black", "king black", "bishop black", "knight black", "rook black"],
        ["pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white"],
        ["rook white", "knight white", "bishop white", "queen white", "king white", "bishop white", "knight white", "rook white"]
    ]
};

window.onload = () => {
    boardCreate();
    chessPiecesInit();

    setTimeout(() => {
        document.getElementById(constants.loadingId).classList.add(constants.displayNoneClassName);
    }, constants.loadingDummyTimeOut);
};

function boardCreate() {
    let chessApp = document.getElementById(constants.chessAppId);
    let board = document.createElement("div");
    board.className = constants.boardClassName;

    for (let i = 1; i <= 8; i++) {
        let row = document.createElement("div");
        row.className = constants.rowClassName;

        board.appendChild(row);

        for (let j = 1; j <= 8; j++) {
            let tile = document.createElement("div");
            tile.classList.add(constants.tileClassName);
            tile.dataset.name = constants.letterArray[j - 1] + (9 - i);

            tile.dataset.nameLetter = constants.letterArray[j - 1];
            tile.dataset.nameNumber = 9 - i;

            tile.dataset.rowIndex = i - 1;
            tile.dataset.columnIndex = j - 1;

            if ((i + j) % 2 == 0) {
                tile.classList.add(constants.tileEvenClassName);
            } else {
                tile.classList.add(constants.tileOddClassName);
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
            let arrayItem = constants.initialBoardWithChessPieces[indexRow][indexColumn];

            if (arrayItem === "") {
                continue;
            }

            let tile = document.querySelector("[data-row-index='" + indexRow + "'][data-column-index='" + indexColumn + "']");
            let piece = document.createElement("div");
            piece.className = constants.chessPieceClassName + " " + arrayItem;

            let splitItem = arrayItem.split(" ");

            piece.dataset.type = splitItem[0];
            piece.dataset.color = splitItem[1];

            piece.dataset.positionLetter = tile.dataset.nameLetter;
            piece.dataset.positionNumber = tile.dataset.nameNumber;

            tile.addEventListener("click", onPieceClick);
            tile.appendChild(piece);
        }
    }
}

function onPieceClick(e) {
    const pieceFeatures = {
        type: e.target.dataset.type,
        color: e.target.dataset.color,
        positionLetter: e.target.dataset.positionLetter,
        positionNumber: e.target.dataset.positionNumber
    };

    if (pieceFeatures.type === constants.knight) {
        knightMovingAbility(pieceFeatures);
    }
}

function knightMovingAbility(pieceFeatures) {
    console.log(pieceFeatures);
}
