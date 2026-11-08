import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const item = window.localStorage.getItem(key);
  const value = item ? JSON.parse(item) : initialValue;
  
  const [storedValue, setStoredValue] = useState(value);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}