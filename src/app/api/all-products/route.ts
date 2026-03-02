import { fetchHygraph } from '@/lib/fetchHygraph';
import { ALL_PRODUCTS_QUERY} from '@/graphql/queries/product';
import { AllProductsResponse } from '@/types/graphql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetchHygraph<AllProductsResponse>({
      query: ALL_PRODUCTS_QUERY,
      revalidate: 60,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API /api/all-products:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar todos os produtos' },
      { status: 500 }
    );
  }
}
