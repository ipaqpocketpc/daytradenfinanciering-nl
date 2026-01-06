import {
  CheckCircle,
  AlertTriangle,
  Target,
  TrendingUp,
  Shield,
  Clock,
  Brain,
  BarChart3,
  Zap,
  XCircle,
  ArrowRight,
  Percent,
  Calendar,
  LineChart,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"

export function ChallengeTipsContent() {
  return (
    <article className="relative py-16">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <section className="prose prose-invert prose-lg max-w-none mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Een prop firm challenge halen is de eerste stap naar trading kapitaal zonder eigen geld.
              Toch faalt <strong className="text-white">80-90% van alle traders</strong> bij hun eerste poging.
              Het goede nieuws? Met de juiste voorbereiding en strategie kun je bij die succesvolle 10-20% horen.
              In deze complete gids delen we bewezen tips die het verschil maken tussen slagen en falen.
            </p>
          </section>

          {/* Key Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: "10%", label: "Fase 1 Target", icon: Target },
              { value: "5%", label: "Fase 2 Target", icon: TrendingUp },
              { value: "5%", label: "Max Daily Loss", icon: AlertTriangle },
              { value: "10%", label: "Max Total Loss", icon: Shield },
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

          {/* Section 1: Understanding the Challenge */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              Begrijp de Challenge Regels
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Voordat je begint met traden, moet je de regels van je challenge 100% begrijpen.
                De meeste prop firms, waaronder FTMO, hanteren een <strong>twee-fasen systeem</strong>:
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">1</span>
                    FTMO Challenge (Fase 1)
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span><strong className="text-white">10% profit target</strong> - Bijvoorbeeld €10.000 op een €100K account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span><strong className="text-white">Geen tijdslimiet</strong> - Neem de tijd die je nodig hebt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span><strong className="text-white">Minimum 4 handelsdagen</strong> - Verspreide trading activiteit</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">2</span>
                    Verification (Fase 2)
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span><strong className="text-white">5% profit target</strong> - Half van fase 1</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span><strong className="text-white">Geen tijdslimiet</strong> - Consistentie boven snelheid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span><strong className="text-white">Minimum 4 handelsdagen</strong> - Bewijs consistentie</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="not-prose bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 my-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Kritieke Regels - Overtreding = Instant Fail
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white">Maximum Daily Loss: 5%</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Op een €100K account betekent dit maximaal €5.000 verlies per dag.
                        Dit geldt voor zowel gesloten als open posities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white">Maximum Total Loss: 10%</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Je equity mag nooit meer dan 10% onder je startbalans komen.
                        €100K account = floor van €90.000.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Risk Management */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              Risicomanagement: De #1 Succesfactor
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Vraag elke succesvolle funded trader wat het belangrijkste is, en het antwoord is altijd hetzelfde:
                <strong>risicomanagement</strong>. Het maakt niet uit hoe goed je strategie is - zonder proper
                risk management faal je gegarandeerd.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">De 1-2% Regel</h3>
              <p>
                Riskeer <strong>nooit meer dan 1-2% van je account per trade</strong>. Dit is niet zomaar een
                aanbeveling - het is de gouden standaard onder professionele traders.
              </p>

              <div className="not-prose bg-card/50 border border-border rounded-xl p-6 my-8">
                <h4 className="font-semibold text-white mb-4">Voorbeeld: €100.000 Account</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">1%</div>
                    <div className="text-sm text-muted-foreground">€1.000 risico per trade</div>
                    <div className="text-xs text-muted-foreground mt-2">Conservatief - Aanbevolen</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">1.5%</div>
                    <div className="text-sm text-muted-foreground">€1.500 risico per trade</div>
                    <div className="text-xs text-muted-foreground mt-2">Gematigd</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-400">2%</div>
                    <div className="text-sm text-muted-foreground">€2.000 risico per trade</div>
                    <div className="text-xs text-muted-foreground mt-2">Maximum - Ervaren traders</div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Waarom Dit Werkt</h3>
              <p>
                Met 1% risico per trade kun je <strong>10 verliezende trades op rij</strong> hebben
                voordat je de 10% maximum loss raakt. Met 2% zijn dat er 5. De wiskunde is simpel:
                hoe kleiner je risico per trade, hoe meer ruimte je hebt om te overleven en te leren.
              </p>

              <div className="not-prose my-8">
                <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-secondary" />
                    Pro Tip: Buffer Inbouwen
                  </h4>
                  <p className="text-muted-foreground">
                    Stop met traden als je 3-4% drawdown hebt op een dag. Dit geeft je een buffer
                    voordat je de 5% daily loss limiet raakt. Traders die tegen hun limieten aan traden,
                    maken vaak de duurste fouten.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Time Management */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              Tijd- en Targetmanagement
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Een van de grootste fouten die traders maken is haast. FTMO heeft <strong>geen tijdslimiet</strong>
                meer op hun challenges - gebruik dit in je voordeel.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Breek Je Target Op</h3>
              <p>
                In plaats van te denken &quot;ik moet 10% maken&quot;, breek het op in kleinere,
                haalbare doelen:
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Maandelijks Plan (Veilig)
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Week 1-2: <strong className="text-white">2.5%</strong></li>
                    <li>Week 3-4: <strong className="text-white">2.5%</strong></li>
                    <li>Week 5-6: <strong className="text-white">2.5%</strong></li>
                    <li>Week 7-8: <strong className="text-white">2.5%</strong></li>
                    <li className="pt-2 border-t border-border">Totaal: <strong className="text-secondary">10%</strong> in 2 maanden</li>
                  </ul>
                </div>

                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                    Wekelijks Plan (Actief)
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Week 1: <strong className="text-white">2-3%</strong></li>
                    <li>Week 2: <strong className="text-white">2-3%</strong></li>
                    <li>Week 3: <strong className="text-white">2-3%</strong></li>
                    <li>Week 4: <strong className="text-white">2-3%</strong></li>
                    <li className="pt-2 border-t border-border">Totaal: <strong className="text-secondary">10%</strong> in 1 maand</li>
                  </ul>
                </div>
              </div>

              <div className="not-prose bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 my-8">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Waarschuwing: De &quot;Snel Klaar&quot; Mentaliteit
                </h4>
                <p className="text-muted-foreground">
                  Traders die proberen hun challenge in een week te halen, hebben een significant lagere
                  slagingskans. De druk om snel te presteren leidt tot overtrading, te groot risico,
                  en emotionele beslissingen. <strong className="text-white">Geduld is geen zwakte - het is je grootste wapen.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Psychology */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              Trading Psychologie
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Je kunt de beste strategie ter wereld hebben, maar zonder de juiste mindset
                zul je falen. Psychologie is verantwoordelijk voor <strong>80% van je trading succes</strong>.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">De 5 Psychologische Valkuilen</h3>

              <div className="not-prose space-y-4 my-8">
                {[
                  {
                    title: "Revenge Trading",
                    description: "Na een verlies direct weer intraden om het 'terug te winnen'. Dit verdubbelt meestal je verlies.",
                    solution: "Neem minimaal 15-30 minuten pauze na elke verliezende trade.",
                  },
                  {
                    title: "Overconfidence na Winst",
                    description: "Een paar goede trades en je denkt dat je onoverwinnelijk bent. Risico wordt verhoogd.",
                    solution: "Houd je aan je risk management, ongeacht recente resultaten.",
                  },
                  {
                    title: "Fear of Missing Out (FOMO)",
                    description: "Een setup missen en dan op een slechter moment instappen omdat 'de trade toch goed was'.",
                    solution: "Geen setup? Geen trade. De markt is er morgen nog.",
                  },
                  {
                    title: "Verlies Niet Accepteren",
                    description: "Stop-loss verplaatsen of helemaal verwijderen omdat je 'zeker weet' dat de markt draait.",
                    solution: "Accepteer dat verliezen onderdeel zijn van traden. Bescherm je kapitaal.",
                  },
                  {
                    title: "Target Chasing",
                    description: "Tegen het einde van je challenge extra risico nemen om de 10% te halen.",
                    solution: "Blijf consistent. Beter 9.5% en doorgaan dan 10% en dan crashen.",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-card/50 border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                        <XCircle className="w-4 h-4 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                        <div className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                          <span className="text-secondary">{item.solution}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Practical Tips */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <LineChart className="w-6 h-6 text-primary" />
              </div>
              Praktische Tips voor Succes
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                {[
                  {
                    icon: BarChart3,
                    title: "Oefen Eerst op Demo",
                    description: "Haal je target minimaal 2-3 keer op een demo account voordat je een echte challenge start.",
                  },
                  {
                    icon: Calendar,
                    title: "Kies Je Tijden",
                    description: "Trade alleen tijdens de sessies waar je strategie het beste werkt (London, New York overlap).",
                  },
                  {
                    icon: LineChart,
                    title: "Houd een Trading Journal",
                    description: "Log elke trade met entry, exit, reden en emotie. Analyseer wekelijks je data.",
                  },
                  {
                    icon: Shield,
                    title: "Stel Dagelijkse Limieten",
                    description: "Stop na 2-3 verliezende trades of na het behalen van je dagelijkse target.",
                  },
                  {
                    icon: Target,
                    title: "Focus op Kwaliteit",
                    description: "1-3 goede trades per dag is genoeg. Overtrading is de vijand van consistentie.",
                  },
                  {
                    icon: Brain,
                    title: "Zorg voor Jezelf",
                    description: "Slaap, beweging en gezonde voeding beïnvloeden direct je besluitvorming.",
                  },
                ].map((tip, index) => (
                  <div key={index} className="bg-card/50 border border-border rounded-xl p-6">
                    <tip.icon className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                    <p className="text-muted-foreground text-sm">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: Checklist */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              Challenge Start Checklist
            </h2>

            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-2xl p-8">
              <p className="text-muted-foreground mb-6">
                Voordat je begint aan je prop firm challenge, zorg dat je al deze punten kunt afvinken:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Ik ken alle challenge regels uit mijn hoofd",
                  "Ik heb mijn strategie getest op demo (minimaal 50+ trades)",
                  "Ik heb een duidelijk trading plan met entry/exit criteria",
                  "Mijn risico per trade is maximaal 1-2%",
                  "Ik heb een dagelijkse loss limiet ingesteld (3-4%)",
                  "Ik heb een wekelijks profit target (niet meer dan 3%)",
                  "Ik heb een trading journal klaarstaan",
                  "Ik weet welke sessies/tijden ik ga traden",
                  "Ik heb een plan voor wat te doen na verliezende trades",
                  "Ik ben mentaal voorbereid op de druk",
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
                Een prop firm challenge halen is geen kwestie van geluk - het is een kwestie van
                voorbereiding, discipline en geduld. De traders die slagen zijn niet per se de beste
                technische analisten, maar degenen die hun emoties beheersen en hun risico managen.
              </p>
              <p>
                Onthoud: je hoeft niet de 10% in een week te halen. Je hoeft niet elke dag te traden.
                Je hoeft niet elke beweging te vangen. Je moet alleen <strong>consistent zijn</strong> en
                <strong> je kapitaal beschermen</strong>.
              </p>
              <p>
                Begin met het beoefenen van deze principes op een demo account. Wanneer je consistent
                winstgevend bent en je aan je regels houdt, ben je klaar voor de echte challenge.
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="border-t border-border pt-12">
            <h3 className="text-xl font-semibold text-white mb-6">Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Veelgemaakte Fouten", href: "/categorie/veelgemaakte-fouten", description: "Leer van de fouten van anderen" },
                { title: "FTMO Challenge Regels", href: "/categorie/ftmo-regels", description: "Alle regels uitgelegd" },
                { title: "Kapitaal Opschalen", href: "/categorie/kapitaal-opschalen", description: "Van €10K naar €200K+" },
                { title: "Hoe Werkt Het?", href: "/hoe-werkt-het", description: "Complete uitleg prop firm financiering" },
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
