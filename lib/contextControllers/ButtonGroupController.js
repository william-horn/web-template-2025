
import { truthyFunc } from "../util/defaultFunctions"
import { ContextNames } from "@/components/Providers"

export const ButtonGroupStates = {
  Selected: "Enum__ButtonGroupSelected",
}

/*
  ==============================
  | --- ButtonGroup CLASS: --- | 
  ==============================

  Default context data for new context controller
*/
export const ButtonGroupController = function(baseContext, providerContext) {
  this.baseContext = baseContext
  this.providerContext = providerContext
  this.updatedProps = baseContext.updatedProps
  this.originalProps = baseContext.originalProps

  // init
  this.setInitialState()
  this.updateActiveData()
  this.register()
}

ButtonGroupController.prototype.setInitialState = function() {
  this.baseContext.updateState({ 
    [ButtonGroupStates.Selected]: this.providerContext.findActiveId(this.updatedProps.id).found 
  })
}

ButtonGroupController.prototype.register = function() {
  this.providerContext.registeredIds.current[this.updatedProps.id] = this.getEventData()
}

ButtonGroupController.prototype.updateActiveData = function() {
  if (this.baseContext.getState(ButtonGroupStates.Selected)) {
    this.providerContext.activeData.current[this.updatedProps.id] = this.getEventData();
  } else {
    delete this.providerContext.activeData.current[this.updatedProps.id];
  }
}

ButtonGroupController.prototype.getEventData = function() {
  return {
    status: ContextNames.ButtonGroup,
    value: this.updatedProps.value,
    state: this.baseContext.getState(),
  }
}

ButtonGroupController.prototype.onClick = function() {
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

  const selected = !this.baseContext.getState(ButtonGroupStates.Selected)

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
        unselectedButtonData.state[ButtonGroupStates.Selected] = false;
        
        fireOnUnselect(unselectedButtonData);
        updateActiveIds(unselectedButtonId, unselectedButtonData.state[ButtonGroupStates.Selected]);
      }
    } else {

      onSelectionLimitReached(this.getEventData());
      return;
    }
  }

  this.baseContext.updateState({
    [ButtonGroupStates.Selected]: selected,
  });

  fireOnClick(this.getEventData());

  if (selected) {
    fireOnSelect(this.getEventData());
  } else {
    fireOnUnselect(this.getEventData());
  }

  updateActiveIds(buttonId, selected);
}

export default ButtonGroupController;