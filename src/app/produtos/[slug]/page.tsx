import { ProductDetails } from "@/components/product-details"

export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProdutosPage({ params }: ProductPageProps) {
  const { slug } = await params  // <-- aqui desatas a promise


  return <ProductDetails params={{ slug }} />
}