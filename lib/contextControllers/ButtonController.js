
import BaseElement from "./BaseElement";

export const ButtonStates = {
  Selected: "Enum__ButtonSelected",
}

class ButtonController extends BaseElement {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)

    // Init
    // this.setInitialState();
  }

  // setInitialState() {
  //   this.baseContext.updateState({ 
  //     // [ButtonStates.Selected]: true,
  //     ...this.baseContext.getState()
  //   })
  // }

  // getEventData() {
  //   return {
  //     newField: "example",
  //     ...super.getEventData(),
  //   }
  // }

  onClick() {
    const onClick = this.updatedProps.onClick;

    if (onClick) onClick(this.getEventData())
  }
}

export default ButtonController;
