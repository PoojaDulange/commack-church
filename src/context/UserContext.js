/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

const INITIAL_STATE = {
  currentUser: null,
}
export const UserContext = createContext(INITIAL_STATE)

export const UserContextProvider = ({ children }) => {
  const [state, setState] = useState('')

  const dispatch = (value) => {
    setState(value.payload)
  }

  return <UserContext.Provider value={{ user: state, dispatch }}>{children}</UserContext.Provider>
}
