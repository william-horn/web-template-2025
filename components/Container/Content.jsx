
import { twMerge } from "tailwind-merge";
import React from "react";

import { getWidth } from "@/lib/util/responsive";

const Content = React.forwardRef(function({
  children,
  responsiveWidth,
  className: importedClassName="",
  ...rest
}, ref) {

  return (
    <div
    ref={ref}
    className={twMerge(`content ${getWidth(responsiveWidth)}`, importedClassName)}
    {...rest}
    >
      {children}
    </div>
  );
})

Content.displayName = "Content";
export default Content;
