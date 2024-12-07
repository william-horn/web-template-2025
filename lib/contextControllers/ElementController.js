import BaseContext from "./BaseContext"

class ElementController extends BaseContext {
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

export default ElementController;
