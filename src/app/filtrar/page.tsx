import dynamic from 'next/dynamic'
 
const ProductsFilter = dynamic(
  () => import('@/components/product_zone/filter-product-category'),
  { ssr: false }
)
// import { ProductsFilter } from "@/components/product_zone/filter-product-category"

export default function ProductsFilterPage() {

    
    
    return <ProductsFilter/>
}
