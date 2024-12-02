"use client";

import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2";
import { useState, useRef, useEffect, useMemo } from "react";
import Providers from "../Providers";
import emptyFunc from "@/lib/util/defaultFunctions";

// Button group styles
const className = {
  self: "flex flex-col gap-2 custom-button-group",

  $state: [
    ["groupSelected", { self: "bg-red-500",  }]
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
  const mergedClass = useMemo(() => {
    console.log("calculating merge classes");
    return mergeClasses(
      className,
      importedClassName,
    );
  }, []);

  const finalClass = useMemo(() => {
    console.log("calculating compile classes");
    return compileClass({
      className: mergedClass,
      state: importedState
    })
  }, [importedState.groupSelected]);

  // Button group state (active buttons)
  const [activeIds, setActiveIds] = useState(defaultSelect);
  const registeredIds = useRef({});
  const activeData = useRef({});

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

  // useEffect(() => {
  //   console.log("active: ", activeIds);
  //   console.log("data: ", activeData.current);
  //   console.log("registered: ", registeredIds.current);
  // });

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
      importedState,
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