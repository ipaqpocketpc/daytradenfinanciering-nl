import { Metadata } from "next"
import Link from "next/link"
import { Shield, ChevronRight } from "lucide-react"
import { brand } from "@/config"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Lees hoe ${brand.name} omgaat met je persoonlijke gegevens en privacy. Informatie over cookies, analytics en gegevensbescherming.`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy Policy | ${brand.name}`,
    description: `Lees hoe ${brand.name} omgaat met je persoonlijke gegevens en privacy.`,
    url: `${brand.url}/privacy`,
  },
}

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-52 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="container-wide relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Privacy Policy</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
              <p className="text-muted-foreground">Laatst bijgewerkt: januari {currentYear}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-4xl prose prose-invert">
            <div className="p-6 rounded-xl bg-card border border-border mb-8">
              <p className="text-muted-foreground m-0">
                {brand.name} (&quot;wij&quot;, &quot;ons&quot;, &quot;onze&quot;) respecteert uw privacy en is toegewijd aan het
                beschermen van uw persoonlijke gegevens. Dit privacybeleid legt uit hoe we omgaan
                met informatie die we verzamelen wanneer u onze website bezoekt.
              </p>
            </div>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Welke gegevens verzamelen wij?</h2>
            <p className="text-muted-foreground">
              Wij verzamelen de volgende categorieën gegevens:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong className="text-white">Automatisch verzamelde gegevens:</strong> IP-adres, browsertype, apparaatinformatie, en pagina&apos;s die u bezoekt.</li>
              <li><strong className="text-white">Cookies:</strong> We gebruiken cookies om uw voorkeuren te onthouden en onze website te verbeteren.</li>
              <li><strong className="text-white">Contactgegevens:</strong> Als u contact met ons opneemt, verzamelen we uw e-mailadres en de inhoud van uw bericht.</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Hoe gebruiken wij uw gegevens?</h2>
            <p className="text-muted-foreground">
              We gebruiken uw gegevens voor de volgende doeleinden:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Het verbeteren van onze website en diensten</li>
              <li>Het analyseren van websiteverkeer via Google Analytics</li>
              <li>Het reageren op vragen of verzoeken</li>
              <li>Het voldoen aan wettelijke verplichtingen</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Affiliate Links</h2>
            <p className="text-muted-foreground">
              Onze website bevat affiliate links naar aanbieders van trading kapitaal. Wanneer u op deze links
              klikt en een aankoop doet, ontvangen wij mogelijk een commissie. Dit beïnvloedt onze
              reviews en vergelijkingen niet. Wij streven ernaar objectieve en eerlijke informatie
              te verstrekken.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Cookies</h2>
            <p className="text-muted-foreground">
              We gebruiken cookies om:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Uw voorkeuren te onthouden</li>
              <li>Websiteverkeer te analyseren</li>
              <li>Affiliate tracking mogelijk te maken</li>
            </ul>
            <p className="text-muted-foreground">
              U kunt cookies uitschakelen in uw browserinstellingen, maar dit kan de functionaliteit
              van onze website beperken.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Gegevens delen</h2>
            <p className="text-muted-foreground">
              Wij verkopen uw persoonlijke gegevens niet aan derden. We kunnen gegevens delen met:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong className="text-white">Analytische diensten:</strong> Google Analytics voor het analyseren van websiteverkeer</li>
              <li><strong className="text-white">Hostingproviders:</strong> Vercel voor het hosten van onze website</li>
              <li><strong className="text-white">Wettelijke vereisten:</strong> Wanneer dit wettelijk verplicht is</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Uw rechten</h2>
            <p className="text-muted-foreground">
              Onder de AVG/GDPR heeft u de volgende rechten:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Recht op inzage in uw gegevens</li>
              <li>Recht op rectificatie van onjuiste gegevens</li>
              <li>Recht op verwijdering van uw gegevens</li>
              <li>Recht op beperking van verwerking</li>
              <li>Recht op gegevensoverdraagbaarheid</li>
              <li>Recht om bezwaar te maken tegen verwerking</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">7. Beveiliging</h2>
            <p className="text-muted-foreground">
              We nemen passende technische en organisatorische maatregelen om uw gegevens te
              beschermen tegen ongeoorloofde toegang, verlies of misbruik.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">8. Contact</h2>
            <p className="text-muted-foreground">
              Als u vragen heeft over dit privacybeleid of uw rechten wilt uitoefenen, neem dan
              contact met ons op via{" "}
              <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
                {brand.email}
              </a>.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">9. Wijzigingen</h2>
            <p className="text-muted-foreground">
              Wij behouden ons het recht voor om dit privacybeleid te wijzigen. De meest recente
              versie is altijd beschikbaar op deze pagina.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
