import Image from "next/image"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const newsArticles = [
  {
    id: 1,
    title: "Sistema Revolucionário de Irrigação Inteligente Reduz Consumo de Água em 40%",
    excerpt:
      "Nossa mais recente tecnologia de irrigação com IoT está ajudando agricultores a otimizar o uso da água sem perder produtividade.",
    image: "/assets/logo2.png",
    author: "Dr. Paulo André",
    date: new Date(),
    category: "Tecnologia",
    featured: true,
  },
  {
    id: 2,
    title: "Práticas Sustentáveis de Apicultura Mostram Resultados Promissores",
    excerpt:
      "Novas pesquisas mostram como nossos métodos ecológicos de apicultura estão melhorando a saúde das colmeias e a produção de mel.",
    image: "/assets/logo2.png",
    author: "José Paulo",
    date: new Date(),
    category: "Pesquisa",
    featured: false,
  },
  {
    id: 3,
    title: "AgriTech Expande Operações para Três Novos Países",
    excerpt:
      "Temos o prazer de anunciar nossa expansão para o Quênia, Vietnã e Brasil, levando nossa expertise para novos mercados.",
    image: "/assets/logo2.png",
    author: "Catia Zongo",
    date: new Date(),
    category: "Notícias da Empresa",
    featured: false,
  },
  {
    id: 4,
    title: "Sistema de Monitoramento de Saúde Avícola Previne Surto de Doenças",
    excerpt:
      "Nosso sistema de monitoramento com IA evitou diversos surtos de doenças em fazendas parceiras.",
    image: "/assets/logo2.png",
    author: "Dr. Jamba Lucutuca",
    date: new Date(),
    category: "Inovação",
    featured: false,
  },
  {
    id: 5,
    title: "Série de Workshops em Aquacultura Começa no Próximo Mês",
    excerpt:
      "Participe de nossa série completa de workshops sobre técnicas modernas de piscicultura e práticas sustentáveis de aquacultura.",
    image: "/assets/logo2.png",
    author: "Roberto Fonseca",
    date: new Date(),
    category: "Educação",
    featured: false,
  },
  {
    id: 6,
    title: "Parceria com Universidades Impulsiona Pesquisa Agrícola",
    excerpt:
      "Novas colaborações com universidades de referência estão acelerando a inovação em práticas agrícolas sustentáveis.",
    image: "/assets/logo2.png",
    author: "Dr. Sara José",
    date: new Date(),
    category: "Parceria",
    featured: false,
  },
]

export default function NewsSection() {
  const featuredArticle = newsArticles.find((article) => article.featured)
  const regularArticles = newsArticles.filter((article) => !article.featured)

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container">

        {/* Artigo em Destaque */}
        {featuredArticle && (
          <div className="mb-16">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 hover:bg-green-700">Destaque</Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {featuredArticle.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredArticle.date).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {featuredArticle.author}
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 group">
                      Ler Mais
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Grade de Artigos Regulares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularArticles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 group p-0">
                    Ler Mais
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cadastro na Newsletter */}

      </div>
    </section>
  )
}