import Image from "next/image"
import { compileClass, mergeClasses } from "@/lib/util/mergeClassesV2";
import { useMemo } from "react";
import { useContextController } from "@/hooks/useContextController";
import { ContextNames } from "../Providers";

const Icon = ({
  src, 
  alt="icon", 
  utility=false,
  fillWhenEmpty=false,
  // contextGroups=[],
  className: importedClassName,
  state: importedState,
  // preset,
  ...rest
}) => {
  const className = {
    self: "relative overflow-hidden inline-block align-middle min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 select-none",

    image: {
      // fillWhenEmpty: false,
      self: "invert"
    }
  };

  const controller = useContextController({
    className,
    importedClassName,
    importedState, 
    src,
    alt,
    fillWhenEmpty,
    ...rest,
  }, ContextNames.Icon);

  // update className based on imported state
  const finalClass = controller.useClassName(controller.getStateValues())
  controller.dispatchMethod({ context: ContextNames.Icon, method: "setDefaultProps" })

  // update the props with the controller's updated props
  src = controller.updatedProps.src
  fillWhenEmpty = controller.updatedProps.fillWhenEmpty

  const renderIcon = (src) => (
    <span 
    className={finalClass.self}>
      {
        src
          ? <Image
            className={finalClass.image.self}
            fill
            src={src}
            sizes={
              utility
                ? "(min-width: 1024px) 192px, (min-width: 640px) 96px, 48px"
                : "(min-width: 1024px) 512px, (min-width: 640px) 256px, 128px"
            }
            alt={controller.updatedProps.alt}
            />
          : <></>
      }
    </span>
  );

  return (
    fillWhenEmpty ? renderIcon(src) : (src ? renderIcon(src) : <></>)
  );
}

export default Icon