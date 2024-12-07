
// Reacts
import React from "react";

// Util
import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2";
import { useContextController } from "@/hooks/useContextController";

const Page = React.forwardRef(function({
  children,
  className: importedClassName,
  state: importedState,
  ...rest
}, ref) {
  const controller = useContextController({
    className: mergeClasses("min-h-screen page", importedClassName),
    importedState,
    contextGroups: [],
    ...rest,
  })
  
  const finalClass = controller.useClassName(controller.getStateValues())

  return (
    <main 
    ref={ref} 
    className={finalClass.self}
    {...rest}
    >
      {children}
    </main>
  );
});

Page.displayName = "Page";
export default Page;
