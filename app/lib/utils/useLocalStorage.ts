import { LOCAL_STORAGE_KEY } from '../constants';

export default function useLocalStorage() {
  const setLS = (key: keyof typeof LOCAL_STORAGE_KEY, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event(key));
    } catch (error) {
      console.error(error);
    }
  };

  const getLS = <T>(key: keyof typeof LOCAL_STORAGE_KEY): T | null => {
    const value = window.localStorage.getItem(key);

    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    setLS,
    getLS,
  };
}
