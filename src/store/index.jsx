import React, { createContext, useContext, useReducer } from 'react';

export const initialState = {
  user: {},
};

export const Context = createContext({});

export const useContextStore = () => {
  return useContext(Context);
};

export const reducer = (state, action) => {
  return { ...state, ...action };
};

export const Provider = ({ children, value, ...others }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...value });
  const clearData = () => {
    dispatch(initialState);
  };
  return (
    <Context.Provider value={{ ...state, dispatch, clearData, ...others }}>
      {children}
    </Context.Provider>
  );
};
