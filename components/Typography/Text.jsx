
// Reacts
import React from "react";

// Util
import { getTextSize } from "@/lib/util/responsive";
import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2";

const Text = React.forwardRef(function({ 
  children, 
  textSize,
  className: importedClassName,
  state: importedState,
  ...rest
}, ref) {
  return (
    <p 
    ref={ref}
    className={
      compileClass({
        className: mergeClasses(
          `${getTextSize(textSize)} general-text !leading-[2] text-0 font-0 block align-middle`,
          importedClassName
        ),
        state: importedState
      }).self
    }
    {...rest}
    >
      {children}
    </p>
  );
});

Text.displayName = "Text"; // for ESlint
export default Text;

