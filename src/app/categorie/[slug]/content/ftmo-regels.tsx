import {
  BookOpen,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Target,
  Shield,
  Clock,
  BarChart3,
  Calendar,
  TrendingUp,
  Zap,
  AlertCircle,
  FileText,
  Scale,
  Activity,
  Globe,
  Timer,
  Ban,
} from "lucide-react"
import Link from "next/link"

export function FTMORegelsContent() {
  return (
    <article className="relative py-16">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <section className="prose prose-invert prose-lg max-w-none mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              FTMO is de grootste en meest gerespecteerde prop firm ter wereld. Met strikte maar eerlijke regels
              zorgen ze ervoor dat alleen <strong className="text-white">serieuze en gedisciplineerde traders</strong>
              toegang krijgen tot hun kapitaal. In deze complete gids leggen we alle FTMO regels uit -
              van challenge voorwaarden tot trading beperkingen. Ken de regels, voorkom fouten.
            </p>
          </section>

          {/* Rule Categories Overview */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Profit Targets", icon: Target, color: "text-secondary" },
              { label: "Loss Limieten", icon: Shield, color: "text-red-400" },
              { label: "Trading Regels", icon: Activity, color: "text-primary" },
              { label: "Verboden Praktijken", icon: Ban, color: "text-amber-400" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card/50 border border-border rounded-xl p-6 text-center"
              >
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                <div className="text-sm font-medium text-white">{item.label}</div>
              </div>
            ))}
          </section>

          {/* Challenge Rules */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              Challenge & Verification Regels
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                FTMO hanteert een twee-fasen evaluatieproces: de <strong>FTMO Challenge</strong> en de
                <strong> Verification</strong>. Beide fasen hebben specifieke targets en voorwaarden.
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                {/* Phase 1 */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">FTMO Challenge</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Profit Target</span>
                      <span className="font-semibold text-secondary">10%</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Max Daily Loss</span>
                      <span className="font-semibold text-red-400">5%</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Max Total Loss</span>
                      <span className="font-semibold text-red-400">10%</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Minimum Dagen</span>
                      <span className="font-semibold text-white">4 dagen</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-muted-foreground">Tijdslimiet</span>
                      <span className="font-semibold text-secondary">Geen</span>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-secondary">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Verification</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Profit Target</span>
                      <span className="font-semibold text-secondary">5%</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Max Daily Loss</span>
                      <span className="font-semibold text-red-400">5%</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Max Total Loss</span>
                      <span className="font-semibold text-red-400">10%</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Minimum Dagen</span>
                      <span className="font-semibold text-white">4 dagen</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-muted-foreground">Tijdslimiet</span>
                      <span className="font-semibold text-secondary">Geen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Loss Limits Explained */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              Loss Limieten in Detail
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                De loss limieten zijn de meest kritieke regels bij FTMO. Overtreding betekent
                <strong className="text-red-400"> instant diskwalificatie</strong> - geen tweede kansen.
              </p>

              <div className="not-prose space-y-6 my-8">
                {/* Daily Loss */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Maximum Daily Loss: 5%</h3>
                      <p className="text-muted-foreground mb-4">
                        Je verlies op <strong className="text-white">één enkele dag</strong> mag nooit meer dan
                        5% van je startbalans zijn. Dit geldt voor zowel gesloten als open posities.
                      </p>

                      <div className="bg-background/50 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-3">Voorbeeld: €100.000 Account</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">
                              <strong className="text-white">Daily Loss Limiet:</strong> €5.000
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">
                              <strong className="text-white">Let op:</strong> Open posities tellen mee! Als je €3.000
                              gesloten verlies hebt en een open positie staat -€2.500, zit je op €5.500 en ben je over de limiet.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Max Loss */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <XCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Maximum Total Loss: 10%</h3>
                      <p className="text-muted-foreground mb-4">
                        Je totale equity mag <strong className="text-white">nooit</strong> meer dan 10% onder je
                        startbalans komen. Dit is je absolute floor.
                      </p>

                      <div className="bg-background/50 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-3">Voorbeeld: €100.000 Account</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">
                              <strong className="text-white">Startbalans:</strong> €100.000
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">
                              <strong className="text-white">Floor (absolute minimum):</strong> €90.000
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">
                              <strong className="text-red-400">Diskwalificatie:</strong> Zodra equity onder €90.000 komt
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="not-prose bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 my-8">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Belangrijk: De Regels Zijn Niet Relatief
                </h4>
                <p className="text-muted-foreground">
                  Als je account groeit naar €110.000, blijft je floor €90.000 (10% van startbalans).
                  De limieten zijn gebaseerd op je <strong className="text-white">initiële</strong> account size,
                  niet je huidige balance. Dit geeft je meer ruimte als je in winst staat.
                </p>
              </div>
            </div>
          </section>

          {/* Trading Rules */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              Trading Regels & Voorwaarden
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                Naast de loss limieten heeft FTMO een aantal trading regels die je moet kennen.
              </p>

              <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                {[
                  {
                    icon: Calendar,
                    title: "Minimum 4 Handelsdagen",
                    description: "Je moet op minimaal 4 verschillende dagen traden. Dit bewijst consistentie en voorkomt 'lucky shots'.",
                    type: "requirement",
                  },
                  {
                    icon: Clock,
                    title: "Geen Tijdslimiet",
                    description: "Sinds 2024 is er geen tijdslimiet meer. Neem de tijd die je nodig hebt - kwaliteit boven snelheid.",
                    type: "benefit",
                  },
                  {
                    icon: Globe,
                    title: "Alle Majors & Indices",
                    description: "Trade forex pairs, indices, commodities en crypto. Vrijwel alle populaire instrumenten zijn beschikbaar.",
                    type: "benefit",
                  },
                  {
                    icon: BarChart3,
                    title: "Flexibele Leverage",
                    description: "Tot 1:100 op forex, lager op indices en crypto. Pas je leverage aan per instrument.",
                    type: "info",
                  },
                  {
                    icon: Timer,
                    title: "Weekend Posities",
                    description: "Je mag posities over het weekend aanhouden. Let wel op gaps bij markt opening.",
                    type: "benefit",
                  },
                  {
                    icon: Scale,
                    title: "Geen Lot Size Limiet",
                    description: "Geen maximum lot size, maar je bent beperkt door je risicomanagement en de loss limieten.",
                    type: "benefit",
                  },
                ].map((rule, index) => (
                  <div key={index} className="bg-card/50 border border-border rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <rule.icon className={`w-5 h-5 shrink-0 ${
                        rule.type === 'requirement' ? 'text-amber-400' :
                        rule.type === 'benefit' ? 'text-secondary' : 'text-primary'
                      }`} />
                      <div>
                        <h4 className="font-medium text-white mb-1">{rule.title}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prohibited Practices */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Ban className="w-6 h-6 text-red-400" />
              </div>
              Verboden Praktijken
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                FTMO heeft strikte regels tegen bepaalde trading praktijken. Overtreding kan leiden tot
                diskwalificatie en permanent ban.
              </p>

              <div className="not-prose space-y-4 my-8">
                {[
                  {
                    practice: "Account Sharing",
                    description: "Je account delen met anderen of iemand anders laten traden op jouw account is strikt verboden.",
                    severity: "Permanent Ban",
                  },
                  {
                    practice: "Copy Trading (tussen FTMO accounts)",
                    description: "Het kopiëren van trades tussen meerdere FTMO accounts of van andere traders is niet toegestaan.",
                    severity: "Diskwalificatie",
                  },
                  {
                    practice: "Hedging Tussen Accounts",
                    description: "Long gaan op account A en short op account B om risico te elimineren is verboden.",
                    severity: "Diskwalificatie",
                  },
                  {
                    practice: "Gebruik van HFT Bots",
                    description: "High-frequency trading algoritmes die extreem snel trades uitvoeren zijn niet toegestaan.",
                    severity: "Diskwalificatie",
                  },
                  {
                    practice: "Arbitrage Strategieën",
                    description: "Het exploiteren van prijsverschillen tussen brokers of data feeds is verboden.",
                    severity: "Diskwalificatie",
                  },
                  {
                    practice: "Gap Trading (alleen)",
                    description: "Puur traden op weekend gaps of nieuws gaps zonder andere strategie elementen.",
                    severity: "Review",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-white mb-1">{item.practice}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium bg-red-500/20 text-red-400 px-2 py-1 rounded shrink-0">
                        {item.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="not-prose bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 my-8">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Wat WEL Is Toegestaan
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "EA's en trading bots (eigen strategieën)",
                    "News trading (met normale risk management)",
                    "Scalping en day trading",
                    "Swing trading (posities langer dan 1 dag)",
                    "Hedging binnen hetzelfde account",
                    "Meerdere FTMO accounts (zelfde strategie, geen copy)",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Account Sizes & Fees */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              Account Sizes & Prijzen
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                FTMO biedt verschillende account sizes aan. De prijs is een eenmalige fee voor de challenge.
                Bij het halen van de challenge krijg je deze fee terug met je eerste payout.
              </p>

              <div className="not-prose overflow-x-auto my-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Account Size</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Challenge Fee</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">10% Target</th>
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">5% Daily Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: "€10.000", fee: "€89", target: "€1.000", daily: "€500" },
                      { size: "€25.000", fee: "€229", target: "€2.500", daily: "€1.250" },
                      { size: "€50.000", fee: "€299", target: "€5.000", daily: "€2.500" },
                      { size: "€100.000", fee: "€529", target: "€10.000", daily: "€5.000" },
                      { size: "€200.000", fee: "€995", target: "€20.000", daily: "€10.000" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-card/50">
                        <td className="py-4 px-4 font-medium text-white">{row.size}</td>
                        <td className="py-4 px-4 text-primary">{row.fee}</td>
                        <td className="py-4 px-4 text-secondary">{row.target}</td>
                        <td className="py-4 px-4 text-red-400">{row.daily}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="not-prose bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  Fee Refund
                </h4>
                <p className="text-muted-foreground">
                  Als je beide fasen haalt, krijg je de challenge fee <strong className="text-white">volledig terug</strong>
                  bij je eerste payout als funded trader. Effectief kost de challenge je dus niets als je slaagt.
                </p>
              </div>
            </div>
          </section>

          {/* Rules Summary Checklist */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              FTMO Regels Samenvatting
            </h2>

            <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Challenge Targets
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Fase 1: 10% profit target",
                      "Fase 2: 5% profit target",
                      "Minimum 4 handelsdagen per fase",
                      "Geen tijdslimiet",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    Loss Limieten
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Max 5% daily loss (per dag)",
                      "Max 10% total loss (absoluut)",
                      "Geldt voor gesloten + open posities",
                      "Overtreding = instant diskwalificatie",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Toegestaan
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Alle trading stijlen (scalp, day, swing)",
                      "EA's en eigen bots",
                      "News trading",
                      "Weekend posities",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Ban className="w-5 h-5 text-amber-400" />
                    Verboden
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Account sharing",
                      "Copy trading tussen accounts",
                      "Cross-account hedging",
                      "HFT bots & arbitrage",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Conclusie</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                FTMO&apos;s regels zijn strikt maar fair. Ze zijn ontworpen om <strong>discipline te belonen</strong>
                en risicovol gedrag te ontmoedigen. De twee belangrijkste regels om te onthouden:
              </p>
              <ol>
                <li><strong className="text-red-400">Nooit meer dan 5% verlies per dag</strong></li>
                <li><strong className="text-red-400">Nooit meer dan 10% totaal verlies</strong></li>
              </ol>
              <p>
                Als je deze twee regels respecteert en je aan je trading plan houdt, heb je alle tijd
                om je targets te halen. Er is geen haast - alleen discipline.
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="border-t border-border pt-12">
            <h3 className="text-xl font-semibold text-white mb-6">Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Challenge Tips", href: "/categorie/challenge-tips", description: "Haal je challenge in één keer" },
                { title: "Veelgemaakte Fouten", href: "/categorie/veelgemaakte-fouten", description: "Voorkom dure fouten" },
                { title: "Kapitaal Opschalen", href: "/categorie/kapitaal-opschalen", description: "Groei je account via scaling" },
                { title: "Kosten", href: "/kosten", description: "Complete kosten breakdown" },
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
