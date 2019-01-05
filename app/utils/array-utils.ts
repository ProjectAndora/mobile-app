export const replace = <T extends any>(array: T[], index: number, newValue: T) => [
  ...array.slice(0, index),
  newValue,
  ...array.slice(index + 1),
]

export const trice = <T extends any>(generator: (index: number) => T) => {
  const values: T[] = []
  for (let i = 0; i < 3; i++) {
    values.push(generator(i))
  }

  return values
}
