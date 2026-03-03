/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchHygraph } from "@/lib/fetchHygraph";
import { ALL_PRODUCTS_QUERY } from "@/graphql/queries/product";
import { AllProductsResponse } from "@/types/graphql";
import { NextResponse, NextRequest } from "next/server";

interface ProductsParams {
  orderBy?: string;
  skip?: number;
  first?: number;
  search?: string;
  category?: string;
  maxPrice?: number;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const params: ProductsParams = {
      orderBy: searchParams.get("orderBy") || undefined,
      skip: searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0,
      first: searchParams.get("first")
        ? parseInt(searchParams.get("first")!)
        : 12,
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      maxPrice: searchParams.get("maxPrice")
        ? parseInt(searchParams.get("maxPrice")!)
        : undefined,
    };

    // Build where clause for HyGraph
    const where: any = {
      AND: [],
    };

    if (params.search) {
      where.AND.push({
        OR: [
          { name_contains: params.search },
          { shortDescription_contains: params.search },
        ],
      });
    }

    if (params.category) {
      where.AND.push({
        subCategory: {
          category: {
            slug: params.category,
          },
        },
      });
    }

    if (params.maxPrice) {
      where.AND.push({
        price_lte: params.maxPrice,
      });
    }

    // Remove empty AND array if no filters applied
    if (where.AND.length === 0) {
      delete where.AND;
    }

    // Build orderBy clause
    const orderByMap: Record<string, string> = {
      newest: "createdAt_DESC",
      oldest: "createdAt_ASC",
      price_low: "price_ASC",
      price_high: "price_DESC",
      name_asc: "name_ASC",
      name_desc: "name_DESC",
    };

    const orderParam = searchParams.get("orderBy") || "createdAt_ASC";

    const orderBy = orderByMap[orderParam];

    // Fetch from HyGraph
    const data = await fetchHygraph<AllProductsResponse>({
      query: ALL_PRODUCTS_QUERY,
      variables: {
        orderBy,
        skip: params.skip,
        first: params.first,
        where: Object.keys(where).length > 0 ? where : undefined,
      },
      revalidate: 60,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API /api/all-products:", error);
    return NextResponse.json(
      { error: "Falha ao buscar todos os produtos" },
      { status: 500 },
    );
  }
}
