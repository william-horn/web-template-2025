"use client"

import { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Icon from "../Image/Icon";

import { useContextController } from "@/hooks/useContextController";
import Providers, { ContextNames } from "../Providers";
import ElementStates from "@/enums/ElementStates";
import { ButtonGroupStates } from "@/lib/contextControllers/ButtonGroupController";
import { ButtonStates } from "@/lib/contextControllers/ButtonController";

const className = {
  // the outer-most element of the button, or "master element"
  self: "bg-0-inset text-0 inline-flex items-center align-middle rounded justify-center  w-fit text-sm px-1 hover:bg-button-0-hover", 

  // the inner-container sitting between the outer-layer and button content
  inner: {
    self: "py-2 px-1",
  },

  leftIcon: {
    self: "",
    image: {
      self: "invert",
    }
  },

  rightIcon: {
    self: "",
    image: {
      self: "invert",
    }
  },

  $state: []
}

const renderIcon = (icon, iconClass) => {
  if (icon) {
    return (
      <Icon 
      contextGroups={[ContextNames.Button]}
      className={iconClass}
      utility 
      src={icon}
      />
    );
  }
}

const renderButtonContent = (finalClass, children) => {
  return (
    <>
      {renderIcon(finalClass.leftIcon.src, finalClass.leftIcon)}

      <span className={finalClass.inner.self}>
        {children}
      </span>

      {renderIcon(finalClass.rightIcon.src, finalClass.rightIcon)}
    </>
  );
}

export const StatelessButton = ({
  children,

  // mandatory contextController props
  className: importedClassName={},
  state: importedState={},

  contextGroups=[ 
    ContextNames.ButtonGroup, 
    ContextNames.DropdownSelection
  ],

  // Native react element props
  ...rest
}) => {
  
  const controller = useContextController({
    className,
    importedClassName,
    importedState,
    contextGroups,
    ...rest
  }, ContextNames.Button)

  const finalClass = controller.useClassName(controller.getStateValues())

  return (
    <button 
    className={finalClass.self}
    onClick={() => controller.dispatchMethod("onClick")}
    {...controller.getRestProps()}
    >
      <Providers.Button
      value={{
        importedState: controller.getState(),
      }}
      >
        {renderButtonContent(finalClass, children)}
      </Providers.Button>
    </button>
  );
};

export const StatefulButton = ({
  defaultSelected=false,
  onClick: importedOnClick,
  ...rest
}) => {
  const [selected, setSelected] = useState(defaultSelected)
  const [hovered, setHovered] = useState(false)

  const onClick = (eventData) => {
    const isSelected = !selected

    // update the React button state
    setSelected(isSelected)

    /*
      Since 'setState()' works asynchronously, this code will run before
      React updates the state. So we must update the state manually in the controller
      so we can return the accurate state in the eventData
    */
    eventData.controller.updateState({ [ButtonStates.Selected]: isSelected })
    if (importedOnClick) importedOnClick(eventData)
  }
  
  return (
    <StatelessButton
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={onClick}
    state={{
      [ButtonStates.Selected]: selected,
      [ButtonStates.Hovered]: hovered,
    }} 
    {...rest}
    />
  )
}
