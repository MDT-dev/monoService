import { gql } from "graphql-request";

export const PRODUCT_DETAIL_QUERY = `
  query GetProductDetail($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      slug
      shortDescription
      price
      promoPrice
      isActive
      thumbnail {
        url
      }
      images {
        url
      }
      subCategory {
        id
        name
        category {
          id
          name
        }
      }
    }
  }
`;

export const ALL_PRODUCTS_QUERY = gql`
 
  query Products(
    $orderBy: ProductOrderByInput
    $skip: Int
    $first: Int
    $where: ProductWhereInput
  ) {
    products(
      orderBy: $orderBy
      skip: $skip
      first: $first
      where: $where
    ) {
      id
      name
      slug
      price
      shortDescription
      promoPrice
      stock
      images {
        url
        fileName
      }
      isActive
      sku
      thumbnail {
        url
        fileName
        mimeType
      }
      subCategory {
        id
        name
        slug
        category {
          slug
          id
          name
        }
      }
    }
    productsConnection(where: $where) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      aggregate {
        count
      }
    }
  }
`;

export const ONLY_PRODUCTS_QUERY_SEARCH = gql`
  query Products1(
    $nameProduto: String
    $categoria: String
    $subcategoria: String
  ) {
    products(
      where: {
        subCategory: { slug: $subcategoria, category: { slug: $categoria } }
      }
    ) {
      id
      name
      slug
      price
      shortDescription
      promoPrice
      stock
      images {
        url
        fileName
      }
      isActive
      sku
      thumbnail {
        url
        fileName
        mimeType
      }
      subCategory {
        id
        name
        slug
        category {
          slug
          id
          name
        }
      }
    }
  }
`;

// Query GraphQL com filtros
export const ALL_PRODUCTS_QUERY_SEARCH = gql`
  query Products($categoria: String, $subcategoria: String) {
    products(
      where: {
        subCategory: { slug: $subcategoria, category: { slug: $categoria } }
      }
    ) {
      id
      name
      slug
      price
      shortDescription
      promoPrice
      stock
      images {
        url
        fileName
      }
      isActive
      sku
      thumbnail {
        url
        fileName
        mimeType
      }
      subCategory {
        id
        name
        slug
        category {
          slug
          id
          name
        }
      }
    }
  }
`;

// Query GraphQL com filtros
export const SEARCH = gql`
  query Products($nameProduto: String) {
    products(where: { name_contains: $nameProduto }) {
      id
      name
      slug
      price
      shortDescription
      promoPrice
      stock
      images {
        url
        fileName
      }
      isActive
      sku
      thumbnail {
        url
        fileName
        mimeType
      }
      subCategory {
        id
        name
        slug
        category {
          slug
          id
          name
        }
      }
    }
  }
`;
