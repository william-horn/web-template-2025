import { twMerge } from "tailwind-merge"
import { arrayToHashmap } from "./data-structure"

export const specialKeyPrefix = "$"
export const specialKeys = {}

specialKeys.state = (output, key, baseVal, importedVal) => {
  output[key] = mergeStates(baseVal, importedVal)
}

/*
  mergeClasses(baseClass, importedClass, customSpecialKeys):

  Takes a baseClass object and overwrites fields with data from an importedClass
  object. Classes are nested objects with tailwind class fields. "self"
  is a reserved field for merging tailwind classes.

  There are special class fields that begin with '$' that are not added to
  the output class object unless a callback function adds it manually.
  The callback functions are stored inside 'specialKeys' and they are 
  called with 4 arguments:

    1) dir -> the current directory in the output class object
    2) key -> the full key name of the special field, for example '$state'
    3) baseVal -> if this key exists in the base class directory, it is that value
    4) importedVal -> the current value associated with that key

  Ex:
    const class1 = {
      self: "bg-blue",
      $state: [
        ["selected", { self: "bg-black" }]
      ]
    }

    const class2 = {
      self: "bg-red",
      $state: [
        ["selected", { self: "bg-white" }]
      ]
    }

    const merge = mergeClasses(class1, class2) -> {
      self: "bg-red",
      $state: [
        ["selected", { self: "bg-white" }]
      ]
    }
*/
export const mergeClasses = (baseClass, importedClass, customSpecialKeys={}) => {
  if (typeof baseClass != "object") throw new Error("Base class must be an object")
  
  // the final merged classes
  const finalClass = {...baseClass}

  // if imported doesn't exist, return copy of base
  if (!importedClass) return finalClass

  // object currently iterating over
  const objectQueue = [
    [finalClass, importedClass]
  ]

  /*
    HANDLE CLASS FIELDS
  */
  while (objectQueue.length > 0) {
    const currentDir = objectQueue[0]

    // the current objects under the same key in both classes
    const currentBaseDir = currentDir[0]
    const currentImportedDir = currentDir[1]

    // iterate over the imported class object
    for (let key in currentImportedDir) {
      const importedVal = currentImportedDir[key]
      const baseVal = currentBaseDir[key]

      // ignore special keys
      if (key.startsWith(specialKeyPrefix)) {
        const specialKey = key.substring(specialKeyPrefix.length)
        const execute = customSpecialKeys[specialKey] || specialKeys[specialKey]

        execute(currentBaseDir, key, baseVal, importedVal)
        continue
      }

      const importedIsObject = typeof importedVal == "object"
      const baseIsObject = typeof baseVal == "object"
      
      // if the key does not exist in the base class, then add it
      if (!baseVal) {
        currentBaseDir[key] = importedIsObject ? {...importedVal} : importedVal

      // if the key exists in both, and they're both objects, add them as a pair to the object queue
      } else if (importedIsObject && baseIsObject) {
        objectQueue[objectQueue.length] = [baseVal, importedVal]

      // if the key is "self" then tailwind merge them
      } else if (key == "self") {
        currentBaseDir[key] = twMerge(baseVal, importedVal)

      // for all other ordinary values 
      } else {
        currentBaseDir[key] = importedVal
      }
    }

    // remove the current directory once it's been iterated over
    objectQueue.shift()
  }

  return finalClass
}

export const mergeStates = (baseStates, importedStates) => {
  if (!baseStates^!importedStates) {
    return baseStates ? [...baseStates] : [...importedStates]
  } else if (!baseStates) {
    return []
  }

  const finalState = []
  const baseStateMap = arrayToHashmap(baseStates)

  for (let index = 0; index < importedStates.length; index++) {
    const [importedStateName, importedStateClass] = importedStates[index]
    const baseStateClass = baseStateMap.get(importedStateName)

    if (baseStateClass) {
      finalState[index] = [
        importedStateName, 
        mergeClasses(baseStateClass, importedStateClass)
      ]

    } else {
      finalState[index] = [importedStateName, importedStateClass]
    }
  }

  return finalState
}

export const compileClass = ({ className, state }) => {
  let finalClass = {...className}

  for (let key in finalClass.$state) {
    const [stateName, stateClass] = finalClass.$state[key]

    if (state[stateName]) {
      finalClass = mergeClasses(finalClass, stateClass)
    }
  }

  return finalClass
}

// const finalClass = compileClass({
//   className: mergeClasses(a, b),
//   state: { selected: true }
// })

// const finalClass = compileClass({
//   className: {
//     self: "bg-blue",
//     $state: [["selected", { self: "bg-black" }]]
//   },

//   state: { selected: true }
// });