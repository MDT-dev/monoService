"use client"

import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.about")}</h3>
            <p className="text-sm opacity-80">{t("footer.aboutText")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">{t("footer.address")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-80">{t("footer.phone")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-80">{t("footer.email")}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.followUs")}</h3>
            <div className="flex space-x-4">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/20 pt-8 text-center text-sm opacity-70">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
