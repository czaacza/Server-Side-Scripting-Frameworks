import axios from 'axios';
import { doGraphQLFetch } from '../graphql/fetch';
import { getProductsQuery } from '../graphql/queries';

// fetch products from the API

export async function fetchProducts() {
  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    getProductsQuery,
    {}
  );
  if (data && data.books) {
    return data.books;
  }

  return undefined;
}
