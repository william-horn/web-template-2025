"use client"

import { useMemo } from "react"
import { compileClass, mergeClasses } from "@/lib/util/mergeClassesV2"

import { useComponentContext } from "@/components/Providers"
import { ContextNames } from "@/components/Providers"

import ButtonGroupController from "@/lib/contextControllers/ButtonGroupController"
import DropdownSelectionController from "@/lib/contextControllers/DropdownSelectionController"
import ButtonController from "@/lib/contextControllers/ButtonController"
import BaseElement from "@/lib/contextControllers/BaseElement"

const contextControllers = {
  [ContextNames.ButtonGroup]: ButtonGroupController,
  [ContextNames.DropdownSelection]: DropdownSelectionController,
  [ContextNames.Button]: ButtonController,
  [ContextNames.BaseElement]: BaseElement,
}

// idea for "grouping" similar states in a "State" object

// const State = function() {
//   this.value = false
//   this.group = {}
// }

/*
  ==============================
  | --- ContextData CLASS: --- | 
  ==============================

  Default context data for new context controller
*/
class ContextController {
  constructor(props, innateContext) {
    if (!innateContext) throw Error("useContextController() must be given an innateContext argument")

    // props directly passed to the button 
    const updatedProps = {...props}
    const originalProps = Object.freeze(props)

    // initial default props
    this.state = originalProps.importedState || {}

    this.originalProps = originalProps
    this.updatedProps = updatedProps

    // other exported context info
    this.hasContext = false
    this.eventData = originalProps.eventData || {}
    this.ignoreContext = originalProps.ignoreContext
    this.contextGroups = originalProps.contextGroups || []

    // innateContext is always first 
    if (!this.contextGroups.includes(innateContext)) {
      this.contextGroups.unshift(innateContext)
    }

    /*
      mapped by the ContextName enum:
      {
        [ContextName.ButtonGroup]: {}
      }
    */
    const providerContexts = {}

    this.providerContexts = providerContexts
    this.contextControllers = {}

    // find the contexts
    for (let contextEnum of this.contextGroups) {
      let context

      // todo: clean this up later
      if (contextEnum == innateContext) {
        context = { status: "InnateContext" }
      } else {
        context = useComponentContext(contextEnum)

        if (context && !this.ignoreContext) {
          this.hasContext = true
        } else {
          continue
        }
      }

      providerContexts[contextEnum] = context

      // create new instance of the specific context interface, for ex ButtonGroupContext
      // which holds all code dealing with ButtonGroup interactions
      this.contextControllers[contextEnum] = new contextControllers[contextEnum](this, contextEnum)
    }

    // init
    this.validateProps()
  }

  mergeClasses() {
    return mergeClasses(
      this.originalProps.className, 
      this.originalProps.importedClassName
    )
  }

  compileClasses() {
    return compileClass({
      className: this.mergeClasses(),
      state: this.getState()
    })
  }

  useClassName(dependents) {
    const finalClass = useMemo(() => {
      // console.log("Compiling classes because dependencies changed: ", dependents);
  
      return this.compileClasses()
    }, dependents)
  
    return finalClass
  }

  validateProps() {
    if (this.hasContext && this.originalProps.id == null) {
      // console.warn("No 'id' prop was given to sub-component - assigning 'default' by default.")
      this.updatedProps.id = "default"
    }
  }

  getState(stateEnum) {
    if (stateEnum) {
      return this.state[stateEnum]
    }
  
    return this.state
  }

  getStateValues() {
    return Object.values(this.state)
  }

  setState(newState) {
    this.state = newState
  }

  updateState(updatedState) {
    for (let key in updatedState) {
      this.state[key] = updatedState[key];
    }
  }

  forEachProvider(callback) {
    for (let contextEnum of this.contextGroups) {
      if (this.providerContexts[contextEnum]) {
        callback(this.providerContexts[contextEnum], contextEnum)
      }
    }
  }

  forEachController(callback) {
    for (let contextEnum of this.contextGroups) {
      if (this.contextControllers[contextEnum]) {
        callback(this.contextControllers[contextEnum], contextEnum)
      }
    }
  }

  getController(contextEnum) {
    if (contextEnum) {
      return this.contextControllers[contextEnum]
    }
  }

  getControllers() {
    return this.contextControllers
  }

  dispatchMethod(handlerName, ...args) {
    this.forEachController(controller => {
      if (typeof controller[handlerName] == "function") {
        controller[handlerName](...args)
      }
    })
  }

  getRestProps() {
    const {
      onClick,
      onSelect,
      onUnselect,
      eventData,
      ignoreContext,
      importedState,
      importedClassName,
      leftIcon,
      rightIcon,
      leftIconSelected,
      rightIconSelected,
      leftIconHovered,
      rightIconHovered,
      id,
      value,
      contextGroups,
      className,
      ...rest
    } = this.originalProps;
  
    return rest;
  }
}

/*
  ===================================
  | --- useCurrentContext HOOK: --- | 
  ===================================

  Default context data for new context controller
*/
export const useContextController = (props, innateContext) => {
  return new ContextController(props, innateContext)
}

