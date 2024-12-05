
// Reacts
import React from "react";

// Util
import { getTextSize } from "@/lib/util/responsive";
import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2";
import { useContextController } from "@/hooks/useContextController";
import { ContextNames } from "../Providers";

const Text = React.forwardRef(function({ 
  children, 
  textSize,
  className: importedClassName,
  state: importedState,
  contextGroups=[],
  ...rest
}, ref) {

  const controller = useContextController({
    className: `${getTextSize(textSize)} general-text !leading-[2] text-0 font-0 block align-middle`,
    importedClassName,
    importedState,
    contextGroups,
    ...rest,
  }, ContextNames.BaseElement)

  const finalClass = controller.useClassName(controller.getStateValues())

  return (
    <p 
    ref={ref}
    className={finalClass.self}
    {...controller.getRestProps()}
    >
      {children}
    </p>
  );
});

Text.displayName = "Text"; // for ESlint
export default Text;

