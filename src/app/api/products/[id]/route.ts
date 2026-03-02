import { fetchHygraph } from '@/lib/fetchHygraph';
import { PRODUCT_DETAIL_QUERY } from '@/graphql/queries/product';
import { ProductDetailResponse } from '@/types/graphql';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    const data = await fetchHygraph<ProductDetailResponse>({
      query: PRODUCT_DETAIL_QUERY,
      variables: { id },
    });

    console.log("DATA:", data);

    return NextResponse.json({ product: data.product });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Falha ao buscar detalhes do produto" },
      { status: 500 }
    );
  }
}
