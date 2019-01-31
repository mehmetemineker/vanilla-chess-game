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
    movingPossibleClassName: "moving-possible",
    pointClassName: "point",
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
        ["", "", "", "", "knight white", "", "", ""],
        ["", "", "bishop white", "", "", "", "", ""],
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
            let point = document.createElement("div");

            point.className = "point";

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

            tile.appendChild(point);
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

            let tile = document.querySelector("." + constants.tileClassName + "[data-row-index='" + indexRow + "'][data-column-index='" + indexColumn + "']");
            let piece = document.createElement("div");
            piece.className = constants.chessPieceClassName + " " + arrayItem;

            let splitItem = arrayItem.split(" ");

            piece.dataset.features = JSON.stringify({
                type: splitItem[0],
                color: splitItem[1],
                positionLetter: tile.dataset.nameLetter,
                positionNumber: +tile.dataset.nameNumber,
                positionRowIndex: +tile.dataset.rowIndex,
                positionColumnIndex: +tile.dataset.columnIndex
            });

            piece.addEventListener("click", onPieceClick);
            tile.appendChild(piece);
        }
    }
}

function onPieceClick(e) {
    const pieceFeatures = JSON.parse(e.target.dataset.features);

    if (pieceFeatures.type === constants.knight) {
        knightMovingAbility(pieceFeatures);
    } else if (pieceFeatures.type === constants.bishop) {
        bishopMovingAbility(pieceFeatures);
    }
}

function knightMovingAbility(pieceFeatures) {
    const movesArray = [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
    ];

    for (let indexRow = 0; indexRow < 5; indexRow++) {
        for (let indexColumn = 0; indexColumn < 5; indexColumn++) {
            const item = movesArray[indexRow][indexColumn];

            if (item === 0) {
                continue;
            }

            let startRowIndex = indexRow + pieceFeatures.positionRowIndex - 2;
            let startColumnIndex = indexColumn + pieceFeatures.positionColumnIndex - 2;
            let tile = document.querySelector("." + constants.tileClassName + "[data-row-index='" + startRowIndex + "'][data-column-index='" + startColumnIndex + "']");

            if (tile) {
                let child = tile.childNodes[1];
                if (!(child && child.classList.contains(pieceFeatures.color))) {
                    tile.classList.toggle(constants.movingPossibleClassName);
                }
            }
        }
    }
}

function bishopMovingAbility(pieceFeatures) {
    const movesArray = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    ];

    for (let indexRow = 0; indexRow < 15; indexRow++) {
        for (let indexColumn = 0; indexColumn < 15; indexColumn++) {
            const item = movesArray[indexRow][indexColumn];

            if (item === 0) {
                continue;
            }

            let startRowIndex = indexRow + pieceFeatures.positionRowIndex - 7;
            let startColumnIndex = indexColumn + pieceFeatures.positionColumnIndex - 7;
            let tile = document.querySelector("." + constants.tileClassName + "[data-row-index='" + startRowIndex + "'][data-column-index='" + startColumnIndex + "']");

            if (tile) {
                let child = tile.childNodes[1];
                if (!(child && child.classList.contains(pieceFeatures.color))) {
                    tile.classList.toggle(constants.movingPossibleClassName);
                }
            }
        }
    }
}

function clearMovingAbility() {
    var points = document.getElementsByClassName(constants.pointClassName);

    while (points[0]) {
        points[0].parentNode.removeChild(points[0]);
    }

    var tiles = document.getElementsByClassName("tile");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove(constants.movingPossibleClassName);
    }
}