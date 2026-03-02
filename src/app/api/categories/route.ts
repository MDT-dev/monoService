import { fetchHygraph } from "@/lib/fetchHygraph";
import { CategoriesResponse } from "@/types/graphql";
import { NextResponse } from "next/server";
import { CATEGORY_QUERY } from "@/graphql/queries/categories";

export async function GET() {
  try {
    const data = await fetchHygraph<CategoriesResponse>({
      query: CATEGORY_QUERY,
      revalidate: 60,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API /api/categories:", error);
    return NextResponse.json(
      { error: "Falha ao buscar categoria" },
      { status: 500 },
    );
  }
}
