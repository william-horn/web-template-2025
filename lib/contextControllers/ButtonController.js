
import BaseElement from "./BaseElement";

export const ButtonStates = {
  Selected: "Enum__ButtonSelected",
}

class ButtonController extends BaseElement {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)
  }

  getEventData() {
    return {
      ...super.getEventData(),
      ...this.baseContext.eventData
    }
  }

  onClick() {
    const onClick = this.updatedProps.onClick;

    if (onClick) onClick(this.getEventData())
  }
}

export default ButtonController;
