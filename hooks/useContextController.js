"use client"

import { useMemo } from "react"
import { compileClass, mergeClasses } from "@/lib/util/mergeClassesV2"

import { useComponentContext } from "@/components/Providers"
import { ContextNames } from "@/components/Providers"

import ButtonGroupController from "@/lib/contextControllers/ButtonGroupController"
import DropdownSelectionController from "@/lib/contextControllers/DropdownSelectionController"
import ButtonController from "@/lib/contextControllers/ButtonController"
import ElementController from "@/lib/contextControllers/ElementController"
import TextController from "@/lib/contextControllers/TextController"
import IconController from "@/lib/contextControllers/IconController"

const contextControllers = {
  [ContextNames.ButtonGroup]: ButtonGroupController,
  [ContextNames.DropdownSelection]: DropdownSelectionController,
  [ContextNames.Button]: ButtonController,
  [ContextNames.Element]: ElementController,
  [ContextNames.Text]: TextController,
  [ContextNames.Icon]: IconController,
}

const ContextStatus = {
  Innate: "Enum__InnateContext",
  Provider: "Enum__ProviderContext",
}

/*
  ==============================
  | --- ContextData CLASS: --- | 
  ==============================

  Default context data for new context controller
*/
class ContextController {
  constructor(props, innateContext=ContextNames.Element) {
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
    // this.ignoreContext = originalProps.ignoreContext
    innateContext = [innateContext, true]
    this.contextGroups = originalProps.contextGroups || []
    this.cachedClassName = null; // useClassName() hook will define this

    // innateContext is always first unless specified otherwise
    if (!this.contextGroups.some(contextGroup => contextGroup[0] == innateContext[0])) {
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
    this.forEachContextGroup(contextEnum => {
      // otherwise, check for other provider contexts
      const context = useComponentContext(contextEnum)

      // if no context exists, return out
      if (!context) return;

      // add the provider context to the table
      providerContexts[contextEnum] = context
      context.status = ContextStatus.Provider
    })

    // create the controllers
    this.forEachContextGroup((contextEnum, withController) => {
      // check for innate context first
      if (contextEnum == innateContext[0]) {
        this.contextControllers[contextEnum] = new contextControllers[contextEnum](this, contextEnum)

        // this may need to be given defaults such as 'importedState'
        // providerContexts[contextEnum] = { status: ContextStatus.Innate }
        return 
      }

      // if 'withController' then don't create controllers for context
      if (!withController) return;

      // if no provider context exists, then there is no reason to create a controller
      if (!this.containsContext(contextEnum)) return;

      this.hasContext = true

      // create new instance of the specific context interface, for ex ButtonGroupContext
      // which holds all code dealing with ButtonGroup interactions
      this.contextControllers[contextEnum] = new contextControllers[contextEnum](this, contextEnum)
    })

    // inherit provider states
    this.inheritProviderStates()

    // init
    this.validateProps()
  }

  // inherit states from ALL contextGroup enums that were provided.
  inheritProviderStates() {
    const providerStates = {}

    this.forEachContextGroup((contextEnum) => {
      const providerContext = this.providerContexts[contextEnum]
      
      if (!providerContext) return;

      const providerState = providerContext.importedState

      for (let stateEnum in providerState) {
        providerStates[stateEnum] = providerState[stateEnum]
      }
    })

    this.updateState(providerStates, false)
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

    this.cachedClassName = finalClass;
  
    return finalClass
  }

  getCachedClassName() {
    return this.cachedClassName
  }

  containsContext(contextEnum) {
    return this.providerContexts.hasOwnProperty(contextEnum)
  }

  validateProps() {
    if (this.hasContext && this.originalProps.id == null) {
      console.warn("No 'id' prop was given to sub-component - assigning 'default' by default.")
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
    return Object.values(this.getState())
  }

  setState(newState) {
    this.state = newState
  }

  updateState(updatedState, override=true) {
    for (let key in updatedState) {
      if (!override && this.state.hasOwnProperty(key)) continue;
      this.state[key] = updatedState[key];
    }
  }

  forEachContextGroup(callback) {
    for (let contextEnum of this.contextGroups) {
      const result = callback(contextEnum[0], contextEnum[1])

      if (result) break;
    }
  }

  forEachProvider(callback) {
    this.forEachContextGroup(contextEnum => {
      if (this.providerContexts[contextEnum]) {
        const result = callback(this.providerContexts[contextEnum], contextEnum)
        return result
      }
    })
  }

  forEachController(callback) {
    this.forEachContextGroup((contextEnum) => {
      if (this.contextControllers[contextEnum]) {
        const result = callback(this.contextControllers[contextEnum], contextEnum)
        return result
      }
    })
  }

  getController(contextEnum) {
    if (contextEnum) {
      return this.contextControllers[contextEnum]
    }
  }

  getControllers() {
    return this.contextControllers
  }

  dispatchMethod(options) {
    const {
      context: contextEnum,
      method,
      args=[]
    } = options

    const dispatch = (contextEnum) => {
      const controller = this.contextControllers[contextEnum]
      if (controller && typeof controller[method] == "function") {
        controller[method](...args)
      } else {
        throw Error("dispatchMethod() failed")
      }
    }

    if (contextEnum) {
      dispatch(contextEnum)
      return
    }

    this.forEachController((_, contextEnum) => dispatch(contextEnum))
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
      test,
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

