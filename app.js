"use strict";

const constants = {
    boardLetters: ["A", "B", "C", "D", "E", "F", "G", "H"],
    initialBoardWithChessPieces: [
        ["rook black", "knight black", "bishop black", "queen black", "king black", "bishop black", "knight black", "rook black"],
        ["pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black"],
        ["", "", "", "", "knight white", "", "", ""],
        ["", "", "bishop white", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white"],
        ["rook white", "knight white", "bishop white", "queen white", "king white", "bishop white", "knight white", "rook white"]
    ],
    kingAbilityToMoveArray: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ],
    pawnAbilityToMoveArray: [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0]
    ],
    knightAbilityToMoveArray: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
    ],
    bishopAbilityToMoveArray: [
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
    ],
    rookAbilityToMoveArray: [
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    ],
    queenAbilityToMoveArray: [
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]
    ]
};

class ChessApp extends HTMLElement {
    constructor() {
        super();
        this.chessBoard = new ChessBoard();
        this.append(this.chessBoard);

        this.initPieces();
    }

    initPieces() {
        const rows = this.chessBoard.childNodes;

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            const tiles = row.childNodes;

            for (let columnIndex = 0; columnIndex < tiles.length; columnIndex++) {
                const tile = tiles[columnIndex];
                const initItem = constants.initialBoardWithChessPieces[rowIndex][columnIndex].split(" ");

                if (initItem.length == 2) {
                    const type = initItem[0];
                    const color = initItem[1];

                    tile.append(new ChessPiece(type, color, rowIndex, columnIndex));
                }
            }
        }
    }
}

class ChessBoard extends HTMLElement {
    constructor() {
        super();
        this.create();
    }

    create() {
        for (let index = 0; index < 8; index++) {
            this.append(new ChessBoardRow(index));
        }
    }
}

class ChessBoardRow extends HTMLElement {
    constructor(rowIndex) {
        super();
        this._rowIndex = rowIndex;
        this.create();
    }

    create() {
        for (let index = 0; index < 8; index++) {
            this.append(new ChessBoardTile(this._rowIndex, index));
        }
    }
}

class ChessBoardTile extends HTMLElement {
    constructor(rowIndex, columnIndex) {
        super();

        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;

        this.setAttribute("name", constants.boardLetters[columnIndex] + "" + (8 - rowIndex));

        if ((rowIndex + columnIndex) % 2 == 0) {
            this.setAttribute("odd", "");
        }
    }

    get name() {
        return this.getAttribute("name");
    }

    get rowIndex() {
        return this.getAttribute("rowIndex");
    }

    set rowIndex(val) {
        this.setAttribute("rowIndex", val);
    }

    get columnIndex() {
        return this.getAttribute("columnIndex");
    }

    set columnIndex(val) {
        this.setAttribute("columnIndex", val);
    }
}

class ChessPiece extends HTMLElement {
    constructor(type, color, rowIndex, columnIndex) {
        super();

        this.type = type;
        this.color = color;
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;

        this.addEventListener("click", e => {
            this.showAbilityToMove();
        });
    }

    showAbilityToMove() {
        let abilityToMoveArray = constants[this.type + "AbilityToMoveArray"];

        for (let rowIndex = 0; rowIndex < abilityToMoveArray.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < abilityToMoveArray.length; columnIndex++) {
                const item = abilityToMoveArray[rowIndex][columnIndex];

                if (item === 0) {
                    continue;
                }

                let startRowIndex = rowIndex + (this.rowIndex - Math.floor(abilityToMoveArray.length / 2));
                let startColumnIndex = columnIndex + (this.columnIndex - Math.floor(abilityToMoveArray.length / 2));
                let tile = document.querySelector("chess-board-tile[rowindex='" + startRowIndex + "'][columnindex='" + startColumnIndex + "']");

                if (tile) {
                    tile.classList.toggle("deneme");
                }
            }
        }
    }

    get type() {
        return this.getAttribute("type");
    }

    set type(val) {
        this.setAttribute("type", val);
    }

    get color() {
        return this.getAttribute("color");
    }

    set color(val) {
        this.setAttribute("color", val);
    }

    get rowIndex() {
        return this.getAttribute("rowIndex");
    }

    set rowIndex(val) {
        this.setAttribute("rowIndex", val);
    }

    get columnIndex() {
        return this.getAttribute("columnIndex");
    }

    set columnIndex(val) {
        this.setAttribute("columnIndex", val);
    }
}

customElements.define("chess-piece", ChessPiece);
customElements.define("chess-board-tile", ChessBoardTile);
customElements.define("chess-board-row", ChessBoardRow);
customElements.define("chess-board", ChessBoard);
customElements.define("chess-app", ChessApp);