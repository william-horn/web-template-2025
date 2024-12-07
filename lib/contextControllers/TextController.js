
import { ContextNames } from "@/components/Providers";
import ElementController from "./ElementController";

export const TextStates = {
}

class TextController extends ElementController {
  constructor(baseContext, contextEnum) {
    super(baseContext, contextEnum)

    // Init
    // this.setInitialState();
    if (this.updatedProps.id == "label" && baseContext.containsContext(ContextNames.ButtonGroup)) {
      console.log("text is in button group with id of 'label'")
    }
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
}

export default TextController;
