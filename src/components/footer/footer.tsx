import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { IoLogoTiktok, IoLogoWhatsapp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../../public/assets/logo3.png";

const footerLinks = {
  services: [
    { name: "Agricultura Inteligente", href: "/servicos/agricultura" },
    { name: "Apicultura Profissional", href: "/servicos/apicultura" },
    { name: "Sistemas Avícolas Modernos", href: "avicultura" },
    { name: "Excelência Pecuária", href: "/servicos/pecuaria" },
    { name: "Aquicultura Sustentável", href: "/servicos/aquicultura" },
  ],
  company: [
    { name: "Sobre Nós", href: "/sobre-nos" },
    { name: "Carreiras", href: "#" },
    { name: "Notícias & Atualizações", href: "/noticias" },
    { name: "Parceiro", href: "mailto:info@mundosaudavel.ao" },
    { name: "Investidor", href: "mailto:info@mundosaudavel.ao" },
  ],
  support: [
    { name: "Fale Connosco", href: "/contacto" },
    { name: "Suporte Técnico", href: "/contacto" },
    { name: "Programas de Formação", href: "mailto:info@mundosaudavel.ao" },
    { name: "Perguntas Frequentes", href: "/contacto" },
  ],
  legal: [
    { name: "Política de Privacidade", href: "/politicas-de-privacidade" },
    { name: "Termos de Uso", href: "/termos-de-uso" },
  ],
};

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/16XmfBPMZ6/",
    label: "Facebook",
    color: "hover:text-green-600",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/mundosaudavel736?utm_source=qr&igsh=MW03ejU5ZHQyemoycg==",
    label: "Instagram",
    color: "hover:text-pink-600",
  },
  {
    icon: IoLogoTiktok,
    href: "https://www.tiktok.com/@mundosaudavel736",
    label: "TikTok",
    color: "hover:text-red-900",
  },
  {
    icon: IoLogoWhatsapp,
    href: "https://wa.me/message/7TM6YWLSY4ZYE1",
    label: "WhatsApp",
    color: "hover:text-green-600",
  },
];

const certifications = [
  "ISO 9001:2015",
  "Certificação USDA",
  "Aprovado pela EPA",
  "Classificação A+ BBB",
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" style={{ zoom: "0.90" }}>
      <div className="containerOriginal mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <Image src={Logo} alt="Mundo Saudável" className="w-36"></Image>
              <div>
                <div className="text-xs text-green-400 font-medium">
                  CULTIVANDO O FUTURO
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Impulsionamos a construção civil com materiais elétricos inovadores, seguros e eficientes para obras modernas e sustentáveis.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-300 hover:text-green-400 transition-colors">
                <Phone className="h-5 w-5 mr-4 text-green-400 flex-shrink-0" />
                <a href="tel:+244923456677" className="hover:underline">
                 +244 942 093 530
                </a>
              </div>
              <div className="flex items-center text-gray-300 hover:text-green-400 transition-colors">
                <Mail className="h-5 w-5 mr-4 text-green-400 flex-shrink-0" />
                <a
                  href="mailto:info@agritech-solutions.com"
                  className="hover:underline"
                >
                  info@milones.ao
                </a>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 mr-4 text-green-400 flex-shrink-0 mt-1" />
                <span>
                  Milones Serviço, Lda
                  <br />
                  Luanda, Angola CF 12345
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-3">
                CERTIFICAÇÕES
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-400 bg-gray-800 px-3 py-2 rounded-lg"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {[
            { title: "Serviços", links: footerLinks.services },
            { title: "Empresa", links: footerLinks.company },
            { title: "Suporte", links: footerLinks.support },
            { title: "Legal", links: footerLinks.legal },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-8 text-green-400">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              {section.title === "Legal" && (
                <div className="bg-gray-800 rounded-xl p-6 mt-8">
                  <h4 className="text-sm font-semibold text-green-400 mb-3">
                    FIQUE ATUALIZADO
                  </h4>
                  <p className="text-xs text-gray-400 mb-4">
                    Receba insights agrícolas diretamente no seu e-mail
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Seu e-mail"
                      className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Button className="bg-green-600 hover:bg-green-700 rounded-l-none px-3">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    target="_blank"
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`text-gray-400 ${social.color} transition-colors duration-200 transform hover:scale-110`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-300 text-sm mb-1">
                &copy; {new Date().getFullYear()} Mundo Saudável. Todos os
                direitos reservados.
              </p>
              <p className="text-gray-500 text-xs">
                Desenvolvido por • QNB • Qualidade • iNovação • Bem-estar
              </p>
              <p className="text-gray-500 text-xs">
                Inovação que cultiva • Sustentabilidade que cresce • Sucesso que
                colhe
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}