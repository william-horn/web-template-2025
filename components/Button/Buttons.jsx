"use client"

import { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Icon from "../Image/Icon";

import { useContextController } from "@/hooks/useContextController";
import { ContextNames } from "../Providers";
import ElementStates from "@/enums/ElementStates";
import { ButtonGroupStates } from "@/lib/contextControllers/ButtonGroupController";

export const ButtonStates = {
  Selected: "Enum__ButtonSelected",
}

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

const renderIcon = (icon, iconClass) => {
  if (icon) {
    return (
      <Icon 
      className={iconClass}
      utility 
      src={icon}
      />
    );
  }
}

const renderButtonContent = (context, finalClass, children) => {
  const {
    leftIcon,
    rightIcon,
    rightIconSelected,
    leftIconSelected,
    rightIconHovered,
    leftIconHovered,
  } = context.updatedProps;

  const selected = context.getState(ButtonStates.Selected)
  const hovered = context.getState(ElementStates.Hovered)

  const activeLeftIcon = (selected && leftIconSelected) 
    || (hovered && leftIconHovered)
    || leftIcon;

  const activeRightIcon = (selected && rightIconSelected) 
    || (hovered && rightIconHovered) 
    || rightIcon;

  return (
    <>
      {renderIcon(finalClass.leftIcon.src || activeLeftIcon, finalClass.leftIcon)}

      <span className={finalClass.inner.self}>
        {children}
      </span>

      {renderIcon(finalClass.rightIcon.src || activeRightIcon, finalClass.rightIcon)}
    </>
  );
}

export const StatelessButton = ({
  children,

  // mandatory contextController props
  className: importedClassName={},
  state: importedState={},
  contextGroups=[ContextNames.ButtonGroup, ContextNames.DropdownSelection],

  // Native react element props
  ...rest
}) => {
  
  const controller = useContextController({
    className,
    importedClassName,
    importedState,
    contextGroups,
    ...rest
  })

  const finalClass = controller.useClassName([controller.getStateValues()])

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
