
import { twMerge } from "tailwind-merge";
import React from "react";
import { getTextSize } from "@/lib/util/responsive";

const Text = React.forwardRef(function({ 
  children, 
  responsiveTextSize,
  className: importedClassName="",
  ...rest
}, ref) {

  return (
    <p 
    ref={ref}
    className={twMerge(
      `${getTextSize(responsiveTextSize)} general-text !leading-[2] text-0 font-0 block align-middle`,
      importedClassName
    )}
    {...rest}
    >
      {children}
    </p>
  );
});

Text.displayName = "Text"; // for ESlint
export default Text;

