import { doGraphQLFetch } from '../graphql/fetch';
import { userOrdersQuery } from '../graphql/queries';
import { User } from '../interfaces/User';

export default async function getUserOrders(user: User | undefined) {
  if (!user) {
    return undefined;
  }

  const token = sessionStorage.getItem('token')?.slice(1, -1);
  if (!token) {
    return undefined;
  }

  const variables = {
    userId: user.id,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    userOrdersQuery,
    variables,
    token
  );

  if (data.ordersByUser) {
    return data.ordersByUser;
  }

  return undefined;
}
