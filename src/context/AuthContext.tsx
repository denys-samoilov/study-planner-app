import { useCallback, useState } from 'react';
import { authRepository } from '../repositories/authRepository';
import type { AuthUser } from '../types/authUser';
import { AuthContext } from './authContextType';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
      const response = await authRepository.login(username, password);
      setAccessToken(response.accessToken);

      try {
        const currentUser = await authRepository.getCurrentUser(response.accessToken);
        setUser(currentUser);
      } 
      catch {
        setUser({
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          image: response.image,
        });
      }
   
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(accessToken && user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
