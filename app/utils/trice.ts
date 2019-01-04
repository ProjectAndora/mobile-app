export const trice = <T extends any>(generator: (index: number) => T) => {
  const values: T[] = []
  for (let i = 0; i < 3; i++) {
    values.push(generator(i))
  }

  return values
}
