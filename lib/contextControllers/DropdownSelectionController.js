
export const DropdownSelectionStates = {
  Selected: "Enum__DropdownSelectionSelected",
}

export const DropdownSelectionController = function(baseContext, contextEnum) {
  this.baseContext = baseContext
  this.contextEnum = contextEnum
  this.providerContext = baseContext.providerContexts[contextEnum]
  this.updatedProps = baseContext.updatedProps
}

DropdownSelectionController.prototype.getEventData = function() {
  return {
    state: this.baseContext.getState(),
    status: this.contextEnum,
    ...this.baseContext.eventData
  }
}

DropdownSelectionController.prototype.onClick = function() {
  const onClick = this.updatedProps.onClick;

  if (onClick) onClick(this.getEventData())
}

export default DropdownSelectionController;
