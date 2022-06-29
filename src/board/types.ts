export type GamePieceRolesType = "KING" | "NORMAL";
export type GamePieceColorsType = "WHITE" | "BLACK";
export type GamePieceType =
  | "EMPTY"
  | `${GamePieceColorsType}-${GamePieceRolesType}`;
export type GameBoardType = [GamePieceType[]] | any[]; // Also can be written as `Array<Array<GamePiece>>`
