"use client"

import React, { createContext, useContext, useState } from "react"

export interface InitialCharacterMessageContextType {
  initialCharacterMessage: string
  updateInitialCharacterMessage: (newInitialCharacterMessage: string) => void
}

const InitialCharacterMessageContext = createContext<
  InitialCharacterMessageContextType | undefined
>(undefined)

export const useInitialCharacterMessage = () => {
  return useContext(
    InitialCharacterMessageContext
  ) as InitialCharacterMessageContextType
}

export const InitialCharacterMessageProvider = ({
  defaultMessage = "",
  children,
}: {
  children: React.ReactNode
  defaultMessage: string
}) => {
  const [initialCharacterMessage, updateInitialCharacterMessage] =
    useState(defaultMessage)

  return (
    <InitialCharacterMessageContext.Provider
      value={{ initialCharacterMessage, updateInitialCharacterMessage }}
    >
      {children}
    </InitialCharacterMessageContext.Provider>
  )
}
