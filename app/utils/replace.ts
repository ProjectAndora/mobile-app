export const replace = <T extends any>(array: T[], index: number, newValue: T) => [
  ...array.slice(0, index),
  newValue,
  ...array.slice(index + 1),
]
