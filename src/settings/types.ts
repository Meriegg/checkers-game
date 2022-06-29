export type BoardWidthType = number;
export type BoardHeightType = number;
export type colorSchemeType = "light" | "dark";

export interface SettingsType {
  boardWidth: BoardWidthType;
  boardHeight: BoardHeightType;
  colorScheme: colorSchemeType;
}
