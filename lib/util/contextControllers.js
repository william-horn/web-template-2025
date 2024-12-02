
import { ContextNames } from "@/enums/ContextNames"
import { truthyFunc } from "./defaultFunctions"

/*
  ==============================
  | --- ButtonGroup CLASS: --- | 
  ==============================

  Default context data for new context controller
*/
export function ButtonGroupContext(context) {
  this.context = context
  this.providerContext = context.providerContexts[ContextNames.ButtonGroup]
  this.updatedProps = context.updatedProps
  this.originalProps = context.originalProps
}

ButtonGroupContext.prototype.init = function() {
  this.setInitialState()
  this.updateActiveData()
  this.register()

  return this
}

ButtonGroupContext.prototype.setInitialState = function() {
  if (this.providerContext.findActiveId(this.updatedProps.id).found) {
    this.context.updateState({ selected: true })
  }
}

ButtonGroupContext.prototype.register = function() {
  this.providerContext.registeredIds.current[this.updatedProps.id] = this.getEventData()
}

ButtonGroupContext.prototype.updateActiveData = function() {
  if (this.context.getState().selected) {
    this.providerContext.activeData.current[this.updatedProps.id] = this.getEventData();
  } else {
    delete this.providerContext.activeData.current[this.updatedProps.id];
  }
}

ButtonGroupContext.prototype.getEventData = function() {
  return {
    status: "ButtonGroupData",
    value: this.updatedProps.value,
    state: this.context.getState(),
    ...this.updatedProps.eventData
  }
}

ButtonGroupContext.prototype.onClick = function() {
  const provider = this.providerContext

  const {
    selectionLimit,
    activeIds,
    unselectLastChoice,
    activeData,
    onSelectionLimitReached,
    updateActiveIds,
    unselectionLimit
  } = provider;

  /*
    * note: for future micro-optimization, conditionally check if these 
    * functions exist instead of giving them a default function.
  */
  const {
    onSelect=truthyFunc,
    onUnselect=truthyFunc,
    onClick=truthyFunc,
    id: buttonId,
  } = this.updatedProps;

  const selected = !this.context.getState().selected

  /*
  short-hand functions for firing button group callbacks and
  direct button events.

  * note: you must return 'true' from within a callback given directly to the button 
  * in order for the callback to bubble back up to the button group callback.
  */
  const fireOnSelect = (...args) => {
    if (onSelect(...args)) provider.onSelect(...args);
  }

  const fireOnUnselect = (...args) => {
    if (onUnselect(...args)) provider.onUnselect(...args);
  }

  const fireOnClick = (...args) => {
    if (onClick(...args)) provider.onClick(...args);
  }

  if (activeIds.length <= unselectionLimit && !selected) {
    return;
  }

  if (selectionLimit > -1 && activeIds.length >= selectionLimit && selected) {
    if (unselectLastChoice) {
      const unselectedButtonId = activeIds[activeIds.length - 1];

      if (unselectedButtonId !== buttonId) {
        const unselectedButtonData = activeData.current[unselectedButtonId];
        unselectedButtonData.state.selected = false;
        
        fireOnUnselect(unselectedButtonData);
        updateActiveIds(unselectedButtonId, unselectedButtonData.state.selected);
      }
    } else {

      onSelectionLimitReached(this.getEventData());
      return;
    }
  }

  this.context.updateState({
    selected
  });

  fireOnClick(this.getEventData());

  if (selected) {
    fireOnSelect(this.getEventData());
  } else {
    fireOnUnselect(this.getEventData());
  }

  updateActiveIds(buttonId, selected);
}


/*
  ==============================
  | --- ButtonGroup CLASS: --- | 
  ==============================

  Default context data for new context controller
*/
export function DropdownSelectionContext() {
  
}

DropdownSelectionContext.prototype.onClick = function() {
  console.log("dropdown click")
}

export const contextControllers = {
  [ContextNames.ButtonGroup]: ButtonGroupContext,
  [ContextNames.DropdownSelection]: DropdownSelectionContext,
}