"use client"

import Link from "next/link"
import {
  AlertTriangle,
  XCircle,
  TrendingDown,
  Brain,
  Target,
  Shield,
  Clock,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Zap,
  RefreshCw,
  DollarSign,
  ArrowRight,
  Flame,
  Eye,
  Scale,
  Timer,
} from "lucide-react"
import { Button } from "@/components/ui"

export function VeelgemaakteFoutenContent() {
  return (
    <article className="relative pb-16">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <section className="prose prose-lg prose-invert max-w-none mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Statistieken wijzen uit dat ongeveer <strong>85-90% van de traders</strong> hun
              prop firm challenge niet haalt. Niet omdat ze geen goede traders zijn, maar
              omdat ze vermijdbare fouten maken. In deze gids analyseren we de meest
              voorkomende valkuilen en geven we concrete tips om ze te voorkomen. Door
              deze fouten te begrijpen, vergroot je jouw kans op succes aanzienlijk.
            </p>
          </section>

          {/* Statistics */}
          <section className="mb-16">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-red-500/20">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    De Harde Waarheid Over Falen
                  </h2>
                  <p className="text-muted-foreground">
                    Waarom falen zoveel traders ondanks voldoende kennis?
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-background/50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">
                    Faalt in eerste challenge
                  </div>
                </div>
                <div className="bg-background/50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">60%</div>
                  <div className="text-sm text-muted-foreground">
                    Door rule violations
                  </div>
                </div>
                <div className="bg-background/50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">70%</div>
                  <div className="text-sm text-muted-foreground">
                    Te voorkomen fouten
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                Het goede nieuws? De meeste fouten zijn te voorkomen met de juiste
                voorbereiding en discipline. Lees verder om te leren hoe.
              </p>
            </div>
          </section>

          {/* Category 1: Risk Management */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Risicomanagement Fouten
              </h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p>
                Risicomanagement is de ruggengraat van succesvol traden. Toch maken
                de meeste traders hier cruciale fouten die hun account binnen dagen
                kunnen vernietigen. Dit zijn de gevaarlijkste:
              </p>
            </div>

            <div className="space-y-6">
              {/* Mistake 1 */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-500/10 mt-1">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      1. Te Grote Posities (Overleveraging)
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      De nummer één killer van prop firm accounts. Traders nemen
                      posities die te groot zijn voor hun accountgrootte, waardoor
                      één slechte trade al fataal kan zijn.
                    </p>

                    <div className="bg-background/50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-white mb-2">Voorbeeld:</p>
                      <p className="text-sm text-muted-foreground">
                        Bij een €100.000 account met 5% max drawdown heb je €5.000
                        &quot;ruimte&quot;. Als je 2 lot EUR/USD tradedt met een 50 pip stop loss,
                        riskeer je al €1.000 per trade (20% van je buffer). Drie
                        verliezende trades en je bent al op 60% van je maximale verlies.
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-secondary">
                        <strong>Oplossing:</strong> Riskeer maximaal 0.5-1% per trade.
                        Bij €100K account is dat €500-1.000 risico per positie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 2 */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-500/10 mt-1">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      2. Geen Stop Loss Gebruiken
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      &quot;Ik kijk wel even&quot; of &quot;de markt komt wel terug&quot; zijn de
                      beroemdste laatste woorden van gefaalde traders. Zonder
                      stop loss kun je onbeperkt verlies lijden.
                    </p>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-secondary">
                        <strong>Oplossing:</strong> Zet ALTIJD een stop loss voordat
                        je een trade ingaat. Bepaal eerst waar je stop komt, dan pas
                        je positiegrootte.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 3 */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-500/10 mt-1">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      3. Stop Loss Verplaatsen (Verder Weg)
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Je trade gaat tegen je in en in paniek verplaats je je stop
                      loss verder weg om niet uitgestopt te worden. Dit vergroot
                      alleen je potentiële verlies.
                    </p>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-secondary">
                        <strong>Oplossing:</strong> Accepteer het verlies. Een kleine
                        loss nemen is beter dan een grote. Verplaats stops alleen
                        naar break-even of in de richting van winst.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 4 */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-500/10 mt-1">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      4. Bijkopen in Verliezende Posities (Averaging Down)
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Je trade gaat tegen je in, dus je koopt bij om je gemiddelde
                      prijs te verlagen. Nu heb je een nog grotere positie die nog
                      steeds de verkeerde kant op gaat.
                    </p>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-secondary">
                        <strong>Oplossing:</strong> Als de markt je ongelijk geeft,
                        accepteer dat. Averaging down is een recept voor rampen.
                        Sluit de trade en wacht op een nieuwe setup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 2: Rule Violations */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-500/10">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Regelovertredingen
              </h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p>
                Prop firms hebben strikte regels. Het overtreden hiervan betekent
                instant diskwalificatie, ongeacht hoe goed je verder tradedt. Deze
                fouten zijn 100% te voorkomen.
              </p>
            </div>

            <div className="bg-card/50 border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-white font-semibold">Overtreding</th>
                      <th className="text-left p-4 text-white font-semibold">Waarom het gebeurt</th>
                      <th className="text-left p-4 text-white font-semibold">Preventie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-4 text-muted-foreground">Daily Loss Limit (5%)</td>
                      <td className="p-4 text-muted-foreground">Revenge trading na verlies</td>
                      <td className="p-4 text-secondary">Stop na 3% verlies die dag</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-muted-foreground">Max Drawdown (10%)</td>
                      <td className="p-4 text-muted-foreground">Cumulatief te groot risico</td>
                      <td className="p-4 text-secondary">Max 1% risico per trade</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-muted-foreground">News Trading</td>
                      <td className="p-4 text-muted-foreground">Kalender niet gecheckt</td>
                      <td className="p-4 text-secondary">Check ForexFactory dagelijks</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-muted-foreground">Weekend Holding</td>
                      <td className="p-4 text-muted-foreground">Vergeten te sluiten</td>
                      <td className="p-4 text-secondary">Vrijdag alarm zetten</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-muted-foreground">Overnight Positie</td>
                      <td className="p-4 text-muted-foreground">Swap kosten vergeten</td>
                      <td className="p-4 text-secondary">Check firm regels vooraf</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Pro Tip: Monitoring</p>
                  <p className="text-sm text-muted-foreground">
                    Houd je daily loss in realtime bij. Veel traders kijken alleen naar
                    hun equity en vergeten dat de daily loss limit gebaseerd is op de
                    <strong> hoogste equity van die dag</strong>, niet op je startbalans.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Category 3: Psychology */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/10">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Psychologische Valkuilen
              </h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p>
                Technische analyse kun je leren, maar emoties beheersen is een
                ander verhaal. Deze psychologische fouten kosten meer accounts
                dan slechte strategie.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenge Trading */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Flame className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">Revenge Trading</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Na een verlies direct proberen om het terug te winnen met grotere
                  posities of impulsieve trades. Dit leidt bijna altijd tot nog
                  meer verlies.
                </p>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-secondary">
                    <strong>Regel:</strong> Na 2 verliezende trades op rij, stop
                    minimaal 30 minuten. Na 3 verliezen: klaar voor vandaag.
                  </p>
                </div>
              </div>

              {/* Overtrading */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <RefreshCw className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">Overtrading</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Te veel trades nemen, vaak uit verveling of FOMO. Elke trade
                  kost spread/commissie en verhoogt je exposure naar de markt.
                </p>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-secondary">
                    <strong>Regel:</strong> Stel een maximum aantal trades per dag
                    (bijv. 3-5). Kwaliteit boven kwantiteit.
                  </p>
                </div>
              </div>

              {/* FOMO */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Zap className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">FOMO (Fear of Missing Out)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Een grote move missen en dan te laat instappen. Je koopt op
                  de top of verkoopt op de bodem, precies wanneer de beweging
                  al voorbij is.
                </p>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-secondary">
                    <strong>Regel:</strong> Gemiste trades bestaan niet. Er komt
                    altijd een nieuwe kans. Wacht op je setup.
                  </p>
                </div>
              </div>

              {/* Ongeduld */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Timer className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">Ongeduld</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Trades te vroeg sluiten (winst) of te lang vasthouden (verlies).
                  Laat je winners lopen en cut je losers snel – niet andersom.
                </p>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-secondary">
                    <strong>Regel:</strong> Stel van tevoren je target en stop loss.
                    Volg je plan, niet je emoties.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Category 4: Strategy Mistakes */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Strategie Fouten
              </h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p>
                Een goede strategie is essentieel, maar de manier waarop je hem
                toepast is minstens zo belangrijk. Deze strategische fouten
                ondermijnen zelfs de beste trading systemen.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-card/50 border border-border rounded-xl">
                <div className="text-2xl font-bold text-primary/30">01</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Geen Trading Plan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Zonder plan trade je op gevoel. Een trading plan definieert
                    wanneer je wel en niet tradedt, je entry/exit criteria,
                    risicomanagement regels en dagelijkse routines. Schrijf het op.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card/50 border border-border rounded-xl">
                <div className="text-2xl font-bold text-primary/30">02</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Strategie Hoppen
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Na een paar verliezen direct naar een nieuwe strategie
                    switchen. Elke strategie heeft verliezende periodes. Geef
                    je strategie minimaal 50-100 trades om te bewijzen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card/50 border border-border rounded-xl">
                <div className="text-2xl font-bold text-primary/30">03</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Verkeerde Timeframe
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Scalpen terwijl je eigenlijk een swing trader bent, of
                    andersom. Ken jezelf: hoeveel tijd heb je? Kun je snel
                    beslissen? Kies een timeframe die bij je past.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card/50 border border-border rounded-xl">
                <div className="text-2xl font-bold text-primary/30">04</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Te Veel Indicatoren
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis paralysis: zoveel indicatoren op je chart dat je
                    geen duidelijk beeld meer hebt. Minder is meer. Kies 2-3
                    indicatoren en beheers die volledig.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card/50 border border-border rounded-xl">
                <div className="text-2xl font-bold text-primary/30">05</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Niet Backtesten
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Een strategie live traden zonder te weten of hij historisch
                    winstgevend is. Backtest minimaal 6-12 maanden aan data
                    voordat je echte trades neemt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Prevention Checklist */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Preventie Checklist
              </h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p>
                Gebruik deze checklist voor elke trading dag. Door deze punten
                na te lopen voorkom je de meeste veelgemaakte fouten:
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-8">
              <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-secondary" />
                Dagelijkse Pre-Trading Checklist
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-secondary">✓</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Economische kalender gecheckt</strong> –
                    Weet wanneer high-impact nieuws komt (NFP, FOMC, etc.)
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-secondary">✓</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Daily loss limit berekend</strong> –
                    Weet hoeveel je vandaag maximaal mag verliezen
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-secondary">✓</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Positiegrootte bepaald</strong> –
                    Max 0.5-1% risico per trade, lot size vooraf berekend
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-secondary">✓</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Trading plan gelezen</strong> –
                    Herinner jezelf aan je regels en criteria
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-secondary">✓</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Mentale staat geëvalueerd</strong> –
                    Ben je fit, gefocust en emotioneel stabiel?
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-secondary">✓</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Max trades voor vandaag</strong> –
                    Limiteer jezelf (bijv. maximaal 5 trades)
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-secondary">✓</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Weekend/overnight check</strong> –
                    Mag je posities overnight houden? Weekend?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What to do after mistakes */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Na Een Fout: Herstelprotocol
              </h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p>
                Iedereen maakt fouten. Het verschil tussen winnende en verliezende
                traders is hoe ze met fouten omgaan. Volg dit protocol:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="text-4xl font-bold text-primary/20 mb-3">1</div>
                <h3 className="font-semibold text-white mb-2">Stop Direct</h3>
                <p className="text-sm text-muted-foreground">
                  Neem geen nieuwe trades. Log uit van je platform als nodig.
                  Emotionele beslissingen leiden tot meer fouten.
                </p>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="text-4xl font-bold text-primary/20 mb-3">2</div>
                <h3 className="font-semibold text-white mb-2">Documenteer</h3>
                <p className="text-sm text-muted-foreground">
                  Schrijf precies op wat er gebeurde. Welke fout maakte je?
                  Waarom? Dit voorkomt herhaling.
                </p>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="text-4xl font-bold text-primary/20 mb-3">3</div>
                <h3 className="font-semibold text-white mb-2">Analyseer</h3>
                <p className="text-sm text-muted-foreground">
                  Was het een procesfout (regels overtreden) of een marktfout
                  (strategie werkte niet)? Procesfout = jouw schuld, fix het.
                </p>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="text-4xl font-bold text-primary/20 mb-3">4</div>
                <h3 className="font-semibold text-white mb-2">Pas Aan</h3>
                <p className="text-sm text-muted-foreground">
                  Voeg een regel toe aan je trading plan die deze specifieke
                  fout in de toekomst voorkomt.
                </p>
              </div>
            </div>
          </section>

          {/* Summary Stats */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                Samenvatting: Top 10 Vermijdbare Fouten
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">1.</span>
                  <span className="text-muted-foreground text-sm">Te grote posities (overleveraging)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">2.</span>
                  <span className="text-muted-foreground text-sm">Geen stop loss gebruiken</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">3.</span>
                  <span className="text-muted-foreground text-sm">Revenge trading na verlies</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">4.</span>
                  <span className="text-muted-foreground text-sm">Daily loss limit overschrijden</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">5.</span>
                  <span className="text-muted-foreground text-sm">Overtrading (te veel trades)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">6.</span>
                  <span className="text-muted-foreground text-sm">Traden zonder plan</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">7.</span>
                  <span className="text-muted-foreground text-sm">Stop loss verplaatsen</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">8.</span>
                  <span className="text-muted-foreground text-sm">News trading zonder te weten</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">9.</span>
                  <span className="text-muted-foreground text-sm">FOMO trades (te laat instappen)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <span className="text-red-400 font-bold">10.</span>
                  <span className="text-muted-foreground text-sm">Averaging down in verlies</span>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="prose prose-lg prose-invert max-w-none">
              <h2>Conclusie: Discipline Wint</h2>
              <p>
                Het verschil tussen een succesvolle en een falende prop trader zit
                niet in technische analyse of strategie – het zit in discipline en
                zelfbeheersing. De meeste traders weten wat ze moeten doen, maar
                doen het niet consequent.
              </p>
              <p>
                Door de fouten in deze gids te herkennen en actief te vermijden,
                plaats je jezelf in de top 15% van traders die wél hun challenge
                halen. Gebruik de checklist, volg je trading plan, en onthoud:
                <strong> capital preservation komt voor capital appreciation</strong>.
              </p>
              <p>
                Een kleine winst vandaag is beter dan een blow-up. Consistentie
                wint op de lange termijn. Je hoeft niet elke dag te traden – je
                moet alleen niet de fouten maken die je account vernietigen.
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6">
              Gerelateerde Artikelen
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/categorie/challenge-tips"
                className="group p-5 bg-card/50 border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary text-sm font-medium">Pillar Guide</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                  Challenge Tips: Haal Je Prop Firm Test
                </h3>
              </Link>

              <Link
                href="/categorie/ftmo-regels"
                className="group p-5 bg-card/50 border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary text-sm font-medium">Pillar Guide</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                  Alle FTMO Regels Uitgelegd
                </h3>
              </Link>

              <Link
                href="/categorie/uitbetalingen"
                className="group p-5 bg-card/50 border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary text-sm font-medium">Pillar Guide</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-secondary transition-colors">
                  Uitbetalingen: Van Winst naar Bankrekening
                </h3>
              </Link>

              <Link
                href="/categorie/kapitaal-opschalen"
                className="group p-5 bg-card/50 border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary text-sm font-medium">Pillar Guide</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-secondary transition-colors">
                  Kapitaal Opschalen: Van €100K naar €400K
                </h3>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
