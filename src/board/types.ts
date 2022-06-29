export type GamePieceType = "EMPTY" | "KING" | "NORMAL";
export type GameBoardType = [GamePieceType[]] | any[]; // Also can be written as `Array<Array<GamePiece>>`
