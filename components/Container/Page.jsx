
// Reacts
import React from "react";

// Util
import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2";

const Page = React.forwardRef(function({
  children,
  className: importedClassName,
  state: importedState,
  ...rest
}, ref) {
  return (
    <main 
    ref={ref} 
    className={
      compileClass({
        className: mergeClasses("min-h-screen page", importedClassName),
        state: importedState
      }).self
    }
    {...rest}
    >
      {children}
    </main>
  );
});

Page.displayName = "Page";
export default Page;
