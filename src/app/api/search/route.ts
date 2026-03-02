// /app/api/products/route.ts
import { SEARCH } from "@/graphql/queries/product";
import { fetchHygraph } from "@/lib/fetchHygraph";
import { AllProductsResponse } from "@/types/graphql";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Pegar search params da URL
    const { searchParams } = new URL(request.url);
    const nameProduto = searchParams.get("nameProduto") || "";

    const data = await fetchHygraph<AllProductsResponse>({
      query: SEARCH,
      variables: { nameProduto },
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
