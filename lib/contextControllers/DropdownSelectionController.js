import ElementController from "./ElementController"

export const DropdownSelectionStates = {
  Selected: "Enum__DropdownSelectionSelected",
}

class DropdownSelectionController extends ElementController {
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
