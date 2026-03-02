import { gql } from 'graphql-request';

export const  CATEGORY_QUERY = gql`
query Categories {
   categories{
    id
    name
    slug
    description
    subCategories{
      id
      name
      slug
      image{
        url
        fileName
       mimeType
        
      }
      description
    }
  }
}

`;
