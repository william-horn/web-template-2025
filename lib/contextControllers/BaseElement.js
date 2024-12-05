import BaseContext from "./BaseContext"

class BaseElement extends BaseContext {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)
  }

  getEventData() {
    return {
      state: this.baseContext.getState(),
      status: this.contextEnum,
      ...this.baseContext.eventData,
    }
  }
}

export default BaseElement;
