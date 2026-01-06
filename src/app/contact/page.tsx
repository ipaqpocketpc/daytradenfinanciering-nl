import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Mail,
  MessageSquare,
  Clock,
  HelpCircle,
  BookOpen,
  ArrowRight,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "Contact | Daytraden Financiering",
  description:
    "Neem contact op met Daytraden Financiering. Vragen over trading kapitaal, funded trading of suggesties? We helpen je graag verder.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Daytraden Financiering",
    description:
      "Neem contact op met vragen over trading kapitaal en funded trading.",
    url: `${brand.url}/contact`,
  },
}

const contactMethods = [
  {
    icon: Mail,
    title: "E-mail",
    description: "Voor algemene vragen over trading financiering",
    contact: brand.email,
    href: `mailto:${brand.email}`,
    cta: "Stuur een mail",
  },
  {
    icon: MessageSquare,
    title: "Suggesties",
    description: "Tips voor nieuwe content of onderwerpen",
    contact: "We horen graag je ideeën",
    href: `mailto:${brand.email}?subject=Suggestie`,
    cta: "Deel je idee",
  },
]

const faqs = [
  {
    question: "Verkopen jullie trading challenges?",
    answer:
      "Nee, wij verkopen zelf geen challenges. We bieden informatie over hoe funded trading werkt. Als je klaar bent om te beginnen, verwijzen we je door naar een betrouwbare financier.",
  },
  {
    question: "Geven jullie persoonlijk trading advies?",
    answer:
      "Nee, we geven geen persoonlijk financieel of trading advies. Onze content is puur informatief. Voor specifieke trading vragen kun je het beste een gekwalificeerde professional raadplegen.",
  },
  {
    question: "Ik heb een probleem met mijn challenge, kunnen jullie helpen?",
    answer:
      "Voor problemen met een lopende challenge moet je direct contact opnemen met je financier. Wij zijn niet verbonden aan specifieke aanbieders en kunnen niet ingrijpen in hun processen.",
  },
  {
    question: "Hoe kan ik jullie content delen?",
    answer:
      "Je mag onze artikelen delen via sociale media of een link plaatsen. We waarderen het als je de bron vermeldt. Neem contact op als je onze content wilt gebruiken voor andere doeleinden.",
  },
]

const quickLinks = [
  {
    title: "Hoe Werkt Het?",
    description: "Uitleg over funded trading",
    href: "/hoe-werkt-het",
  },
  {
    title: "Veelgestelde Vragen",
    description: "Antwoorden op veel voorkomende vragen",
    href: "/veelgestelde-vragen",
  },
  {
    title: "Begrippen",
    description: "Trading termen uitgelegd",
    href: "/begrippen",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              Contact
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Neem <span className="gradient-text">Contact</span> Op
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Vragen over trading kapitaal of funded trading? We helpen je
              graag verder.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {method.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-3">
                    {method.description}
                  </p>
                  <span className="text-primary font-medium group-hover:underline">
                    {method.cta} →
                  </span>
                </a>
              ))}
            </div>

            {/* Response Time */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
              <Clock className="w-5 h-5 text-secondary" />
              <p className="text-muted-foreground">
                Gemiddelde reactietijd:{" "}
                <span className="text-white font-medium">binnen 48 uur</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-card/30 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-white">
                Misschien Vind Je Het Antwoord Hier
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">
                Voor Je Contact Opneemt
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
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-card/30 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-white">Let op:</strong> Daytraden
              Financiering geeft geen financieel advies. Voor specifieke vragen
              over challenges, uitbetalingen of account problemen dien je direct
              contact op te nemen met je financier.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />

        <div className="relative container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Klaar om te Starten?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Je hoeft niet te wachten. Begin vandaag nog met trading kapitaal.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow"
          >
            <Link href="/go/kapitaal" className="flex items-center gap-2">
              Bekijk Trading Kapitaal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
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
            name: "Contact Daytraden Financiering",
            description:
              "Neem contact op met Daytraden Financiering voor vragen over trading kapitaal en funded trading.",
            url: `${brand.url}/contact`,
            mainEntity: {
              "@type": "Organization",
              name: "Daytraden Financiering",
              url: brand.url,
              email: brand.email,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: brand.email,
                availableLanguage: "Dutch",
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
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  )
}
