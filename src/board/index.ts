import { GameBoardType, GamePieceType } from "./types";
import { gameSettings } from "../settings/index";
import { DOM_ELEMENTS_IDS } from "../types/index";

export let mainBoard: GameBoardType = [];
export let remainingWhitePieces: number = 9;
export let remainingBlackPieces: number = 9;
export let selectedGamePieceCords: string | null = null;

export const createBoard = (): GameBoardType => {
  for (let i = 0; i < gameSettings.boardHeight; i++) {
    let row: Array<GamePieceType> = [];

    for (let j = 0; j < gameSettings.boardWidth; j++) {
      row.push("EMPTY");
    }

    mainBoard.push(row);
    row = [];
  }

  return mainBoard;
};

export const setGamePieceRoles = (gameBoard: GameBoardType) => {
  // The last two rows should be black
  // And the first two rows should be white

  const rowIndexes = [0, 1, gameBoard.length - 2, gameBoard.length - 1];

  rowIndexes.forEach((index) => {
    gameBoard[index].forEach((_: any, rowItemIndex: number) => {
      switch (true || false) {
        case index < 2:
          if (index % 2 === 0 && rowItemIndex % 2 === 0) {
            gameBoard[index][rowItemIndex] = "BLACK-NORMAL";
          } else if (index % 2 !== 0 && rowItemIndex % 2 !== 0) {
            gameBoard[index][rowItemIndex] = "BLACK-NORMAL";
          }
          break;
        case index > 2:
          if (index % 2 === 0 && rowItemIndex % 2 === 0) {
            gameBoard[index][rowItemIndex] = "WHITE-NORMAL";
          } else if (index % 2 !== 0 && rowItemIndex % 2 !== 0) {
            gameBoard[index][rowItemIndex] = "WHITE-NORMAL";
          }
          break;
      }
    });
  });

  return gameBoard;
};

export const checkForLose = () => {
  let lostMessage: string = "";
  const lostHeaderMessage = document.createElement("h1");
  lostHeaderMessage.id = "LOST_HEADER_MESSAGE";
  const mainBoardContainer = document.querySelector(
    `#${DOM_ELEMENTS_IDS.Game_Board}`
  );
  const resetGameBtn = document.querySelector(
    `#${DOM_ELEMENTS_IDS.Reset_Game_Btn}`
  );
  const root = document.querySelector("#root");

  switch (true || false) {
    case remainingBlackPieces <= 1:
      lostMessage = "Black Lost!";
      break;
    case remainingWhitePieces <= 1:
      lostMessage = "White Lost!";
      break;
    default:
      return;
  }

  lostHeaderMessage.innerText = lostMessage;
  mainBoardContainer?.classList.add("board-hidden");
  resetGameBtn?.classList.remove("reset-btn-hidden");
  root?.appendChild(lostHeaderMessage);
};

export const makeMove = (moveCoordinates: string, gameBoard: GameBoardType) => {
  if (!selectedGamePieceCords) return;

  const pieceX = parseInt(moveCoordinates.split("-")[1]);
  const pieceY = parseInt(moveCoordinates.split("-")[0]);
  const moveToDomPiece = document.getElementById(`${pieceY}-${pieceX}`);

  const selectedPieceX = parseInt(selectedGamePieceCords.split("-")[1]);
  const selectedPieceY = parseInt(selectedGamePieceCords.split("-")[0]);
  const selectedDomPiece = document.getElementById(
    `${selectedPieceY}-${selectedPieceX}`
  );

  if (moveToDomPiece?.getAttribute("piece-role") !== "EMPTY") {
    if (
      selectedDomPiece?.getAttribute("piece-role") ===
      moveToDomPiece?.getAttribute("piece-role")
    ) {
      return;
    }

    gameBoard[pieceY][pieceX] = "EMPTY";
    gameBoard[pieceY][pieceX] = gameBoard[selectedPieceY][selectedPieceX];
    gameBoard[selectedPieceY][selectedPieceX] = "EMPTY";

    switch (moveToDomPiece?.getAttribute("piece-role")?.split("-")[0]) {
      case "WHITE":
        remainingWhitePieces -= 1;
        break;
      case "BLACK":
        remainingBlackPieces -= 1;
        break;
    }

    appendBoardToDom(gameBoard);
    selectedGamePieceCords = null;
    checkForLose();
    return;
  }

  gameBoard[pieceY][pieceX] = gameBoard[selectedPieceY][selectedPieceX];
  gameBoard[selectedPieceY][selectedPieceX] = "EMPTY";

  appendBoardToDom(gameBoard);
  selectedGamePieceCords = null;
  checkForLose();
};

export const appendBoardToDom = (gameBoard: GameBoardType): void => {
  const domGameBoard = document.querySelector(
    `#${DOM_ELEMENTS_IDS.Game_Board}`
  );

  if (domGameBoard) domGameBoard.innerHTML = "";

  gameBoard.forEach((row, i) => {
    const domRow = document.createElement("div");
    domRow.classList.add("row");
    domRow.setAttribute(
      "pattern-type",
      i % 2 === 0 ? "black-white" : "white-black"
    );

    row.forEach((rowItem: GamePieceType, j: number) => {
      const domGamePiece = document.createElement("div");
      domGamePiece.classList.add("gamePiece");
      domGamePiece.id = `${i}-${j}`;
      domGamePiece.setAttribute("piece-role", rowItem);
      domGamePiece.addEventListener("click", () => {
        if (
          domGamePiece.getAttribute("piece-role") === "EMPTY" &&
          !selectedGamePieceCords
        )
          return;
        if (selectedGamePieceCords) {
          makeMove(domGamePiece.id, mainBoard);
          return;
        }

        selectedGamePieceCords = domGamePiece.id;
      });

      domRow.appendChild(domGamePiece);
    });

    domGameBoard?.appendChild(domRow);
  });
};

export const initMainGameBoard = (): void => {
  const mainBoardContainer = document.querySelector(
    `#${DOM_ELEMENTS_IDS.Game_Board}`
  );
  const resetBtn = document.querySelector(
    `#${DOM_ELEMENTS_IDS.Reset_Game_Btn}`
  );
  const lostHeaderMessage = document.querySelector("#LOST_HEADER_MESSAGE");
  lostHeaderMessage?.classList.add("reset-btn-hidden");
  resetBtn?.classList.add("reset-btn-hidden");
  mainBoardContainer?.classList.remove("board-hidden");
  if (mainBoardContainer) mainBoardContainer.innerHTML = "";

  mainBoard = [];

  remainingBlackPieces = 9;
  remainingWhitePieces = 9;

  appendBoardToDom(setGamePieceRoles(createBoard()));
};
