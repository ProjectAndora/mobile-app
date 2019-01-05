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

export const triceMatch = <T extends any>(getValue: (index: number) => T, match: T) => {
  for (let i = 0; i < 3; i++) {
    if (getValue(i) !== match) {
      return false
    }
  }

  return true
}

export const array3HasRow = <T extends any>(array: T[][], value: T) => {
  if (
    triceMatch(i => array[i][i], value) ||
    triceMatch(i => array[i][2 - i], value)
  ) {
    return true
  }

  for (let i = 0; i < 3; i++) {
    if (
      triceMatch(j => array[i][j], value) ||
      triceMatch(j => array[j][i], value)
    ) {
      return true
    }
  }

  return false
}
