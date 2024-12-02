"use client"

import { createContext, useContext } from "react";
import { ContextNames } from "@/enums/ContextNames";

const contexts = {};
const Providers = {};

for (let contextEnumName in ContextNames) {
  const contextEnum = ContextNames[contextEnumName]
  const context = createContext();

  contexts[contextEnum] = context;

  Providers[contextEnumName] = ({ children, value }) => (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}

export const useComponentContext = contextEnum => useContext(contexts[contextEnum]);

export default Providers;