import { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, ChevronRight } from "lucide-react"
import { brand } from "@/config"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Belangrijke informatie over trading risico's en affiliate relaties van ${brand.name}. Lees dit voordat je begint met traden.`,
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: `Disclaimer | ${brand.name}`,
    description: `Belangrijke informatie over risico's en affiliate relaties van ${brand.name}.`,
    url: `${brand.url}/disclaimer`,
  },
}

export default function DisclaimerPage() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-52 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background" />

        <div className="container-wide relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Disclaimer</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Disclaimer</h1>
              <p className="text-muted-foreground">Laatst bijgewerkt: januari {currentYear}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-4xl prose prose-invert">
            {/* Important Warning Box */}
            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 m-0 mb-2">Risicowaarschuwing</h3>
                  <p className="text-muted-foreground m-0">
                    Trading in financiële instrumenten, inclusief forex, futures en andere derivaten,
                    brengt aanzienlijke risico&apos;s met zich mee. U kunt meer verliezen dan uw initiële
                    inleg. Handel alleen met geld dat u zich kunt veroorloven om te verliezen.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Geen Financieel Advies</h2>
            <p className="text-muted-foreground">
              De informatie op {brand.domain} is uitsluitend bedoeld voor educatieve en informatieve
              doeleinden. Niets op deze website mag worden beschouwd als financieel, beleggings-,
              juridisch of belastingadvies. Wij zijn geen geregistreerde financieel adviseurs.
            </p>
            <p className="text-muted-foreground">
              Voordat u beslissingen neemt over trading of het kiezen van een financier,
              raden wij u aan om onafhankelijk professioneel advies in te winnen.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Affiliate Relaties</h2>
            <p className="text-muted-foreground">
              {brand.name} onderhoudt affiliate relaties met aanbieders van funded trading.
              Dit betekent dat wij een commissie kunnen ontvangen wanneer u via onze links een
              product of dienst afneemt.
            </p>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 my-4">
              <p className="text-muted-foreground m-0">
                <strong className="text-secondary">Belangrijke opmerking:</strong> Onze affiliate
                relaties beïnvloeden onze reviews en vergelijkingen niet. Wij streven ernaar
                objectieve, eerlijke en transparante informatie te verstrekken.
              </p>
            </div>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Nauwkeurigheid van Informatie</h2>
            <p className="text-muted-foreground">
              Hoewel wij ons best doen om accurate en up-to-date informatie te verstrekken, kunnen
              wij niet garanderen dat alle informatie op deze website volledig, nauwkeurig of actueel is.
            </p>
            <p className="text-muted-foreground">
              Prijzen, voorwaarden en regels van financiers kunnen zonder voorafgaande
              kennisgeving wijzigen. Controleer altijd de officiële website van de betreffende
              aanbieder voor de meest actuele informatie.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Risico&apos;s van Funded Trading</h2>
            <p className="text-muted-foreground">
              Funded trading brengt specifieke risico&apos;s met zich mee:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong className="text-white">Challenge kosten:</strong> U betaalt een fee om deel te nemen aan een challenge. Deze fee is niet gegarandeerd terug te krijgen.</li>
              <li><strong className="text-white">Falen van challenge:</strong> De meeste traders slagen niet in hun eerste challenge. Statistisch gezien faalt 80-90% van de deelnemers.</li>
              <li><strong className="text-white">Regelwijzigingen:</strong> Financiers kunnen hun regels en voorwaarden wijzigen.</li>
              <li><strong className="text-white">Bedrijfsrisico:</strong> Aanbieders kunnen failliet gaan of hun diensten stopzetten.</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Statistieken en Cijfers</h2>
            <p className="text-muted-foreground">
              Bepaalde statistieken op deze website, zoals het aantal traders per stad of
              slagingspercentages, zijn schattingen gebaseerd op beschikbare bronnen en marktanalyse.
              Deze cijfers zijn indicatief en kunnen afwijken van de werkelijkheid.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Externe Links</h2>
            <p className="text-muted-foreground">
              Onze website bevat links naar externe websites. Wij zijn niet verantwoordelijk voor
              de inhoud, privacy praktijken of beschikbaarheid van deze websites. Het volgen van
              externe links is op eigen risico.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">7. Aansprakelijkheid</h2>
            <p className="text-muted-foreground">
              {brand.name}, haar eigenaren, medewerkers en partners zijn niet aansprakelijk voor:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Verlies of schade als gevolg van het gebruik van informatie op deze website</li>
              <li>Verlies van challenge fees of trading kapitaal</li>
              <li>Beslissingen genomen op basis van onze content</li>
              <li>Technische storingen of onbeschikbaarheid van de website</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">8. Intellectueel Eigendom</h2>
            <p className="text-muted-foreground">
              Alle content op deze website, inclusief teksten, afbeeldingen en logo&apos;s, is eigendom
              van {brand.name} tenzij anders aangegeven. Reproductie zonder toestemming is niet
              toegestaan.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">9. Wijzigingen</h2>
            <p className="text-muted-foreground">
              Wij behouden ons het recht voor om deze disclaimer te wijzigen. De meest recente
              versie is altijd beschikbaar op deze pagina.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">10. Contact</h2>
            <p className="text-muted-foreground">
              Heeft u vragen over deze disclaimer? Neem contact met ons op via{" "}
              <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
                {brand.email}
              </a>.
            </p>

            {/* Bottom Warning */}
            <div className="p-6 rounded-xl bg-accent/10 border border-accent/30 mt-8">
              <p className="text-muted-foreground m-0 text-sm">
                <strong className="text-accent">Samenvattend:</strong> Doe uw eigen onderzoek
                voordat u beslissingen neemt. Trading is risicovol en niet geschikt voor iedereen.
                De informatie op deze website is geen vervanging voor professioneel advies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
