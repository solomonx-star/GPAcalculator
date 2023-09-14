import React, { createContext, useState, useContext } from 'react';

const ResultsContext = createContext();

export const useResults = () => {
  return useContext(ResultsContext);
};

export const ResultsProvider = ({ children }) => {
  const [savedResults, setSavedResults] = useState([]);

  return (
    <ResultsContext.Provider value={{ savedResults, setSavedResults }}>
      {children}
    </ResultsContext.Provider>
  );
};
