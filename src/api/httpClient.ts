
const API_URL = import.meta.env.VITE_API_URL;

let authToken: string | null = null;

export const setAuthTokenForClient = (token: string | null): void => {
  authToken = token;
};

export async function httpClient<T>(endpoint: string, options?: RequestInit, requiresAuth: boolean = false): Promise<T> {

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...options?.headers,
  });

  if(requiresAuth){
    headers.set('Authorization', `Bearer ${authToken}`)
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText} (${endpoint})`);
  }

  return response.json();
}