

export const arrayToHashmap = (array=[]) => {
  const map = new Map()

  for (let i = 0; i < array.length; i++) {
    const entry = array[i]
    map.set(entry[0], entry[1])
  }

  return map
} 
