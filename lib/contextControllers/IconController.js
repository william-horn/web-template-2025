
import BaseElement from "./BaseElement";

export const IconStates = {
  Selected: "Enum__IconSelected",
}

class IconController extends BaseElement {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)

    // Init
    // this.setInitialState();
  }

  setInitialState() {
    this.baseContext.updateState({ 
      // [ButtonStates.Selected]: true,
      ...this.baseContext.getState()
    })
  }

  getEventData() {
    return {
      ...super.getEventData(),
      ...this.baseContext.eventData
    }
  }
}

export default IconController;
