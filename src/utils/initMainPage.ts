import { DOM_ELEMENTS_IDS } from "../types/index";

const root = document.querySelector("#root");

export const initMainPage = (): void => {
  if (!root) return;

  const mainBoardContainer = document.createElement("div");
  mainBoardContainer.classList.add("mainBoardContainer");
  mainBoardContainer.id = DOM_ELEMENTS_IDS.Game_Board;

  root.appendChild(mainBoardContainer);
};
