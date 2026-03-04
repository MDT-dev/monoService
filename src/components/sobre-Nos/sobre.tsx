
import Image from "next/image"
import {
    Target,
    Heart,
    Lightbulb,
    Shield
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"



const values = [
    {
        icon: Target,
        title: "Excelência",
        description: "Buscamos a perfeição em cada entrega, assegurando os mais altos padrões de qualidade."
    },
    {
        icon: Heart,
        title: "Sustentabilidade",
        description: "A responsabilidade ambiental está no centro de tudo o que fazemos."
    },
    {
        icon: Lightbulb,
        title: "Inovação",
        description: "Apostamos em práticas modernas para garantir produtos frescos e saudáveis."
    },
    {
        icon: Shield,
        title: "Integridade",
        description: "Transparência e confiança guiam nossas relações com clientes e parceiros."
    }
]

export default function SobreNos() {
    return (
        <section id="sobre" className="py-24 bg-white">
            <div className="container">
                {/* Introdução */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center mb-24">


                    <div className="order-2 xl:order-1">
                        <Badge className="mb-6 bg-green-100 text-[#1F8A70] hover:bg-blue-200">
                            Sobre a Milones
                        </Badge>

                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Ferramentas que Constroem o Futuro
                        </h2>




                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                <strong className="text-gray-900">A Milones</strong>  atua no mercado oferecendo produtos e soluções de qualidade para diferentes necessidades do dia a dia.
                            </p>

                            <p>
                                Trabalhamos com uma ampla variedade de produtos, sempre com foco em durabilidade, segurança e eficiência, garantindo que cada cliente encontre o que procura com facilidade e confiança.
                            </p>

                            <p>
                                Atendemos empresas e particulares, oferecendo um atendimento próximo, suporte dedicado e soluções adequadas às reais necessidades de cada cliente.
                            </p>
                        </div>
                    </div>


                    {/* Imagem */}
                    <div className="order-1 xl:order-2 relative">
                        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/milones.png"
                                alt="Equipe e instalações da M Milones"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Valores */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Nossos Valores</Badge>
                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">O que nos move</h3>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Nossos valores são a base de todas as nossas decisões e refletem nosso compromisso com o bem-estar da sociedade.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon
                            return (
                                <Card
                                    key={index}
                                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                                >
                                    <CardContent className="p-8 text-center">
                                        <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}