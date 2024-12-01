
// React
import React from "react";

// Util
import { getWidth } from "@/lib/util/responsive";
import { mergeClasses, compileClass } from "@/lib/util/merge-classes-v2";

const Content = React.forwardRef(function({
  children,
  width,
  className: importedClassName,
  state: importedState,
  ...rest
}, ref) {
  return (
    <div
    ref={ref}
    className={
      compileClass({
        className: mergeClasses(
          `content ${getWidth(width)}`, 
          importedClassName
        ),
        state: importedState,
      }).self
    }
    {...rest}
    >
      {children}
    </div>
  );
})

Content.displayName = "Content";
export default Content;
