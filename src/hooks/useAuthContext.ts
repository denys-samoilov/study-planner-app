import { useContext } from 'react';
import { AuthContext } from '../context/authContextType';

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a TaskProvider.');
  }
  return context;

}