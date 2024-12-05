import BaseElement from "./BaseElement"

export const DropdownSelectionStates = {
  Selected: "Enum__DropdownSelectionSelected",
}

class DropdownSelectionController extends BaseElement {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)
  }

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

export default DropdownSelectionController;
