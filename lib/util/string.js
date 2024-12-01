
export const escapeRegex = string => {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const stringIsEmpty = str => {
  return str.match(/\S/g) === null;
}

export const trimAllWhitespace = str => {
  return str.trim().replace(/\s+/g, ' ')
}

