export enum FieldValue {
  Empty,
  Cross,
  Nought,
}

export interface MiniBoardData {
  row: FieldValue
  fields: FieldValue[][]
}

export interface BoardData {
  row: FieldValue
  miniBoards: MiniBoardData[][]
}
