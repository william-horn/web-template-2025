
import { truthyFunc } from "../util/defaultFunctions"
import BaseElement from "./BaseElement"

export const ButtonGroupStates = {
  Selected: "Enum__ButtonGroupSelected",
}

/*
  ==============================
  | --- ButtonGroup CLASS: --- | 
  ==============================

  Default context data for new context controller
*/

class ButtonGroupController extends BaseElement {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)
  
    // init
    this.setInitialState()
    this.updateActiveData()
    this.register()
  }

  setInitialState() {
    this.baseContext.updateState({ 
      [ButtonGroupStates.Selected]: this.providerContext.findActiveId(this.updatedProps.id).found,
      ...this.baseContext.getState()
    })
  }

  register() {
    this.providerContext.registeredIds.current[this.updatedProps.id] = this.getEventData()
  }

  updateActiveData() {
    if (this.baseContext.getState(ButtonGroupStates.Selected)) {
      this.providerContext.activeData.current[this.updatedProps.id] = this.getEventData();
    } else {
      delete this.providerContext.activeData.current[this.updatedProps.id];
    }
  }

  getEventData() {
    return {
      ...super.getEventData(),
      value: this.updatedProps.value,
      ...this.baseContext.eventData
    }
  }

  onClick() {
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
}


export default ButtonGroupController;