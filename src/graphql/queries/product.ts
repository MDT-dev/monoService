import { gql } from "graphql-request";

export const PRODUCT_DETAIL_QUERY = `
  query GetProductDetail($slug: String!) {
    product(where: { slug: $slug }) {
      id
      name
      slug
      shortDescription
      description {
        html
      }
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
        slug
        category {
          id
          name
          slug
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
    products(orderBy: $orderBy, skip: $skip, first: $first, where: $where) {
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
      images {
        url
        fileName
      }
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
      first: 100
    ) {
      id
      name
      slug
      price
      shortDescription
      description {
        html
      }
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

export const AllProductsSiteMap = gql`
  query Products {
    products(first: 200) {
      id
      slug
      name
      updatedAt
    }
  }
`;
