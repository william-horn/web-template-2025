import Image from "next/image"
import { compileClass, mergeClasses } from "@/lib/util/mergeClassesV2";
import { useMemo } from "react";

const Icon = ({
  src, 
  alt, 
  utility=false,
  fillWhenEmpty=false,
  className: importedClassName,
  state: importedState
  // preset,
  // ...rest
}) => {
  const className = {
    self: "relative overflow-hidden inline-block align-middle min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 select-none",

    image: {
      // fillWhenEmpty: false,
      self: "invert"
    }
  };

  const finalClass = useMemo(() => {
    return compileClass({
      className: mergeClasses(className, importedClassName),
      state: importedState
    })
  }, [])

  src = typeof finalClass.src !== "undefined" ? finalClass.src : src;

  if (src === "fill") {
    fillWhenEmpty = true;
    src = false;
  }

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
            alt={alt || "icon"}
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