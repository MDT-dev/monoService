/* eslint-disable @typescript-eslint/no-explicit-any */

const HYGRAPH_URL = process.env.HYGRAPH_API_URL||"";
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN ||"";

type FetchHygraphParams = {
  query: string;
  variables?: Record<string, any>;
  revalidate?: number | false;
};

// // Função otimizada para fazer requisições GraphQL
export async function fetchHygraph<T>({
  query,
  variables = {},
  revalidate = 1, // 1 s por padrão
}: FetchHygraphParams): Promise<T> {
  try {
    const res = await fetch(HYGRAPH_URL, {
      method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     ...(HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : {}),
    //   },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate: revalidate,
      },
    });

    if (!res.ok) {
      throw new Error(`Falha na requisição: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error("Erro GraphQL:", JSON.stringify(json.errors, null, 2));
      throw new Error(`Erro na consulta GraphQL: ${json.errors[0].message}`);
    }

    return json.data;
  } catch (error) {
    console.error("Erro ao buscar dados do Hygraph:", error);
    throw error;
  }
}