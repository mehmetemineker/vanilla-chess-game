"use strict";

const constants = {
    boardLetters: ["A", "B", "C", "D", "E", "F", "G", "H"],
    initialBoardWithChessPieces: [
        ["rook black", "knight black", "bishop black", "queen black", "king black", "bishop black", "knight black", "rook black"],
        ["pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white"],
        ["rook white", "knight white", "bishop white", "queen white", "king white", "bishop white", "knight white", "rook white"]
    ],
    pieces: {
        pawn: "pawn",
        rook: "rook",
        knight: "knight",
        bishop: "bishop",
        queen: "queen",
        king: "king"
    },
    abilityToMoveClassName: "ability-to-move",
    knightAbilityToMoveArray: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
    ]
};

class ChessApp extends HTMLElement {
    constructor() {
        super();
        this.chessBoard = new ChessBoard();
        this.append(this.chessBoard);

        this.initPieces();

        this.whoIsNext = "white";
        this.activePiece = null;
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

        this.addEventListener("click", (e) => {
            let target = e.target;

            if (target.nodeName != this.nodeName) {
                target = e.target.parentElement;
            }

            if (target.classList.contains(constants.abilityToMoveClassName)) {
                var chessApp = document.getElementsByTagName("chess-app")[0];

                chessApp.whoIsNext = chessApp.whoIsNext == "white" ? "black" : "white";
                chessApp.activePiece.rowIndex = this.rowIndex;
                chessApp.activePiece.columnIndex = this.columnIndex;
                chessApp.activePiece.clickToggle = !chessApp.activePiece.clickToggle;
                chessApp.activePiece.removeAllAbilityToMoveClassName();


                if (this.childElementCount == 1) {
                    this.removeChild(this.childNodes[0]);
                }

                this.appendChild(chessApp.activePiece)
            }
        });
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
        this.clickToggle = true;

        this.addEventListener("click", () => {

            var chessApp = document.getElementsByTagName("chess-app")[0];


            if (chessApp.whoIsNext == this.color) {
                chessApp.activePiece = null;
                if (this.clickToggle) {
                    chessApp.activePiece = this;
                }

                this.showAbilityToMove();
            }
        });
    }

    showAbilityToMove() {
        var pieces = document.getElementsByTagName("chess-piece");

        for (let pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
            const piece = pieces[pieceIndex];

            if (piece != this) {
                piece.clickToggle = true;
            }
        }

        this.removeAllAbilityToMoveClassName();

        if (this.clickToggle) {
            switch (this.type) {
                case constants.pieces.bishop:
                    this.moveAbilityRightDownCross();
                    this.moveAbilityRightUpCross();
                    this.moveAbilityLeftDownCross();
                    this.moveAbilityLeftUpCross();
                    break;
                case constants.pieces.rook:
                    this.moveAbilityUpwards();
                    this.moveAbilityDownwards();
                    this.moveAbilityToTheLeft();
                    this.moveAbilityToTheRight();
                    break;
                case constants.pieces.queen:
                    this.moveAbilityRightDownCross();
                    this.moveAbilityRightUpCross();
                    this.moveAbilityLeftDownCross();
                    this.moveAbilityLeftUpCross();
                    this.moveAbilityUpwards();
                    this.moveAbilityDownwards();
                    this.moveAbilityToTheLeft();
                    this.moveAbilityToTheRight();
                    break;
                case constants.pieces.king:
                    this.moveAbilityRightDownCross(2);
                    this.moveAbilityRightUpCross(2);
                    this.moveAbilityLeftDownCross(2);
                    this.moveAbilityLeftUpCross(2);
                    this.moveAbilityUpwards(2);
                    this.moveAbilityDownwards(2);
                    this.moveAbilityToTheLeft(2);
                    this.moveAbilityToTheRight(2);
                    break;
                case constants.pieces.knight:
                    this.moveAbilityKnight();
                    break;
                case constants.pieces.pawn:
                    this.moveAbilityPawn();
                    break;
                default:
                    break;
            }
        }

        this.clickToggle = !this.clickToggle;

        if (document.getElementsByClassName(constants.abilityToMoveClassName).length == 0 && this.clickToggle == false) {
            this.clickToggle = true;
        }
    }

    moveAbilityRightDownCross(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(+this.rowIndex + i, +this.columnIndex + i) == false) break;
        }
    }

    moveAbilityRightUpCross(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(+this.rowIndex - i, +this.columnIndex + i) == false) break;
        }
    }

    moveAbilityLeftDownCross(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(+this.rowIndex + i, +this.columnIndex - i) == false) break;
        }
    }

    moveAbilityLeftUpCross(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(+this.rowIndex - i, +this.columnIndex - i) == false) break;
        }
    }

    moveAbilityUpwards(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(+this.rowIndex - i, this.columnIndex) == false) break;
        }
    }

    moveAbilityDownwards(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(+this.rowIndex + i, this.columnIndex) == false) break;
        }
    }

    moveAbilityToTheRight(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(this.rowIndex, +this.columnIndex + i) == false) break;
        }
    }

    moveAbilityToTheLeft(length = 8) {
        for (let i = 1; i < length; i++) {
            if (this.moveAbility(this.rowIndex, +this.columnIndex - i) == false) break;
        }
    }

    moveAbilityKnight() {
        for (let rowIndex = 0; rowIndex < constants.knightAbilityToMoveArray.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < constants.knightAbilityToMoveArray.length; columnIndex++) {
                const item = constants.knightAbilityToMoveArray[rowIndex][columnIndex];

                if (item === 0) {
                    continue;
                }

                let startRowIndex = rowIndex + (this.rowIndex - Math.floor(constants.knightAbilityToMoveArray.length / 2));
                let startColumnIndex = columnIndex + (this.columnIndex - Math.floor(constants.knightAbilityToMoveArray.length / 2));
                let tile = document.querySelector("chess-board-tile[rowindex='" + startRowIndex + "'][columnindex='" + startColumnIndex + "']");

                if (tile) {
                    let child = tile.childNodes[0];
                    if (!(child && child.color == this.color)) {
                        tile.classList.toggle(constants.abilityToMoveClassName);
                    }
                }
            }
        }
    }

    moveAbilityPawn() {
        let tile1 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex - 1) + "'][columnindex='" + this.columnIndex + "']");
        let tile2 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex - 2) + "'][columnindex='" + this.columnIndex + "']");
        let tile3 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex - 1) + "'][columnindex='" + (+this.columnIndex - 1) + "']");
        let tile4 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex - 1) + "'][columnindex='" + (+this.columnIndex + 1) + "']");

        if (this.color == "black") {
            tile1 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex + 1) + "'][columnindex='" + this.columnIndex + "']");
            tile2 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex + 2) + "'][columnindex='" + this.columnIndex + "']");
            tile3 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex + 1) + "'][columnindex='" + (+this.columnIndex + 1) + "']");
            tile4 = document.querySelector("chess-board-tile[rowindex='" + (+this.rowIndex + 1) + "'][columnindex='" + (+this.columnIndex - 1) + "']");
        }

        if (tile1) {
            let child = tile1.childNodes[0];
            if (!child) {
                tile1.classList.toggle(constants.abilityToMoveClassName);
            }
        }

        if (!(tile1 && tile1.childNodes[0])) {
            if (tile2 && this.rowIndex == (this.color == "white" ? 6 : 1)) {
                let child = tile2.childNodes[0];
                if (!(child && child.color == this.color)) {
                    tile2.classList.toggle(constants.abilityToMoveClassName);
                }
            }
        }

        if (tile3) {
            let child = tile3.childNodes[0];
            if (!(child && child.color == this.color)) {
                tile3.classList.toggle(constants.abilityToMoveClassName);
            }

            if (!child) {
                tile3.classList.toggle(constants.abilityToMoveClassName);
            }
        }

        if (tile4) {
            let child = tile4.childNodes[0];
            if (!(child && child.color == this.color)) {
                tile4.classList.toggle(constants.abilityToMoveClassName);
            }

            if (!child) {
                tile4.classList.toggle(constants.abilityToMoveClassName);
            }
        }
    }

    moveAbility(rowIndex, columnIndex) {
        let tile = document.querySelector("chess-board-tile[rowindex='" + rowIndex + "'][columnindex='" + columnIndex + "']");

        if (tile) {
            let child = tile.childNodes[0];

            if ((child && child.color == this.color)) {
                return false;
            }

            tile.classList.add(constants.abilityToMoveClassName);

            if ((child && child.color != this.color)) {
                return false;
            }
        } else {
            return false;
        }

        return true;
    }

    removeAllAbilityToMoveClassName() {
        let tiles = document.getElementsByTagName("chess-board-tile");

        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            tile.classList.remove(constants.abilityToMoveClassName);
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