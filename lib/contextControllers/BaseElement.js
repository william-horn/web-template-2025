import BaseContext from "./BaseContext"

class BaseElement extends BaseContext {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)
  }

  getEventData() {
    return {
      contextName: this.contextEnum,
      controller: this.baseContext,
      ...this.baseContext.eventData,
    }
  }
}

export default BaseElement;
