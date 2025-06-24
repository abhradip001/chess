const socket = io();
const chess = new Chess(); 
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    board.forEach((row, rowindex) => {
        row.forEach((square , squareindex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square" , 
                (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row= rowindex;
            squareElement.dataset.col = squareindex;

            if(square){
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === "w" ? "white" : "black");
                
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if(pieceElement.draggable){
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });
                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if(draggedPiece){
                    const targetSource = {
                        row : parseInt(squareElement.dataset.row),
                        col : parseInt(squareElement.dataset.col),
                    };

                    handleMove(sourceSquare, targetSource);
                }
            });

            // FIX: append each squareElement to the board here
            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = (source, target) => {
    let promotion = 'q';
    // Check if pawn is moving to last rank
    const piece = chess.board()[source.row][source.col];
    if (piece && piece.type === 'p' && (target.row === 0 || target.row === 7)) {
        promotion = prompt("Promote to (q, r, b, n):", "q") || "q";
        if (!["q", "r", "b", "n"].includes(promotion)) promotion = "q";
    }
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion
    };
    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        w: { p: "♙", n: "♘", b: "♗", r: "♖", q: "♕", k: "♔" },
        b: { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" }
    };
    if (!piece) return "";
    return unicodePieces[piece.color][piece.type] || "";
};


socket.on("playerRole", (role) => {
    playerRole = role;
    if (role === "b") {
        boardElement.classList.add("flipped");
    } else {
        boardElement.classList.remove("flipped");
    }
    renderBoard();
});

socket.on("spectatorRole", () =>{
    playerRole = null;
    boardElement.classList.remove("flipped");
    renderBoard();
});

socket.on("spectatorRole", () =>{
    playerRole = null;
    renderBoard();
});

socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on("move", (move) => {
    chess.load(move);
    renderBoard();
});

renderBoard();