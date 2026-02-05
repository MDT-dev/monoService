import { gql } from 'graphql-request';

export const PRODUCTS_QUERY = gql`
query Products {
  products {
    id
    name
    slug
    price
    thumbnail {
      url
    }
  }
}

`;
