import { DOM_ELEMENTS_IDS } from "../types/index";
import { initMainGameBoard } from "../board/index";

const root = document.querySelector("#root");

export const initMainPage = (): void => {
  if (!root) return;

  const mainBoardContainer = document.createElement("div");
  mainBoardContainer.classList.add("mainBoardContainer");
  mainBoardContainer.id = DOM_ELEMENTS_IDS.Game_Board;

  const resetGameBtn = document.createElement("button");
  resetGameBtn.innerText = "Play again!";
  resetGameBtn.classList.add("reset-btn");
  resetGameBtn.classList.add("reset-btn-hidden");
  resetGameBtn.id = DOM_ELEMENTS_IDS.Reset_Game_Btn;
  resetGameBtn.addEventListener("click", () => {
    initMainGameBoard();
  });

  root.append(resetGameBtn);
  root.appendChild(mainBoardContainer);
};
