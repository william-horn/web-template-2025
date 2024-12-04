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
  self: "bg-0-inset text-0 inline-flex items-center align-middle rounded justify-center transition-colors w-fit text-sm px-1 hover:bg-button-0-hover",

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

  $state: [
    [ButtonStates.Selected, { self: "bg-green-500 hover:bg-green-600" }],
    [ButtonGroupStates.Selected, { self: "bg-black" }]
  ]
}

const renderIcon = (icon, iconClass, state) => {
  if (icon) {
    return (
      <Icon 
      state={state}
      className={iconClass}
      utility 
      src={icon}
      />
    );
  }
}

const renderButtonContent = (controller, finalClass, children) => {
  const {
    leftIcon,
    rightIcon,
    rightIconSelected,
    leftIconSelected,
    rightIconHovered,
    leftIconHovered,
  } = controller.updatedProps;

  const selected = controller.getState(ButtonStates.Selected)
  const hovered = controller.getState(ElementStates.Hovered)

  const activeLeftIcon = (selected && leftIconSelected) 
    || (hovered && leftIconHovered)
    || leftIcon;

  const activeRightIcon = (selected && rightIconSelected) 
    || (hovered && rightIconHovered) 
    || rightIcon;

  return (
    <>
      {renderIcon(finalClass.leftIcon.src || activeLeftIcon, finalClass.leftIcon, controller.getState())}

      <span className={finalClass.inner.self}>
        {children}
      </span>

      {renderIcon(finalClass.rightIcon.src || activeRightIcon, finalClass.rightIcon, controller.getState())}
    </>
  );
}

export const StatelessButton = ({
  children,

  // mandatory contextController props
  className: importedClassName={},
  state: importedState={},

  contextGroups=[ 
    ContextNames.Button,
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
  // const finalClass = controller.compileClasses()

  return (
    <button 
    className={finalClass.self}
    onClick={() => controller.dispatchMethod("onClick")}
    {...controller.getRestProps()}
    >
      {renderButtonContent(controller, finalClass, children)}
    </button>
  );
};
