import BaseContext from "./BaseContext"

class BaseElement extends BaseContext {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)
  }

  getEventData() {
    return {
      contextEnum: this.contextEnum,
      controller: this.baseContext,
      ...this.baseContext.eventData,
    }
  }
}

export default BaseElement;
