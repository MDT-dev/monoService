import { fetchHygraph } from '@/lib/fetchHygraph';
import { PRODUCTS_QUERY } from '@/graphql/queries/product';
import { ProductsResponse } from '@/types/graphql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetchHygraph<ProductsResponse>({
      query: PRODUCTS_QUERY,
      revalidate: 60,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API /api/products:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar produtos' },
      { status: 500 }
    );
  }
}
