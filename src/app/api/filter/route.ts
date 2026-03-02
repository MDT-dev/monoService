// /app/api/products/route.ts
import { fetchHygraph } from "@/lib/fetchHygraph";
import { NextResponse } from "next/server";
import { ALL_PRODUCTS_QUERY_SEARCH } from "@/graphql/queries/product";
import { AllProductsResponse } from "@/types/graphql";

export async function GET(request: Request) {
  try {
    // Pegar search params da URL
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria") || "";
    const subcategoria = searchParams.get("subcategoria") || "";

    const data = await fetchHygraph<AllProductsResponse>({
      query: ALL_PRODUCTS_QUERY_SEARCH,
      variables: { categoria, subcategoria },
      revalidate: 60,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API /api/search:", error);
    return NextResponse.json(
      { error: "Falha ao buscar produtos" },
      { status: 500 },
    );
  }
}
