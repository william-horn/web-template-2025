"use client"

import { createContext, useContext } from "react";

const providerNames = [
  "ButtonGroup",
  "VerticalContent",
]

const contexts = {};
const Providers = {};

for (let providerName of providerNames) {
  const context = createContext();
  contexts[providerName] = context;

  Providers[providerName] = ({ children, value }) => (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}

export const useComponentContext = providerName => useContext(contexts[providerName]);

export default Providers;