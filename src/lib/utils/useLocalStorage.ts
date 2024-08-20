import { LOCAL_STORAGE_KEY } from '../constants';

export default function useLocalStorage() {
  const setLS = (key: keyof typeof LOCAL_STORAGE_KEY, value: unknown) => {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      global.dispatchEvent(new Event(key));
    } catch (error) {
      console.error(error);
    }
  };

  const getLS = <T>(key: keyof typeof LOCAL_STORAGE_KEY): T | null => {
    if (typeof window === 'undefined') return null;

    const value = global.localStorage.getItem(key);

    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    getLS,
    setLS,
  };
}
