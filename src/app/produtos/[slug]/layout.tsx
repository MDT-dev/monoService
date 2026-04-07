import { PRODUCT_DETAIL_QUERY } from '@/graphql/queries/product'
import { fetchHygraph } from '@/lib/fetchHygraph'
import { ProductDetailResponse } from '@/types/graphql'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{
    slug: string
  }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    try {


        const {
            product
        } = await fetchHygraph<ProductDetailResponse>({
            query: PRODUCT_DETAIL_QUERY,
            variables: { slug },
        });

        if (!product) {
            throw new Error('Product not found')
        }



        const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://milones.ao'}/produtos/${slug}`
        const imageUrl = product?.thumbnail?.url || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://milones.ao'}/og-image.png`

        const discount = product?.promoPrice
            ? Math.round(((product.promoPrice - product.price) / product.promoPrice) * 100)
            : 0

        const title = `${product?.name} | ${discount > 0 ? `Desconto de ${discount}%!` : 'Confira o melhor preço!'}`
        const description = product?.shortDescription || `Confira ${product?.name} com melhor preço na nossa loja.`

        return {
            title,
            description,
            keywords: [
                product?.name,
                product?.subCategory?.name,
                product?.subCategory?.category?.name,
                'comprar online',
                'melhor preço'
            ].filter(Boolean),
            openGraph: {
                title,
                description,
                url: productUrl,
                type: 'website',
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 1200,
                        alt: product?.name,
                        type: 'image/jpeg',
                    },
                    {
                        url: imageUrl,
                        width: 630,
                        height: 630,
                        alt: product?.name,
                        type: 'image/jpeg',
                    },
                ],
                siteName: 'Milones Lda',
                locale: 'pt_AO',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [imageUrl],
                creator: '@milones',
            },
            robots: {
                index: product?.isActive !== false,
                follow: true,
                nocache: false,
                googleBot: {
                    index: product?.isActive !== false,
                    follow: true,
                },
            },
            alternates: {
                canonical: productUrl,
            },
        }
    } catch (error) {
        console.error('Error generating metadata:', error)

        return {
            title: 'Produto',
            description: 'Confira nossos produtos com os melhores preços.',
            openGraph: {
                title: 'Produto',
                description: 'Confira nossos produtos com os melhores preços.',
                type: 'website',
            },
        }
    }
}

export default function ProductLayout({ children }: Props) {
    
    return <>{children}</>
}
