import { LOCAL_STORAGE_KEY } from '../constants';

export default function LocalStorage() {
  const set = (key: keyof typeof LOCAL_STORAGE_KEY, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event(key));
    } catch (error) {
      console.error(error);
    }
  };

  const get = <T>(key: keyof typeof LOCAL_STORAGE_KEY): T | null => {
    const value = localStorage.getItem(key);

    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    set,
    get,
  };
}
