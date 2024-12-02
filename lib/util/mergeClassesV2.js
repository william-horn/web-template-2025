/*
  Author: William J. Horn
  Written: 12/1/2024
*/

import { twMerge } from "tailwind-merge"
import { arrayToHashmap } from "./dataFormatting"

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
*/
export const mergeClasses = (baseClass, importedClass, customSpecialKeys={}) => {
  // identify class types
  const baseClassType = typeof baseClass
  const importedClassType = typeof importedClass

  const baseClassIsString = baseClassType == "string"
  const baseClassIsObject = baseClassType == "object"

  const importedClassIsString = importedClassType == "string"
  const importedClassIsObject = importedClassType == "object"

  // quick merge when classes are strings
  if (baseClassIsString && importedClassIsString) {
    return { self: twMerge(baseClass, importedClass) }

  } else if (baseClassIsString && importedClassIsObject) {
    importedClass = {...importedClass}
    importedClass.self = twMerge(baseClass, importedClass.self)

    return importedClass

  } else if (baseClassIsObject && importedClassIsString) {
    baseClass = {...baseClass}
    baseClass.self = twMerge(baseClass.self, importedClass)

    return baseClass

  } else if (baseClassIsString) {
    return { self: baseClass }

  } else if (importedClassIsString) {
    return { self: importedClass }

  }
  
  // the final merged classes
  const finalClass = {...baseClass}

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

/*
  mergeStates()

  Responsible for taking the state lists:

    [
      ["state-1", { self: ... }],
      ["state-2", { self: ... }],
      ...
    ]

  and merging them with other state lists like this. 
*/
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

export const compileClass = ({ className, state={} }) => {
  let finalClass = {...className}

  for (let key in finalClass.$state) {
    const [stateName, stateClass] = finalClass.$state[key]

    if (state[stateName]) {
      finalClass = mergeClasses(finalClass, stateClass)
    }
  }

  return finalClass
}
