import { Phone, Mail, MapPin, Clock} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../contact-form";

const contactInfo = [
  {
    icon: Phone,
    title: "Números de Telefone",
    details: [
      { label: "Escritório Principal", value: "+ 244 930 678 230" },
      { label: "Linha de Emergência", value: "+ 244 930 678 230" },
      { label: "Suporte Técnico", value: "+ 244 930 678 230" },
    ],
  },
  {
    icon: Mail,
    title: "Endereços de Email",
    details: [
      { label: "Informações Gerais", value: "info@agritech-solutions.com" },
      { label: "Vendas", value: "sales@agritech-solutions.com" },
      { label: "Suporte", value: "support@agritech-solutions.com" },
    ],
  },
  {
    icon: MapPin,
    title: "Localizações",
    details: [
      {
        label: "Sede",
        value: "123 Avenida Agricultura, Cidade Fazenda, FC 12345",
      },
      {
        label: "Escritório Regional",
        value: "456 Estrada Rural, Vila Interior, CT 67890",
      },
      {
        label: "Centro de Pesquisa",
        value: "789 Rua Inovação, Vale da Tecnologia, TV 54321",
      },
    ],
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    details: [
      { label: "Segunda a Sexta", value: "8:00 - 18:00" },
      { label: "Sábado", value: "9:00 - 16:00" },
      { label: "Domingo", value: "Somente emergências" },
    ],
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Informações de Contato */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {info.details.map((detail, detailIndex) => (
                        <div key={detailIndex}>
                          <div className="text-sm font-medium text-gray-900">
                            {detail.label}
                          </div>
                          <div className="text-sm text-gray-600">
                            {detail.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Formulário de Contato */}
        <ContactForm/>
        </div>

        {/* Mapa Interativo */}
        <div className="bg-gray-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Encontre Nossas Localizações
          </h3>
          <div className="h-96 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126153.01125382574!2d13.201701716957306!3d-8.853353711636958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850c1c5c5ecc5a92!2sLuanda!5e0!3m2!1spt-PT!2sao!4v1752499436109!5m2!1spt-PT!2sao"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}