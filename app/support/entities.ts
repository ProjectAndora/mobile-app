export enum FieldValue {
  Empty,
  Cross,
  Nought,
}

export interface BoardState {
  turn: FieldValue,
  values: FieldValue[][][][],
  lastTurn: number[][] | null,
  miniFieldsRows: FieldValue[][],
  row: FieldValue,
}
