
import ElementController from "./ElementController";

export const IconStates = {
}

class IconController extends ElementController {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)

    // Init
  }

  setDefaultProps() {
    const finalClass = this.baseContext.getCachedClassName()

    let {
      src,
      fillWhenEmpty
    } = this.updatedProps

    src = typeof finalClass.src !== "undefined" ? finalClass.src : src;

    if (src === "fill") {
      fillWhenEmpty = true;
      src = false;
    }

    this.updatedProps.src = src
    this.updatedProps.fillWhenEmpty = fillWhenEmpty
  }
}

export default IconController;
