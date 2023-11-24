import React from 'react';
import { IContextValue } from '../pages/Home';
import { createContext } from 'react';

export const AppContext = createContext<IContextValue>({
  userData: '',
  responseRep: [],
  value: '',
  setValue: () => {},
  setFilteredRepos: () => {},
  reposPerPage: 0,
  currentPage: 0,
  setCurrentPage: () => {},
  inputValueChange: () => {},
});

export default AppContext;
