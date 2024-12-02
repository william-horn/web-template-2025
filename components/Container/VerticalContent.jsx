
// Components
import Content from "./Content";

// Util
import { mergeClasses, compileClass } from "@/lib/util/mergeClassesV2";

// React
import React from 'react';

export const VerticalContent__Section = ({
  children,
  className: importedClassName,
  state: importedState,
  ...rest
}) => {
  return (
    <Content 
    className={
      compileClass({
        className: mergeClasses(
          "w-full vertical-content-chunk", 
          importedClassName
        ),
        state: importedState
      }).self
    }
    {...rest}
    >
      {children}
    </Content>
  );
};

export const VerticalContent__Remaining = ({
  children,
  className: importedClassName,
  state: importedState,
  ...rest
}) => {
  const className = {
    self: "relative w-full h-full vertical-content-remaining",
    inner: {
      self: `absolute w-full h-full vertical-content-inner`,
      body: { self: "h-full overflow-y-auto vertical-content-body" },
    }
  }

  const finalClass = compileClass({
    className: mergeClasses(className, importedClassName),
    state: importedState
  })

  return (
    <Content 
    className={finalClass.self} 
    {...rest}
    >
      <Content className={finalClass.inner.self}>
        <Content className={finalClass.inner.body.self}>
          {children}
        </Content>
      </Content>
    </Content>
  )
}

export const VerticalContent = ({
  className: importedClassName,
  children,
  state: importedState,
  ...rest
}) => {
  const className = {
    self: "w-[200px] h-[300px] vertical-content-container flex flex-col"
  }
  
  const finalClass = compileClass({
    className: mergeClasses(className, importedClassName),
    state: importedState
  })

  return (
    <Content
    className={finalClass.self}
    {...rest}
    >
      {children}
    </Content>
  );
};

VerticalContent.Section = VerticalContent__Section
VerticalContent.Remaining = VerticalContent__Remaining

export default VerticalContent