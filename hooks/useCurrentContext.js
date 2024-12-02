"use client"

import { useComponentContext } from "@/components/Providers"
import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2"
import { contextControllers } from "@/lib/util/contextControllers"

/*
  ==============================
  | --- ContextData CLASS: --- | 
  ==============================

  Default context data for new context controller
*/
function Context(props) {
  // props directly passed to the button 
  const originalProps = {...props}
  const updatedProps = {...props}
  const eventData = originalProps.eventData || {}
  const providerContexts = {}

  // initial default props
  updatedProps.eventData = eventData
  updatedProps.importedState = originalProps.importedState || {}

  this.originalProps = originalProps
  this.updatedProps = updatedProps

  /*
    mapped by the ContextName enum:
    {
      [ContextName.ButtonGroup]: {}
    }
  */
  this.providerContexts = providerContexts
  this.contextControllers = {}

  // other exported context info
  this.hasContext = false

  // if chosen to ignore the context
  if (updatedProps.ignoreContext) return;

  // find the contexts
  for (let contextEnum of updatedProps.contextGroups) {
    const context = useComponentContext(contextEnum)

    if (!context) continue

    this.hasContext = true
    providerContexts[contextEnum] = context

    // create new instance of the specific context interface, for ex ButtonGroupContext
    // which holds all code dealing with ButtonGroup interactions
    this.contextControllers[contextEnum] = new contextControllers[contextEnum](this)
  }
}

Context.prototype.validateProps = function() {
  if (this.hasContext && !this.originalProps.id) {
    console.warn("No 'id' prop was given to sub-component - assigning 'default' by default.")
    this.updatedProps.id = "default"
  }
}

Context.prototype.getState = function() {
  return this.updatedProps.importedState
}

Context.prototype.setState = function(newState) {
  this.updatedProps.importedState = newState
}

Context.prototype.updateState = function(updatedState) {
  for (let key in updatedState) {
    this.updatedProps.importedState[key] = updatedState[key];
  }
}

Context.prototype.forEachProvider = function(callback) {
  for (let contextEnum of this.updatedProps.contextGroups) {
    if (this.providerContexts[contextEnum]) {
      callback(this.providerContexts[contextEnum], contextEnum)
    }
  }
}

Context.prototype.forEachController = function(callback) {
  for (let contextEnum of this.updatedProps.contextGroups) {
    if (this.contextControllers[contextEnum]) {
      callback(this.contextControllers[contextEnum], contextEnum)
    }
  }
}

Context.prototype.getController = function(contextEnum) {
  if (contextEnum) {
    return this.contextControllers[contextEnum]
  }
}

Context.prototype.getControllers = function() {
  return this.contextControllers
}

Context.prototype.init = function() {
  if (!this.hasContext || this.updatedProps.ignoreContext) {
    return
  }

  this.validateProps()

  this.forEachController(controller => {
    if (typeof controller.init == "function") controller.init()
  })

  return this
}

Context.prototype.dispatchHandler = function(handlerName, ...args) {
  this.forEachController(controller => {
    if (typeof controller[handlerName] == "function") {
      controller[handlerName](...args)
    }
  })
}

Context.prototype.getRestProps = function() {
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
    ...rest
  } = this.originalProps;

  return rest;
}


/*
  ===================================
  | --- useCurrentContext HOOK: --- | 
  ===================================

  Default context data for new context controller
*/
export const useCurrentContext = props => {
  const exportContext = new Context(props)
  return exportContext
}

