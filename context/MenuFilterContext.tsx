"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type ContextType = {
  menuType: string;
  setMenuType: (type: string) => void;
};

const MenuFilterContext =
  createContext<ContextType | null>(null);

export function MenuFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [menuType, setMenuType] =
    useState("All");

  return (

    <MenuFilterContext.Provider
      value={{
        menuType,
        setMenuType,
      }}
    >

      {children}

    </MenuFilterContext.Provider>

  );

}

export function useMenuFilter() {

  const context =
    useContext(MenuFilterContext);

  if (!context) {

    throw new Error(
      "useMenuFilter must be used inside provider"
    );

  }

  return context;

}