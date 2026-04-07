import { fetchHygraph } from "@/lib/fetchHygraph";
import {
  AllProductsSiteMap,
} from "@/graphql/queries/product";
import { AllProductsResponse } from "@/types/graphql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch from HyGraph
    const data = await fetchHygraph<AllProductsResponse>({
      query: AllProductsSiteMap,
      revalidate: 60,
    });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 },
    );
  }
}

