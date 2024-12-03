import { ContextNames } from "@/components/Providers"

export const ButtonStates = {
  Selected: "Enum__ButtonSelected",
}

export const ButtonController = function(baseContext, contextEnum) {
  this.baseContext = baseContext
  this.providerContext = baseContext.providerContexts[contextEnum]
  this.updatedProps = baseContext.updatedProps
  this.contextEnum = contextEnum
}

ButtonController.prototype.getEventData = function() {
  return {
    state: this.baseContext.getState(),
    status: this.contextEnum,
    ...this.baseContext.eventData
  }
}

ButtonController.prototype.onClick = function() {
  const onClick = this.updatedProps.onClick;

  if (onClick) onClick(this.getEventData())
}

export default ButtonController;
