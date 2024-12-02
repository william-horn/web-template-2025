

export const getEnumNames = enumGroup => {
  const keys = []

  for (let k in enumGroup) {
    keys[keys.length] = k
  }

  return keys
}

export const getEnumValues = enumGroup => {
  const values = []

  for (let k in enumGroup) {
    values[values.length] = enumGroup[k]
  }

  return values
}

export const getEnum = name => {

}

