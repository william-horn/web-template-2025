"use client"

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCurrentContext } from "@/hooks/useCurrentContext";
import { compileClass, mergeClasses } from "@/lib/util/mergeClassesV2";
import { ContextNames } from "@/enums/ContextNames";

const className = {
  // the outer-most element of the button, or "master element"
  self: "bg-0-inset text-0 inline-flex items-center align-middle rounded justify-center transition-colors w-fit text-sm px-1 hover:bg-button-hover-primary",

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
    ["selected", { self: "bg-green-500 hover:bg-green-600" }]
  ]
}

export const StatelessButton = ({
  className: importedClassName,
  state: importedState,
  children,
  contextGroups=[ContextNames.ButtonGroup, ContextNames.DropdownSelection],
  ...rest
}) => {
  
  const currentContext = useCurrentContext({
    importedClassName,
    importedState,
    contextGroups,
    ...rest
  }).init()

  const finalClass = compileClass({
    className: mergeClasses(className, importedClassName),
    state: currentContext.getState()
  })

  console.log(currentContext);

  return (
    <button 
    className={finalClass.self}
    onClick={() => currentContext.dispatchHandler("onClick")}
    {...currentContext.getRestProps()}
    >
      <span className={finalClass.inner.self}>
        {children}
      </span>
    </button>
  );
};
