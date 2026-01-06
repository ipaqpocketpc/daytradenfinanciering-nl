import {
  Wallet,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Calendar,
  CreditCard,
  Building2,
  Percent,
  ShieldCheck,
  FileText,
  Zap,
  HelpCircle,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export function UitbetalingenContent() {
  return (
    <article className="relative py-16">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <section className="prose prose-invert prose-lg max-w-none mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              De belangrijkste vraag van elke funded trader: <strong className="text-white">&quot;Wanneer krijg ik mijn geld?&quot;</strong>
              In deze complete gids leggen we alles uit over uitbetalingen bij prop firms.
              Van profit splits en payout schema&apos;s tot belastingen en betaalmethodes.
              Geen verrassingen meer - alleen duidelijkheid over je verdiensten.
            </p>
          </section>

          {/* Quick Overview */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: "80-90%", label: "Profit Split", icon: Percent },
              { value: "14 dagen", label: "Eerste Payout", icon: Calendar },
              { value: "On-demand", label: "Daarna", icon: RefreshCw },
              { value: "1-3 dagen", label: "Verwerkingstijd", icon: Clock },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-card/50 border border-border rounded-xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </section>

          {/* Profit Split Explained */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Percent className="w-6 h-6 text-primary" />
              </div>
              Profit Split: Hoeveel Houd Je Over?
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                De profit split bepaalt welk percentage van je winst voor jou is. Bij de meeste prop firms
                ligt dit tussen de <strong>70% en 90%</strong>. De rest gaat naar de prop firm als
                vergoeding voor het beschikbaar stellen van het kapitaal.
              </p>

              <div className="not-prose bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 rounded-2xl p-8 my-8">
                <h3 className="text-xl font-semibold text-white mb-6">FTMO Profit Split Structuur</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-background/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">80%</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Standaard Split</h4>
                        <p className="text-sm text-muted-foreground">Direct na funded worden</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Als startende funded trader ontvang je 80% van alle winst die je maakt.
                      Bij €1.000 winst is €800 voor jou.
                    </p>
                  </div>

                  <div className="bg-background/50 rounded-xl p-6 border-2 border-secondary/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-secondary">90%</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Scaling Plan Split</h4>
                        <p className="text-sm text-muted-foreground">Na eerste scale-up</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Na je eerste succesvolle scaling (10% winst in 4 maanden) stijgt je split naar 90%.
                      Bij €1.000 winst is €900 voor jou.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Rekenvoorbeeld: Wat Kun Je Verdienen?</h3>

              <div className="not-prose overflow-x-auto my-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Account Size</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Maandwinst (3%)</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Jouw Deel (80%)</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Jouw Deel (90%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { account: "€10.000", profit: "€300", split80: "€240", split90: "€270" },
                      { account: "€25.000", profit: "€750", split80: "€600", split90: "€675" },
                      { account: "€50.000", profit: "€1.500", split80: "€1.200", split90: "€1.350" },
                      { account: "€100.000", profit: "€3.000", split80: "€2.400", split90: "€2.700" },
                      { account: "€200.000", profit: "€6.000", split80: "€4.800", split90: "€5.400" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-card/50">
                        <td className="py-4 px-4 font-medium text-white">{row.account}</td>
                        <td className="py-4 px-4 text-muted-foreground">{row.profit}</td>
                        <td className="py-4 px-4 text-primary">{row.split80}</td>
                        <td className="py-4 px-4 text-secondary font-medium">{row.split90}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Payout Schedule */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              Uitbetalingsschema: Wanneer Krijg Je Betaald?
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Prop firms hebben specifieke regels over wanneer je je winst kunt opnemen.
                Dit beschermt zowel jou als de prop firm tegen te snelle beslissingen.
              </p>

              <div className="not-prose my-8">
                <div className="bg-card/50 border border-border rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      FTMO Uitbetalingsregels
                    </h3>
                  </div>

                  <div className="divide-y divide-border">
                    <div className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Eerste Payout: Na 14 Dagen</h4>
                        <p className="text-muted-foreground text-sm">
                          Je eerste uitbetaling kan worden aangevraagd na minimaal 14 kalenderdagen
                          als funded trader. Dit geeft tijd om je consistentie te bewijzen.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="font-bold text-secondary">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Daarna: On-Demand</h4>
                        <p className="text-muted-foreground text-sm">
                          Na je eerste payout kun je op elk moment een nieuwe uitbetaling aanvragen.
                          Er is geen minimum wachttijd meer tussen payouts.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="font-bold text-accent">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Verwerkingstijd: 1-3 Werkdagen</h4>
                        <p className="text-muted-foreground text-sm">
                          Na het aanvragen van een payout duurt het gemiddeld 1-3 werkdagen
                          voordat het geld op je rekening staat, afhankelijk van de betaalmethode.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="not-prose bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 my-8">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Let Op: Minimum Opname Bedrag
                </h4>
                <p className="text-muted-foreground">
                  De meeste prop firms hebben een minimum opnamebedrag, vaak rond de €50-€100.
                  Controleer altijd de specifieke voorwaarden van jouw prop firm.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              Betaalmethodes
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Prop firms bieden verschillende manieren om je winst te ontvangen.
                De beschikbare opties kunnen per regio verschillen.
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                {[
                  {
                    method: "Bankoverschrijving",
                    description: "Directe overschrijving naar je Nederlandse bankrekening",
                    time: "1-3 werkdagen",
                    fee: "Geen of minimale kosten",
                    icon: Building2,
                    recommended: true,
                  },
                  {
                    method: "Skrill / Neteller",
                    description: "E-wallet diensten met snelle verwerking",
                    time: "Binnen 24 uur",
                    fee: "Variabele kosten",
                    icon: Wallet,
                    recommended: false,
                  },
                  {
                    method: "Crypto (Bitcoin, USDT)",
                    description: "Betaling in cryptocurrency",
                    time: "Binnen 24 uur",
                    fee: "Netwerkkosten",
                    icon: DollarSign,
                    recommended: false,
                  },
                  {
                    method: "Wise (TransferWise)",
                    description: "Internationale overschrijving met goede wisselkoers",
                    time: "1-2 werkdagen",
                    fee: "Lage kosten",
                    icon: RefreshCw,
                    recommended: false,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`bg-card/50 border rounded-xl p-6 ${
                      item.recommended ? "border-secondary/50" : "border-border"
                    }`}
                  >
                    {item.recommended && (
                      <div className="text-xs font-medium text-secondary mb-3">
                        Aanbevolen voor NL
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <item.icon className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-2">{item.method}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-background/50 px-2 py-1 rounded text-muted-foreground">
                            {item.time}
                          </span>
                          <span className="bg-background/50 px-2 py-1 rounded text-muted-foreground">
                            {item.fee}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tax Considerations */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              Belastingen in Nederland
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Een veel gestelde vraag: hoe zit het met belastingen over prop trading inkomsten?
                Dit is een belangrijk onderwerp waar je <strong>tijdig advies over moet inwinnen</strong>.
              </p>

              <div className="not-prose bg-card/50 border border-border rounded-2xl p-8 my-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Disclaimer</h3>
                    <p className="text-muted-foreground">
                      Dit is geen fiscaal advies. Raadpleeg altijd een belastingadviseur voor je
                      persoonlijke situatie. De regels kunnen veranderen en zijn afhankelijk van
                      je specifieke omstandigheden.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Mogelijke Scenario&apos;s</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                        <span><strong className="text-white">Hobbymatig:</strong> Mogelijk belast in Box 3 als vermogen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                        <span><strong className="text-white">Zakelijk (ZZP/VOF):</strong> Belast als winst uit onderneming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                        <span><strong className="text-white">BV structuur:</strong> Vennootschapsbelasting, vaak voordelig bij hogere inkomsten</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-secondary" />
                      Tip: Houd Administratie Bij
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Houd vanaf dag één een goede administratie bij van al je trades, payouts en kosten.
                      Dit maakt belastingaangifte veel eenvoudiger en voorkomt problemen achteraf.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              Veelgestelde Vragen over Uitbetalingen
            </h2>

            <div className="space-y-4">
              {[
                {
                  question: "Kan ik al mijn winst opnemen?",
                  answer: "Ja, je kunt je volledige winst opnemen. Echter, als je wilt profiteren van het scaling plan, is het slim om een deel in je account te laten voor groei. Veel traders kiezen voor een 50/50 verdeling.",
                },
                {
                  question: "Wat gebeurt er als ik in drawdown zit?",
                  answer: "Je kunt geen payout aanvragen als je account in verlies staat (onder je startbalans). Je moet eerst terug naar winst voordat je kunt opnemen.",
                },
                {
                  question: "Is er een maximum dat ik kan opnemen?",
                  answer: "Je kunt maximaal je beschikbare winst opnemen. Er is geen hard maximum, maar grote bedragen kunnen extra verificatie vereisen.",
                },
                {
                  question: "Moet ik KYC verificatie doen voor payouts?",
                  answer: "Ja, de meeste prop firms vereisen KYC (Know Your Customer) verificatie voordat je je eerste payout ontvangt. Dit omvat meestal ID-verificatie en adresbewijs.",
                },
                {
                  question: "Wat als mijn payout wordt vertraagd?",
                  answer: "Vertragingen kunnen voorkomen bij bankfeestdagen, extra verificatie, of technische problemen. Neem contact op met support als het langer dan 5 werkdagen duurt.",
                },
                {
                  question: "Kan ik de profit split onderhandelen?",
                  answer: "Nee, de profit split is vast en geldt voor alle traders. De enige manier om een hogere split te krijgen is via het scaling plan (80% → 90%).",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-card/50 border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-3 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <p className="text-muted-foreground pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payout Checklist */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-secondary" />
              </div>
              Payout Checklist
            </h2>

            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-2xl p-8">
              <p className="text-muted-foreground mb-6">
                Voordat je een payout aanvraagt, check deze punten:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Je account staat in winst (boven startbalans)",
                  "Je hebt minimaal 14 dagen getraded (eerste payout)",
                  "Je KYC verificatie is voltooid",
                  "Je hebt je betaalmethode ingesteld",
                  "Je hebt geen open posities die je in verlies kunnen brengen",
                  "Je hebt de minimum opname bereikt",
                  "Je hebt besloten hoeveel je wilt laten staan voor scaling",
                  "Je hebt de payout deadline genoteerd",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 border-2 border-secondary/50 rounded flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-secondary opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Conclusie</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Het uitbetalingssysteem van prop firms is ontworpen om betrouwbaar en transparant te zijn.
                Met een profit split van 80-90%, on-demand payouts na de eerste 14 dagen, en meerdere
                betaalmethodes, heb je flexibiliteit in hoe en wanneer je je winst ontvangt.
              </p>
              <p>
                De belangrijkste tip: <strong>wees strategisch met je payouts</strong>. Neem niet alles op,
                maar laat genoeg staan om te profiteren van het scaling plan. Een balans tussen
                directe inkomsten en lange termijn groei levert het beste resultaat.
              </p>
              <p>
                En vergeet niet: raadpleeg een belastingadviseur over hoe je je trading inkomsten
                het beste kunt structureren. Goede planning nu voorkomt problemen later.
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="border-t border-border pt-12">
            <h3 className="text-xl font-semibold text-white mb-6">Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Kapitaal Opschalen", href: "/categorie/kapitaal-opschalen", description: "Groei je account via scaling" },
                { title: "Kosten Overzicht", href: "/kosten", description: "Wat kost een prop firm challenge?" },
                { title: "FTMO Regels", href: "/categorie/ftmo-regels", description: "Alle regels uitgelegd" },
                { title: "Nu Beginnen", href: "/beginnen", description: "Start je funded trader journey" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group bg-card/50 border border-border hover:border-primary/50 rounded-xl p-4 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white group-hover:text-primary transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
