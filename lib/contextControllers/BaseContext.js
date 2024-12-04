

class BaseContext {
  constructor(baseContext, contextEnum) {
    this.baseContext = baseContext
    this.providerContext = baseContext.providerContexts[contextEnum]
    this.updatedProps = baseContext.updatedProps
    this.contextEnum = contextEnum
  }
}

export default BaseContext;
