import axios from 'axios';

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      { username, password }
    );

    if (response.status === 200) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
      return { success: true, user: response.data };
    } else {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout(): Promise<void> {
  console.log('logout() called');
  sessionStorage.removeItem('user');
  // await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
}

export function getStoredUser(): any | null {
  const storedUserData = sessionStorage.getItem('user');
  return storedUserData ? JSON.parse(storedUserData) : null;
}
