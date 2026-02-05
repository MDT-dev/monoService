
// import { Produto, Categoria, Subcategoria } from "@/types";
// import { Servico } from "@/types/servicos";



import { GraphQLClient } from 'graphql-request';

export const hygraph = new GraphQLClient(
  process.env.HYGRAPH_API_URL as string
);

