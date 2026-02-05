"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Clock, AlertTriangle, CheckCircle2, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TextReveal } from "@/components/ui2/text-reveal"
import { AnimatedGradientText } from "@/components/ui2/animated-gradient-text"
import { Spotlight } from "@/components/ui2/spotlight"



export default function TermosPage() {
    const lastUpdated = "15 de Maio de 2025"

    return (
        <>
            {/* Hero Section */}
            <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden top-margin">
                <div className="absolute inset-0 bg-dots z-0"></div>
                <div className="container  relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <AnimatedGradientText className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                                Termos de Uso
                            </AnimatedGradientText>
                            <p className="text-xl text-muted-foreground mb-8">
                                Condições gerais para utilização dos nossos serviços e produtos
                            </p>
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>Última atualização: {lastUpdated}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-16">
                <div className="container ">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Nesta página</h3>
                                        <nav className="space-y-2">
                                            {[
                                                { title: "Aceitação dos Termos", href: "#aceitacao" },
                                                { title: "Elegibilidade", href: "#elegibilidade" },
                                                { title: "Serviços e Produtos", href: "#servicos" },
                                                { title: "Propriedade Intelectual", href: "#propriedade" },
                                                { title: "Limitação de Responsabilidade", href: "#responsabilidade" },
                                                { title: "Garantias", href: "#garantias" },
                                                { title: "Rescisão", href: "#rescisao" },
                                                { title: "Lei Aplicável", href: "#lei" },
                                            ].map((item, index) => (
                                                <div key={index} className="hover-lift">
                                                    <Link
                                                        href={item.href}
                                                        className="block text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </div>
                                            ))}
                                        </nav>

                                        <div className="mt-8 pt-6 border-t border-border">
                                            <h4 className="font-medium mb-3">Documentos Relacionados</h4>
                                            <div className="space-y-3">
                                                <Link
                                                    href="/politicas-de-privacidade"
                                                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    <span>Política de Privacidade</span>
                                                </Link>
                                                <Link
                                                    href="/contacto"
                                                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    <span>Formulário de Contacto</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardContent className="p-6">
                                        <div className="flex items-center mb-4">
                                            <Scale className="h-6 w-6 text-primary mr-2" />
                                            <h3 className="text-lg font-semibold">Aviso Legal</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Recomendamos que leia atentamente estes Termos de Uso antes de utilizar os nossos serviços. Ao
                                            utilizar o nosso website ou serviços, concorda com estes termos.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="space-y-12">
                                <div id="aceitacao" className="scroll-mt-24">
                                    <TextReveal
                                        text="Aceitação dos Termos"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            Ao aceder ou utilizar o website da Mundo Saudável, os serviços disponibilizados através do
                                            website, ou qualquer aplicação fornecida pela Mundo Saudável (coletivamente, os &quot;Serviços&quot;), está
                                            a concordar em ficar vinculado a estes Termos de Uso (&quot;Termos&quot;). Se não concordar com algum aspeto
                                            destes Termos, não deve utilizar os nossos Serviços.
                                        </p>
                                        <p>
                                            Reservamo-nos o direito de modificar estes Termos a qualquer momento. Todas as alterações entrarão
                                            em vigor imediatamente após a publicação no website. É da sua responsabilidade verificar
                                            periodicamente se existem atualizações. O uso continuado dos Serviços após a publicação de
                                            alterações constitui a sua aceitação dessas alterações.
                                        </p>
                                    </div>
                                </div>

                                <div id="elegibilidade" className="scroll-mt-24">
                                    <TextReveal
                                        text="Elegibilidade"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            Os Serviços destinam-se apenas a utilizadores com pelo menos 18 anos de idade. Ao utilizar os
                                            Serviços, declara e garante que:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Tem pelo menos 18 anos de idade;</li>
                                            <li>Tem plena capacidade legal para celebrar um contrato vinculativo com a Mundo Saudável; e</li>
                                            <li>A sua utilização dos Serviços não viola qualquer lei ou regulamento aplicável.</li>
                                        </ul>
                                        <p>
                                            Se estiver a utilizar os Serviços em nome de uma empresa, organização ou outra entidade legal,
                                            declara e garante que tem autoridade para vincular essa entidade a estes Termos, caso em que os
                                            termos &quot;você&quot; ou &quot;seu&quot; referir-se-ão a essa entidade.
                                        </p>
                                    </div>
                                </div>

                                <div id="servicos" className="scroll-mt-24">
                                    <TextReveal
                                        text="Serviços e Produtos"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            A Mundo Saudável fornece soluções de tecnologia de informação, incluindo venda de hardware,
                                            software, serviços de rede e segurança, bem como serviços de consultoria e suporte técnico.
                                        </p>
                                        <p>
                                            Todos os produtos e serviços estão sujeitos à disponibilidade. Reservamo-nos o direito de
                                            modificar, suspender ou descontinuar qualquer aspeto dos nossos Serviços a qualquer momento, com
                                            ou sem aviso prévio.
                                        </p>
                                        <p>
                                            As descrições dos produtos e serviços, bem como os preços, estão sujeitos a alterações sem aviso
                                            prévio. Embora nos esforcemos para fornecer informações precisas, não garantimos que as descrições
                                            dos produtos ou outros conteúdos do website sejam precisos, completos, fiáveis, atuais ou livres
                                            de erros.
                                        </p>
                                        <p>
                                            Alguns produtos ou serviços podem estar sujeitos a termos e condições adicionais, que serão
                                            apresentados no momento da compra ou contratação.
                                        </p>
                                    </div>
                                </div>

                                <div id="propriedade" className="scroll-mt-24">
                                    <TextReveal
                                        text="Propriedade Intelectual"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            Todo o conteúdo incluído no website, como texto, gráficos, logotipos, ícones de botões, imagens,
                                            clipes de áudio, downloads digitais, compilações de dados e software, é propriedade da Switch and
                                            Plug ou dos seus fornecedores de conteúdo e está protegido pelas leis de direitos autorais e
                                            propriedade intelectual.
                                        </p>
                                        <p>
                                            Concedemos-lhe uma licença limitada, não exclusiva, não transferível e revogável para aceder e
                                            utilizar os Serviços para fins pessoais ou comerciais legítimos relacionados com a avaliação ou
                                            utilização dos produtos e serviços da Mundo Saudável.
                                        </p>
                                        <p>Não é permitido:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>
                                                Modificar, copiar, distribuir, transmitir, exibir, executar, reproduzir, publicar, licenciar,
                                                criar obras derivadas, transferir ou vender qualquer informação obtida dos Serviços;
                                            </li>
                                            <li>Utilizar os Serviços para fins comerciais não autorizados;</li>
                                            <li>
                                                Tentar descompilar, fazer engenharia reversa ou desmontar qualquer software contido no website;
                                            </li>
                                            <li>Remover quaisquer avisos de direitos autorais ou outras notações de propriedade;</li>
                                            <li>
                                                Transferir os Serviços ou materiais para outra pessoa ou &quot;espelhar&quot; os materiais em qualquer
                                                outro servidor.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="responsabilidade" className="scroll-mt-24">
                                    <TextReveal
                                        text="Limitação de Responsabilidade"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            Em nenhuma circunstância a Mundo Saudável, os seus diretores, funcionários, agentes, parceiros ou
                                            fornecedores serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais,
                                            consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou
                                            outras perdas intangíveis, resultantes de:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>O seu acesso ou utilização ou incapacidade de aceder ou utilizar os Serviços;</li>
                                            <li>Qualquer conduta ou conteúdo de terceiros nos Serviços;</li>
                                            <li>Qualquer conteúdo obtido dos Serviços; e</li>
                                            <li>Acesso não autorizado, uso ou alteração das suas transmissões ou conteúdo.</li>
                                        </ul>
                                        <p>
                                            Esta limitação de responsabilidade aplica-se independentemente da base legal da reclamação e mesmo
                                            que a Mundo Saudável tenha sido avisada da possibilidade de tais danos.
                                        </p>
                                    </div>
                                </div>

                                <div id="garantias" className="scroll-mt-24">
                                    <TextReveal
                                        text="Garantias"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            Os produtos vendidos pela Mundo Saudável estão sujeitos às garantias fornecidas pelos respetivos
                                            fabricantes. A Mundo Saudável não oferece garantias adicionais além das expressamente
                                            estabelecidas nos termos de garantia do fabricante, exceto quando indicado especificamente por
                                            escrito.
                                        </p>
                                        <p>
                                            Os serviços prestados pela Mundo Saudável são garantidos conforme especificado nos contratos de
                                            serviço individuais. Na ausência de termos específicos, a Mundo Saudável garante que os serviços
                                            serão realizados de maneira profissional e de acordo com os padrões da indústria.
                                        </p>
                                        <p>
                                            EXCETO CONFORME EXPRESSAMENTE ESTABELECIDO NESTES TERMOS, OS SERVIÇOS SÃO FORNECIDOS &quot;COMO ESTÃO&quot;
                                            E &quot;CONFORME DISPONÍVEIS&quot;, SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS
                                            NÃO SE LIMITANDO A, GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM DETERMINADO FIM E NÃO
                                            VIOLAÇÃO.
                                        </p>
                                    </div>
                                </div>

                                <div id="rescisao" className="scroll-mt-24">
                                    <TextReveal
                                        text="Rescisão"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            A Mundo Saudável pode, a seu exclusivo critério, suspender ou encerrar o seu acesso a todos ou
                                            parte dos Serviços, com ou sem aviso prévio, por qualquer motivo, incluindo, sem limitação,
                                            violação destes Termos.
                                        </p>
                                        <p>
                                            Todas as disposições dos Termos que, por sua natureza, devam sobreviver à rescisão, sobreviverão à
                                            rescisão, incluindo, sem limitação, disposições de propriedade, isenções de garantia, indenização
                                            e limitações de responsabilidade.
                                        </p>
                                    </div>
                                </div>

                                <div id="lei" className="scroll-mt-24">
                                    <TextReveal
                                        text="Lei Aplicável"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
                                        delay={0.1}
                                    />
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>
                                            Estes Termos serão regidos e interpretados de acordo com as leis de Angola, sem considerar os seus
                                            princípios de conflito de leis.
                                        </p>
                                        <p>
                                            Qualquer disputa decorrente ou relacionada com estes Termos ou com os Serviços será submetida à
                                            jurisdição exclusiva dos tribunais de Luanda, Angola.
                                        </p>
                                    </div>
                                </div>

                                <Spotlight className="rounded-xl mt-12">
                                    <Card className="border-none bg-accent/50 backdrop-blur-card">
                                        <CardContent className="p-6 md:p-8">
                                            <div className="flex items-center mb-6">
                                                <AlertTriangle className="h-6 w-6 text-primary mr-2" />
                                                <h3 className="text-xl font-bold">Pontos Importantes</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-start">
                                                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                                        <div>
                                                            <h4 className="font-medium">Aceitação</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Ao utilizar o nosso website ou serviços, concorda com estes termos.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                                        <div>
                                                            <h4 className="font-medium">Propriedade Intelectual</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Todo o conteúdo do website é propriedade da Mundo Saudável e está protegido por
                                                                direitos autorais.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-start">
                                                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                                        <div>
                                                            <h4 className="font-medium">Limitação de Responsabilidade</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Não somos responsáveis por danos indiretos resultantes do uso dos nossos serviços.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                                        <div>
                                                            <h4 className="font-medium">Garantias</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Os produtos têm garantia dos fabricantes e os serviços são garantidos conforme contratos
                                                                específicos.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Spotlight>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 bg-secondary">
                <div className="container ">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ainda tem dúvidas?</h2>
                        <p className="text-muted-foreground mb-8">
                            Se tiver alguma questão sobre os nossos Termos de Uso ou precisar de esclarecimentos adicionais, não
                            hesite em contactar-nos.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild className="bg-green-700 hover:bg-green-500 text-white">
                                <Link href="/contacto">Contacte-nos</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/politicas-de-privacidade">Ver Política de Privacidade</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}