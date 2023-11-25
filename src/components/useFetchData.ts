import { useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';

interface UseCustomHook {
  value: string;
  setUserData: (userData: any) => void;
  setResponseRep: (responseRep: any[]) => void;
  instance: AxiosInstance;
}

export function useFetchData({
  value,
  setUserData,
  setResponseRep,
  instance,
}: UseCustomHook) {
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
  }, [value, setUserData, setResponseRep]);
}
