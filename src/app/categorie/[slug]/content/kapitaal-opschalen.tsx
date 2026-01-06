import {
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Target,
  Shield,
  Clock,
  DollarSign,
  Award,
  Percent,
  Calendar,
  BarChart3,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"

export function KapitaalOpschalenContent() {
  return (
    <article className="relative py-16">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <section className="prose prose-invert prose-lg max-w-none mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Je hebt je prop firm challenge gehaald en bent nu een funded trader. Gefeliciteerd!
              Maar dit is pas het begin. Met de juiste aanpak kun je je trading kapitaal
              <strong className="text-white"> verviervoudigen of meer</strong> via het scaling plan.
              Van €10.000 naar €40.000+, of van €100.000 naar €400.000+. In deze gids leggen we
              precies uit hoe het scaling systeem werkt en hoe je er optimaal gebruik van maakt.
            </p>
          </section>

          {/* Scaling Overview */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              Hoe Werkt het Scaling Plan?
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Het scaling plan is een beloningssysteem voor consistente traders. Prop firms zoals FTMO
                verhogen je account size als je bewijst dat je winstgevend en gedisciplineerd kunt traden
                over een langere periode. Dit systeem is ontworpen om <strong>consistente prestaties te belonen</strong>,
                niet om snel rijk te worden.
              </p>

              <div className="not-prose bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 rounded-2xl p-8 my-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-secondary" />
                  FTMO Scaling Plan Voorwaarden
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                        <Percent className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">10% Winst</h4>
                        <p className="text-sm text-muted-foreground">
                          Minimaal 10% totale winst over de meetperiode
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">4 Maanden Periode</h4>
                        <p className="text-sm text-muted-foreground">
                          De 10% moet behaald worden binnen 4 maanden
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">25% Kapitaalverhoging</h4>
                        <p className="text-sm text-muted-foreground">
                          Je account wordt met 25% verhoogd bij succes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                        <DollarSign className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">90% Profit Split</h4>
                        <p className="text-sm text-muted-foreground">
                          Je winstdeling stijgt van 80% naar 90%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scaling Timeline Example */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              Scaling Tijdlijn: Van €100K naar €400K
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Laten we een realistisch voorbeeld bekijken. Je start met een €100.000 FTMO account
                en je haalt consistent je targets. Zo ziet je groeipad eruit:
              </p>

              <div className="not-prose my-8">
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-accent" />

                  <div className="space-y-8">
                    {[
                      {
                        period: "Start",
                        capital: "€100.000",
                        split: "80%",
                        profit: "-",
                        earned: "-",
                        color: "secondary",
                      },
                      {
                        period: "Na 4 maanden",
                        capital: "€125.000",
                        split: "90%",
                        profit: "€10.000",
                        earned: "€8.000",
                        color: "secondary",
                      },
                      {
                        period: "Na 8 maanden",
                        capital: "€156.250",
                        split: "90%",
                        profit: "€12.500",
                        earned: "€11.250",
                        color: "primary",
                      },
                      {
                        period: "Na 12 maanden",
                        capital: "€195.313",
                        split: "90%",
                        profit: "€15.625",
                        earned: "€14.063",
                        color: "primary",
                      },
                      {
                        period: "Na 16 maanden",
                        capital: "€244.141",
                        split: "90%",
                        profit: "€19.531",
                        earned: "€17.578",
                        color: "accent",
                      },
                      {
                        period: "Na 20 maanden",
                        capital: "€305.176",
                        split: "90%",
                        profit: "€24.414",
                        earned: "€21.973",
                        color: "accent",
                      },
                      {
                        period: "Na 24 maanden",
                        capital: "€381.470",
                        split: "90%",
                        profit: "€30.518",
                        earned: "€27.466",
                        color: "accent",
                      },
                    ].map((item, index) => (
                      <div key={index} className="relative flex items-start gap-6 pl-16">
                        <div
                          className={`absolute left-6 w-5 h-5 rounded-full border-4 border-background bg-${item.color}`}
                          style={{ backgroundColor: item.color === 'secondary' ? '#10B981' : item.color === 'primary' ? '#059669' : '#F59E0B' }}
                        />
                        <div className="flex-1 bg-card/50 border border-border rounded-xl p-6">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <h4 className="font-semibold text-white">{item.period}</h4>
                            <span className="text-2xl font-bold text-white">{item.capital}</span>
                          </div>
                          {item.profit !== "-" && (
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Profit Split</span>
                                <p className="font-medium text-white">{item.split}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">10% Profit</span>
                                <p className="font-medium text-secondary">{item.profit}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Jouw Deel</span>
                                <p className="font-medium text-secondary">{item.earned}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="not-prose bg-card/50 border border-border rounded-xl p-6 my-8">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-secondary" />
                  Totale Inkomsten na 2 Jaar
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-background/50 rounded-lg">
                    <div className="text-3xl font-bold text-secondary">€381.470</div>
                    <div className="text-sm text-muted-foreground">Account Size</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">~€100.330</div>
                    <div className="text-sm text-muted-foreground">Totaal Verdiend</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg">
                    <div className="text-3xl font-bold text-accent">281%</div>
                    <div className="text-sm text-muted-foreground">Kapitaalgroei</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Account Size Comparison */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              Scaling per Account Size
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                De groei is exponentieel. Hoe groter je startkapitaal, hoe sneller je absolute
                kapitaal groeit. Hier is een overzicht van wat je kunt bereiken met verschillende
                startgroottes:
              </p>

              <div className="not-prose overflow-x-auto my-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Start</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Na 1 Jaar</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Na 2 Jaar</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Groei</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { start: "€10.000", year1: "€19.531", year2: "€38.147", growth: "281%" },
                      { start: "€25.000", year1: "€48.828", year2: "€95.367", growth: "281%" },
                      { start: "€50.000", year1: "€97.656", year2: "€190.735", growth: "281%" },
                      { start: "€100.000", year1: "€195.313", year2: "€381.470", growth: "281%" },
                      { start: "€200.000", year1: "€390.625", year2: "€762.939", growth: "281%" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-card/50">
                        <td className="py-4 px-4 font-medium text-white">{row.start}</td>
                        <td className="py-4 px-4 text-muted-foreground">{row.year1}</td>
                        <td className="py-4 px-4 text-secondary font-medium">{row.year2}</td>
                        <td className="py-4 px-4 text-primary font-medium">{row.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="not-prose bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 my-8">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Pro Tip: Meerdere Accounts
                </h4>
                <p className="text-muted-foreground">
                  Veel succesvolle traders beheren meerdere prop firm accounts tegelijk. Met dezelfde
                  strategie kun je bijvoorbeeld 2x €100K accounts hebben, wat je effectief €200K
                  kapitaal geeft. Na scaling heb je dan €762.939 beschikbaar. Let wel: dit vereist
                  uitstekend risicomanagement.
                </p>
              </div>
            </div>
          </section>

          {/* Strategies for Scaling */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              Strategieën voor Succesvol Schalen
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Opschalen klinkt eenvoudig - maak gewoon 10% in 4 maanden. Maar in de praktijk
                vereist het een andere mindset dan de challenge halen. Hier zijn de strategieën
                die succesvolle traders gebruiken:
              </p>

              <div className="not-prose space-y-6 my-8">
                {[
                  {
                    title: "Consistentie Boven Snelheid",
                    description: "Focus op 2-3% per maand in plaats van 10% in één maand. Dit geeft je ruimte voor drawdowns en houdt je uit de gevarenzone.",
                    icon: Clock,
                    tip: "Verdeel je target: 2.5% per maand = 10% in 4 maanden",
                  },
                  {
                    title: "Risico Verlagen Na Scaling",
                    description: "Na elke scale-up, verlaag je risico per trade tijdelijk. Een groter account betekent grotere absolute verliezen als het misgaat.",
                    icon: Shield,
                    tip: "Verlaag van 1% naar 0.5-0.75% risico na een scale-up",
                  },
                  {
                    title: "Compound Niet Te Agressief",
                    description: "Je hoeft niet elk maand 2.5% te halen. Een paar maanden met 1.5% zijn prima. Bescherm wat je hebt opgebouwd.",
                    icon: BarChart3,
                    tip: "Accepteer dat sommige maanden vlak zijn",
                  },
                  {
                    title: "Payout vs. Groei Balance",
                    description: "Neem regelmatig winst uit je account, maar laat genoeg staan voor scaling. Een 50/50 split werkt goed.",
                    icon: DollarSign,
                    tip: "Neem 50% payout, laat 50% voor growth",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-card/50 border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm bg-secondary/10 text-secondary px-4 py-2 rounded-lg inline-flex">
                          <Zap className="w-4 h-4" />
                          {item.tip}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Common Scaling Mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              Veelgemaakte Scaling Fouten
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Veel traders die hun challenge halen, verliezen hun account tijdens de scaling fase.
                Vermijd deze fouten:
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                {[
                  {
                    mistake: "Risico verhogen na winst",
                    why: "Je denkt dat je 'ruimte hebt' en vergroot je posities. Een drawdown wist weken werk uit.",
                  },
                  {
                    mistake: "Geforceerd traden",
                    why: "Als de markt niet beweegt, forceer je trades om je target te halen. Kwaliteit > kwantiteit.",
                  },
                  {
                    mistake: "Drawdown paniek",
                    why: "Bij -5% ga je overtraden om terug te komen. Dit maakt het meestal erger.",
                  },
                  {
                    mistake: "Strategie veranderen",
                    why: "Je probeert 'snellere' strategieën na een paar verliezende trades. Blijf bij wat werkt.",
                  },
                  {
                    mistake: "Negeren van de regels",
                    why: "Je bent funded en voelt je veilig. Maar de daily loss en max loss regels gelden nog steeds.",
                  },
                  {
                    mistake: "Te veel uitbetalen",
                    why: "Je neemt alle winst uit en hebt geen buffer voor scaling of drawdowns.",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-sm font-bold">
                        {index + 1}
                      </span>
                      {item.mistake}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Maximum Scaling */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Star className="w-6 h-6 text-accent" />
              </div>
              Maximum Scaling Potentieel
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Prop firms hebben meestal een maximum account size. Bij FTMO kun je opschalen tot
                <strong className="text-white"> $2.000.000</strong> per account. Met meerdere accounts
                zijn er traders die meer dan $5.000.000 beheren.
              </p>

              <div className="not-prose bg-gradient-to-br from-accent/10 to-amber-500/10 border border-accent/20 rounded-2xl p-8 my-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-accent" />
                  Elite Trader Status
                </h3>
                <p className="text-muted-foreground mb-6">
                  Traders die consistent presteren over meerdere jaren kunnen elite status bereiken.
                  Dit komt met extra voordelen:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">90%</div>
                    <div className="text-sm text-muted-foreground">Profit Split</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">$2M+</div>
                    <div className="text-sm text-muted-foreground">Max Account Size</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">Snellere</div>
                    <div className="text-sm text-muted-foreground">Uitbetalingen</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Conclusie</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Het scaling plan is waar de echte magie gebeurt in prop trading. Een bescheiden
                €100.000 account kan in twee jaar groeien naar bijna €400.000 - en dat met slechts
                10% winst per 4 maanden. Dat is 2.5% per maand, of ongeveer 0.6% per week.
              </p>
              <p>
                De sleutel tot succesvol schalen is <strong>consistentie en geduld</strong>.
                Traders die proberen te snel te groeien, verliezen vaak hun account. Traders die
                rustig en gedisciplineerd blijven, bouwen een carrière.
              </p>
              <p>
                Begin met het bewijzen dat je consistent kunt traden. De rest volgt vanzelf.
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="border-t border-border pt-12">
            <h3 className="text-xl font-semibold text-white mb-6">Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Uitbetalingen & Payouts", href: "/categorie/uitbetalingen", description: "Wanneer en hoe word je betaald?" },
                { title: "Challenge Tips", href: "/categorie/challenge-tips", description: "Haal je challenge in één keer" },
                { title: "FTMO Regels", href: "/categorie/ftmo-regels", description: "Alle regels uitgelegd" },
                { title: "Kosten Overzicht", href: "/kosten", description: "Wat kost een prop firm challenge?" },
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
