import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import axios, { AxiosInstance } from 'axios';
import AppContext from '../components/context';

export interface IContextValue {
  userData: any;
  responseRep: Array<any>;
  value: string;
  setValue: (value: string) => void;
  setFilteredRepos: React.Dispatch<React.SetStateAction<any[]>>;
  reposPerPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  inputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface UserData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  email: string;
  blog: string;
  public_repos: number;
}

const Home = () => {
  const [userData, setUserData] = useState<null | UserData>(null);
  const [responseRep, setResponseRep] = useState<any[]>([]);
  const [value, setValue] = useState('');
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reposPerPage] = useState(7);

  console.log(filteredRepos);

  const instance: AxiosInstance = axios.create({
    baseURL: `https://api.github.com/`,
    timeout: 1000,
    headers: { Accept: 'application/vnd.github+json' },
  });

  useEffect(() => {
    const debounce = setTimeout(async () => {
      try {
        const userResponse = await instance.get(`users/${value}`);
        setUserData(userResponse.data);
      } catch (error) {
        console.log(`User is not found`, error);
      }

      try {
        const reposResponse = await instance.get(`users/${value}/repos`);
        setResponseRep(reposResponse.data);
      } catch (error) {
        console.log(`User repositories not found`, error);
      }
    }, 0);

    return () => clearTimeout(debounce);
  }, [value]);

  const inputValueChange = (e: any) => {
    setValue(e.target.value);
  };

  const contextValue: IContextValue = {
    userData,
    responseRep,
    value,
    setValue,
    setFilteredRepos,
    reposPerPage,
    currentPage,
    setCurrentPage,
    inputValueChange,
  };

  return (
    <div className="container-header">
      <AppContext.Provider value={contextValue}>
        <Header />
        <Hero />
      </AppContext.Provider>
    </div>
  );
};

export default Home;
