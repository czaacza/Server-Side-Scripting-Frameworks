import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { User, UserFromToken, UserOutput } from '../interfaces/User';
import { doGraphQLFetch } from '../graphql/fetch';
import { loginQuery, registerQuery, userByIdQuery } from '../graphql/queries';

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const credentials = { username, password };

    const data = await doGraphQLFetch(
      `${import.meta.env.VITE_GRAPHQL_URL}`,
      loginQuery,
      { credentials }
    );

    if (data.login) {
      sessionStorage.setItem('token', JSON.stringify(data.login.token));
      return { success: true, user: data.login };
    } else {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout(): Promise<void> {
  sessionStorage.removeItem('token');
  location.reload();
}

export async function getStoredUser(): Promise<any> {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return undefined;
  }

  try {
    const userFromToken: UserFromToken = jwt_decode(token);
    if (userFromToken) {
      const data = await doGraphQLFetch(
        `${import.meta.env.VITE_GRAPHQL_URL}`,
        userByIdQuery,
        {
          userByIdId: userFromToken.id,
        }
      );
      return data.userById;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function register(
  username: string,
  password: string,
  email: string
): Promise<any> {
  try {
    const user = { username, password, email };
    const data = await doGraphQLFetch(
      `${import.meta.env.VITE_GRAPHQL_URL}`,
      registerQuery,
      { user }
    );
    if (data.register) {
      sessionStorage.setItem('token', JSON.stringify(data.register.token));
      return { success: true, user: data.register };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
