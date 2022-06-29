import { GameBoardType, GamePieceType } from "./types";
import { gameSettings } from "../settings/index";
import { DOM_ELEMENTS_IDS } from "../types/index";

let mainBoard: GameBoardType = [];

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

export const appendBoardToDom = (gameBoard: GameBoardType): void => {
  const domGameBoard = document.querySelector(
    `#${DOM_ELEMENTS_IDS.Game_Board}`
  );

  gameBoard.forEach((row, i) => {
    const domRow = document.createElement("div");
    domRow.classList.add("row");
    domRow.setAttribute(
      "pattern-type",
      i % 2 === 0 ? "black-white" : "white-black"
    );

    row.forEach((rowItem: GamePieceType) => {
      const domGamePiece = document.createElement("div");
      domGamePiece.classList.add("gamePiece");

      domRow.appendChild(domGamePiece);
    });

    domGameBoard?.appendChild(domRow);
  });
};

export const initMainGameBoard = (): void => {
  appendBoardToDom(createBoard());
};
