"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextReveal } from "@/components/ui2/text-reveal"; 
import { Spotlight } from "@/components/ui2/spotlight";
import { AnimatedGradientText } from "@/components/ui2/animated-gradient-text";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4 pt-2 text-muted-foreground">{children}</div>
      </motion.div>
    </div>
  );
};

export default function PrivacidadePage() {
  const lastUpdated = "15 de Maio de 2025";

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden top-margin">
        <div className="absolute inset-0 bg-dots z-0"/>
        <div className="container  relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedGradientText className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Política de Privacidade
              </AnimatedGradientText>
              <p className="text-xl text-muted-foreground mb-8">
                Saiba como tratamos e protegemos os seus dados pessoais
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
              <div className="sticky top-36">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Nesta página</h3>
                    <nav className="space-y-2">
                      {[
                        { title: "Introdução", href: "#introducao" },
                        { title: "Recolha de Dados", href: "#recolha" },
                        { title: "Utilização de Dados", href: "#utilizacao" },
                        { title: "Cookies", href: "#cookies" },
                        { title: "Direitos do Utilizador", href: "#direitos" },
                        { title: "Segurança", href: "#seguranca" },
                        { title: "Alterações à Política", href: "#alteracoes" },
                        { title: "Contacto", href: "#contacto" },
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
                      <h4 className="font-medium mb-3">
                        Documentos Relacionados
                      </h4>
                      <div className="space-y-3">
                        <Link
                          href="/termos"
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Termos de Uso</span>
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
                      <Shield className="h-6 w-6 text-primary mr-2" />
                      <h3 className="text-lg font-semibold">
                        Compromisso com a Privacidade
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A Mundo Saudável está comprometida em proteger a sua privacidade e
                      garantir a segurança dos seus dados pessoais em
                      conformidade com a legislação aplicável.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="politica" className="w-full">
                <TabsList className="grid w-full gap-4 grid-cols-2 mb-8">
                  <TabsTrigger
                    value="politica"
                    className="text-base focus:bg-green-500"
                  >
                    Política de Privacidade
                  </TabsTrigger>
                  <TabsTrigger value="resumo" className="text-base">
                    Resumo Simplificado
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="politica" className="space-y-8">
                  <div id="introducao" className="scroll-mt-24">
                    <TextReveal
                      text="Introdução"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        A Mundo Saudável valoriza a privacidade dos seus clientes e
                        utilizadores. Esta Política de Privacidade explica como
                        recolhemos, utilizamos, divulgamos e protegemos as suas
                        informações pessoais quando utiliza o nosso website ou
                        os nossos serviços.
                      </p>
                      <p>
                        Ao utilizar o nosso website ou fornecer-nos os seus
                        dados pessoais, está a aceitar as práticas descritas
                        nesta Política de Privacidade. Se não concordar com esta
                        política, por favor não utilize o nosso website ou
                        forneça-nos os seus dados pessoais.
                      </p>
                    </div>
                  </div>

                  <div id="recolha" className="scroll-mt-24">
                    <TextReveal
                      text="Recolha de Dados"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>Podemos recolher os seguintes tipos de informações:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Informações de identificação pessoal</strong>:
                          nome, endereço de email, número de telefone, endereço
                          postal, quando fornecidos voluntariamente.
                        </li>
                        <li>
                          <strong>Informações de utilização</strong>: dados
                          sobre como interage com o nosso website, incluindo
                          páginas visitadas, tempo de permanência, cliques e
                          outras ações.
                        </li>
                        <li>
                          <strong>Informações do dispositivo</strong>: tipo de
                          dispositivo, sistema operativo, tipo de navegador,
                          endereço IP e identificadores de dispositivo.
                        </li>
                        <li>
                          <strong>Cookies e tecnologias semelhantes</strong>:
                          utilizamos cookies e tecnologias semelhantes para
                          melhorar a sua experiência, analisar o tráfego e
                          personalizar o conteúdo.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div id="utilizacao" className="scroll-mt-24">
                    <TextReveal
                      text="Utilização de Dados"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Utilizamos as suas informações pessoais para os
                        seguintes fins:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Fornecer, manter e melhorar os nossos serviços;</li>
                        <li>
                          Processar transações e enviar notificações
                          relacionadas;
                        </li>
                        <li>
                          Responder a consultas, comentários e fornecer suporte
                          ao cliente;
                        </li>
                        <li>
                          Enviar informações sobre os nossos produtos, serviços
                          e promoções (se consentir);
                        </li>
                        <li>
                          Analisar tendências de utilização e melhorar a
                          experiência do utilizador;
                        </li>
                        <li>
                          Proteger a segurança e integridade dos nossos
                          serviços;
                        </li>
                        <li>Cumprir obrigações legais.</li>
                      </ul>
                    </div>
                  </div>

                  <div id="cookies" className="scroll-mt-24">
                    <TextReveal
                      text="Cookies e Tecnologias Semelhantes"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        O nosso website utiliza cookies e tecnologias
                        semelhantes para melhorar a sua experiência de
                        navegação. Os cookies são pequenos ficheiros de texto
                        armazenados no seu dispositivo que nos ajudam a:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Lembrar as suas preferências e definições;</li>
                        <li>Entender como utiliza o nosso website;</li>
                        <li>
                          Melhorar o desempenho e a funcionalidade do website;
                        </li>
                        <li>Personalizar a sua experiência;</li>
                        <li>
                          Fornecer publicidade relevante (quando aplicável).
                        </li>
                      </ul>
                      <p>
                        Pode gerir as suas preferências de cookies através das
                        definições do seu navegador. No entanto, desativar
                        certos cookies pode afetar a funcionalidade do website.
                      </p>
                    </div>
                  </div>

                  <div id="direitos" className="scroll-mt-24">
                    <TextReveal
                      text="Direitos do Utilizador"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        De acordo com a legislação aplicável, você tem os
                        seguintes direitos:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Direito de acesso</strong>: Solicitar uma
                          cópia das suas informações pessoais que mantemos.
                        </li>
                        <li>
                          <strong>Direito de retificação</strong>: Corrigir
                          informações imprecisas ou incompletas.
                        </li>
                        <li>
                          <strong>Direito ao apagamento</strong>: Solicitar a
                          eliminação dos seus dados pessoais em determinadas
                          circunstâncias.
                        </li>
                        <li>
                          <strong>Direito à restrição do tratamento</strong>:
                          Limitar como utilizamos os seus dados em determinadas
                          circunstâncias.
                        </li>
                        <li>
                          <strong>Direito à portabilidade dos dados</strong>:
                          Receber os seus dados num formato estruturado e
                          transferi-los para outro fornecedor de serviços.
                        </li>
                        <li>
                          <strong>Direito de oposição</strong>: Opor-se ao
                          tratamento dos seus dados para determinados fins,
                          incluindo marketing direto.
                        </li>
                      </ul>
                      <p>
                        Para exercer qualquer um destes direitos, entre em
                        contacto connosco através dos detalhes fornecidos na
                        secção Contacto.
                      </p>
                    </div>
                  </div>

                  <div id="seguranca" className="scroll-mt-24">
                    <TextReveal
                      text="Segurança dos Dados"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Implementamos medidas de segurança técnicas e
                        organizacionais adequadas para proteger os seus dados
                        pessoais contra acesso não autorizado, alteração,
                        divulgação ou destruição. Estas medidas incluem:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Encriptação de dados sensíveis;</li>
                        <li>
                          Firewalls e sistemas de proteção contra intrusões;
                        </li>
                        <li>Acesso restrito a informações pessoais;</li>
                        <li>
                          Monitorização regular dos nossos sistemas para detetar
                          vulnerabilidades;
                        </li>
                        <li>
                          Formação de funcionários sobre práticas de segurança
                          de dados.
                        </li>
                      </ul>
                      <p>
                        No entanto, nenhum método de transmissão pela Internet
                        ou método de armazenamento eletrónico é 100% seguro.
                        Portanto, não podemos garantir a sua segurança absoluta.
                      </p>
                    </div>
                  </div>

                  <div id="alteracoes" className="scroll-mt-24">
                    <TextReveal
                      text="Alterações à Política de Privacidade"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Podemos atualizar esta Política de Privacidade
                        periodicamente para refletir alterações nas nossas
                        práticas de informação ou por outros motivos
                        operacionais, legais ou regulamentares. A versão mais
                        recente estará sempre disponível no nosso website, com a
                        data da última atualização.
                      </p>
                      <p>
                        Recomendamos que reveja regularmente esta Política de
                        Privacidade para se manter informado sobre como
                        protegemos as suas informações.
                      </p>
                    </div>
                  </div>

                  <div id="contacto" className="scroll-mt-24">
                    <TextReveal
                      text="Contacto"
                      className="text-2xl md:text-3xl font-bold mb-4 text-green-500"
                      delay={0.1}
                    />
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Se tiver dúvidas ou preocupações sobre esta Política de
                        Privacidade ou sobre o tratamento dos seus dados
                        pessoais, entre em contacto connosco através de:
                      </p>
                      <div className="bg-secondary p-4 rounded-lg">
                        <p>
                          <strong>Email</strong>: info@mundosaudavel.ao
                        </p>
                        <p>
                          <strong>Telefone</strong>: + 244 930 678 230
                        </p>
                        <p>
                          <strong>Endereço</strong>: Trav. Rei Katyavala nº3,
                          Luanda-Angola
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resumo">
                  <Spotlight className="rounded-xl">
                    <Card className="border-none bg-accent/50 backdrop-blur-card">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                          <Eye className="h-6 w-6 text-primary mr-2" />
                          <h3 className="text-xl font-bold">
                            Resumo Simplificado
                          </h3>
                        </div>

                        <div className="space-y-6">
                          <AccordionItem
                            title="Que dados recolhemos?"
                            defaultOpen={true}
                          >
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Dados de identificação (nome, email, telefone)
                                  quando você os fornece voluntariamente
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Dados de utilização do website (páginas
                                  visitadas, tempo de permanência, cliques)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Informações técnicas (tipo de dispositivo,
                                  sistema operativo, navegador, endereço IP)
                                </span>
                              </li>
                            </ul>
                          </AccordionItem>

                          <AccordionItem title="Como utilizamos os seus dados?">
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Para fornecer e melhorar os nossos serviços
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Para responder às suas consultas e fornecer
                                  suporte
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Para enviar informações sobre produtos e
                                  serviços (apenas com o seu consentimento)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>Para cumprir obrigações legais</span>
                              </li>
                            </ul>
                          </AccordionItem>

                          <AccordionItem title="Quais são os seus direitos?">
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>Aceder aos seus dados pessoais</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>Corrigir dados imprecisos</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Solicitar a eliminação dos seus dados
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Opor-se ao tratamento para marketing direto
                                </span>
                              </li>
                            </ul>
                          </AccordionItem>

                          <AccordionItem title="Como protegemos os seus dados?">
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Utilizamos encriptação para dados sensíveis
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Implementamos firewalls e sistemas de proteção
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Restringimos o acesso às informações pessoais
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>
                                  Monitorizamos regularmente os nossos sistemas
                                </span>
                              </li>
                            </ul>
                          </AccordionItem>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-4">
                            Este é um resumo simplificado da nossa Política de
                            Privacidade. Para informações completas e
                            detalhadas, consulte a versão completa.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Spotlight>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container ">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-500">
              Ainda tem dúvidas?
            </h2>
            <p className="text-muted-foreground mb-8">
              Se tiver alguma questão sobre a nossa Política de Privacidade ou
              sobre como tratamos os seus dados, não hesite em contactar-nos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-green-500 hover:bg-green-500/60">
                <Link href="/contacto">Contacte-nos</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/termos-de-uso">Ver Termos de Uso</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}