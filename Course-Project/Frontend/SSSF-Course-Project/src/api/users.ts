import jwt_decode from 'jwt-decode';
import { User, UserFromToken, UserOutput } from '../interfaces/User';
import { doGraphQLFetch } from '../graphql/fetch';
import { userByIdQuery } from '../graphql/queries';
export async function getStoredUser(): Promise<User | undefined> {
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
      console.log(data);
      return data.userById;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export function isUserAdmin(token: string): boolean {
  const userFromToken: UserFromToken = jwt_decode(token);
  if (userFromToken) {
    return userFromToken.isAdmin === true;
  }
  return false;
}
