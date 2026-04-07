import { Product } from '@/types/product'
import { MetadataRoute } from 'next'



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://milones.ao'

  // URLs estáticas principais
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre-nos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // URLs dinâmicas de produtos
  let dynamicProductUrls: MetadataRoute.Sitemap = []

  try {
    const response = await fetch(`${baseUrl}/api/products-sitemap`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache por 1 hora
    })

    if (response.ok) {
      const data = await response.json()
      const products = data.products as Product[]
      dynamicProductUrls = products.map((product: Product) => ({
        url: `${baseUrl}/produtos/${product.slug}`,
        lastModified: new Date(product.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Erro ao gerar URLs dinâmicas do sitemap:', error)
    // Em caso de erro, usa produtos de fallback
    dynamicProductUrls = [
      {
        url: `${baseUrl}/produtos/tinteiro-hp-305`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ]
  }

  return [...staticUrls, ...dynamicProductUrls]
}