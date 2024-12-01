
import { twMerge } from "tailwind-merge";

import React from "react";

const Page = React.forwardRef(function({
  children,
  className="",
  ...rest
}, ref) {

  return (
    <main 
    ref={ref} 
    className={twMerge("min-h-screen page", className)} {...rest}
    >
      {children}
    </main>
  );
});

Page.displayName = "Page";
export default Page;
