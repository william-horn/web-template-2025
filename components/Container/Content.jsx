
// React
import React from "react";

// Util
import { getWidth } from "@/lib/util/responsive";
import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2";
import { useContextController } from "@/hooks/useContextController";

const Content = React.forwardRef(function({
  children,
  width,
  className: importedClassName,
  state: importedState,
  contextGroups=[],
  ...rest
}, ref) {
  const controller = useContextController({
    className: `content ${getWidth(width)}`,
    importedClassName,
    importedState,
    contextGroups,
    ...rest
  })

  const finalClass = controller.useClassName(controller.getStateValues())

  return (
    <div
    ref={ref}
    className={finalClass.self}
    {...rest}
    >
      {children}
    </div>
  );
})

Content.displayName = "Content";
export default Content;
