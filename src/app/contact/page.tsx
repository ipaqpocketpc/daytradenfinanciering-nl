import { Metadata } from "next"
import Script from "next/script"
import { Mail, MessageSquare, Clock, HelpCircle } from "lucide-react"
import { HeroSection } from "@/components/sections/HeroSection"

export const metadata: Metadata = {
  title: "Contact | Funded Trading Nederland",
  description: "Neem contact op met Funded Trading Nederland. Vragen over prop firms, onze vergelijkingen of suggesties? We helpen je graag verder.",
}

const contactMethods = [
  {
    icon: Mail,
    title: "E-mail",
    description: "Voor algemene vragen en suggesties",
    contact: "info@fundedtrading.nl",
    href: "mailto:info@fundedtrading.nl",
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "Mis je een prop firm of klopt er iets niet?",
    contact: "Laat het ons weten",
    href: "mailto:info@fundedtrading.nl?subject=Feedback",
  },
]

const faqs = [
  {
    question: "Zijn jullie een prop firm?",
    answer: "Nee, wij zijn een onafhankelijke vergelijkingssite. We verkopen geen challenges en beheren geen trading accounts. We helpen je de beste prop firm te kiezen.",
  },
  {
    question: "Hoe verdienen jullie geld?",
    answer: "We ontvangen een commissie wanneer je via onze links een challenge koopt bij een prop firm. Dit kost jou niets extra en beïnvloedt onze reviews niet.",
  },
  {
    question: "Kan ik een prop firm laten toevoegen?",
    answer: "Ja! Stuur ons een e-mail met informatie over de prop firm en we bekijken of we deze kunnen toevoegen aan onze vergelijking.",
  },
  {
    question: "Ik heb een klacht over een prop firm, kunnen jullie helpen?",
    answer: "Wij zijn niet verbonden aan de prop firms zelf. Voor klachten moet je direct contact opnemen met de betreffende prop firm. We kunnen wel je ervaring meenemen in onze reviews.",
  },
]

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Contact"
        highlightedWord="Contact"
        subtitle="Vragen, suggesties of feedback? We horen graag van je."
        badge="We reageren binnen 24 uur"
      />

      {/* Contact Methods */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Neem Contact Op
              </h2>
              <p className="text-muted-foreground">
                We staan klaar om je te helpen met vragen over prop trading firms en onze vergelijkingen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {method.description}
                  </p>
                  <span className="text-primary font-medium">
                    {method.contact}
                  </span>
                </a>
              ))}
            </div>

            {/* Response Time */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 border border-border mb-16">
              <Clock className="w-5 h-5 text-secondary" />
              <p className="text-muted-foreground">
                Gemiddelde reactietijd: <span className="text-white font-medium">binnen 24 uur</span>
              </p>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-white">
                  Veelgestelde Vragen
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-card/30 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-white">Let op:</strong> Funded Trading Nederland geeft geen financieel advies.
              Voor specifieke vragen over challenges, payouts of account problemen dien je direct contact op te nemen
              met de betreffende prop trading firm.
            </p>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Funded Trading Nederland",
            "description": "Neem contact op met Funded Trading Nederland voor vragen over prop firms en onze vergelijkingen.",
            "url": "https://fundedtrading.nl/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Funded Trading Nederland",
              "url": "https://fundedtrading.nl",
              "email": "info@fundedtrading.nl",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@fundedtrading.nl",
                "availableLanguage": "Dutch",
              },
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  )
}
