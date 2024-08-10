import { LOCAL_STORAGE_KEY } from '../constants';

export default function LocalStorage() {
  const set = (key: keyof typeof LOCAL_STORAGE_KEY, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const get = <T>(key: keyof typeof LOCAL_STORAGE_KEY): T | null => {
    const value = localStorage.getItem(key);

    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    set,
    get,
  };
}
