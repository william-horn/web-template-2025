"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Providers, { ContextNames } from "../Providers";
import emptyFunc from "@/lib/util/defaultFunctions";
import { useContextController } from "@/hooks/useContextController";
import ElementStates from "@/enums/ElementStates";

// Button group styles
const className = {
  self: "flex flex-col gap-2 custom-button-group",

  $state: [
    [ElementStates.Selected, { self: "bg-red-500",  }]
  ]
}

const ButtonGroup = function({ 
  children,
  className: importedClassName={},
  state: importedState={},

  // handlers, global
  onClick=emptyFunc,
  onSelect=emptyFunc,
  onUnselect=emptyFunc,
  onSelectionLimitReached=emptyFunc,

  // global
  unselectLastChoice=false,
  defaultSelect=[],
  selectionLimit=-1,
  unselectionLimit=0,

  ...rest
}) {
  // Button group state (active buttons)
  const [activeIds, setActiveIds] = useState(defaultSelect);
  const registeredIds = useRef({});
  const activeData = useRef({});

  const controller = useContextController({
    className,
    importedClassName,
    importedState,
    ...rest,
  }, ContextNames.BaseElement)

  const finalClass = controller.useClassName(controller.getStateValues())

  // catch default selected buttons being greater than the selection limit
  if (selectionLimit > -1 && defaultSelect.length > selectionLimit) {
    throw Error("In <ButtonGroup>: Initially selected options '[" + defaultSelect + "]' cannot exceed selection limit of '" + selectionLimit + "'");
  }

  const findActiveId = (id) => {
    const idIndex = activeIds.findIndex(activeId => activeId === id);
    return { found: idIndex !== -1, index: idIndex };
  }
  
  const updateActiveIds = (id, isActive) => {
    if (isActive) {
      setActiveIds(prev => {
        if (!prev.find(_id => _id === id)) {
          prev.push(id);
        }
        return [...prev];
      });

    } else {
      const idResult = findActiveId(id);
      
      setActiveIds(prev => {
        prev.splice(idResult.index, 1);
        return [...prev];
      });
    }
  }

  useEffect(() => {
    const invalidId = defaultSelect.find(id => !registeredIds.current[id]);

    if (invalidId) {
      throw Error(`Id '${invalidId}' found in 'defaultSelect[]' prop but not in children`);
    }
  }, [defaultSelect]);

  return (
    <Providers.ButtonGroup
    value={{
      onClick,
      selectionLimit,
      findActiveId,
      updateActiveIds,
      activeIds,
      onSelect,
      unselectLastChoice,
      onSelectionLimitReached,
      onUnselect,
      unselectionLimit,
      registeredIds,
      activeData,
      importedState: controller.getState(),
      rest
    }}
    >
      <div className={finalClass.self}>
        {children}
      </div>
    </Providers.ButtonGroup>
  );
};

export default ButtonGroup;