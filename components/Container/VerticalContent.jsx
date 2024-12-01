

// Components
import Content from "./Content";

// Util
import { mergeClasses, compileClass } from "@/lib/util/merge-classes-v2";

// React
import React from 'react';

export const VerticalContent__Chunk = ({
  children
}) => {
  return (
    <Content className="w-full bg-red-500 vertical-content-chunk">
      {children}
    </Content>
  );
};

export const VerticalContent__Remaining = ({
  children,
  className: importedClassName,
  state: importedState
}) => {
  const className = {
    self: "relative w-full h-full bg-blue-400 vertical-content-remaining",
    inner: {
      self: "absolute w-full h-full p-5 bg-green-400 vertical-content-inner",
      body: { self: "h-full overflow-y-auto bg-purple-500 vertical-content-body" },
    }
  }

  const finalClass = compileClass({
    className: mergeClasses(className, importedClassName),
    state: importedState
  })

  return (
    <Content className={finalClass.self}>
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
    self: "w-[200px] h-[300px] bg-white vertical-content-container flex flex-col"
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

VerticalContent.Chunk = VerticalContent__Chunk
VerticalContent.Remaining = VerticalContent__Remaining

export default VerticalContent