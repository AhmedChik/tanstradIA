import { TrendingUp, TrendingDown, AlertTriangle, Brain, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const TradingSection = () => {
  const signals = [
    { pair: "EUR/USD", action: "ACHAT", confidence: 94, price: "1.0892", change: "+0.32%", type: "success" },
    { pair: "BTC/USD", action: "VENTE", confidence: 87, price: "67,234", change: "-1.24%", type: "destructive" },
    { pair: "GOLD", action: "ACHAT", confidence: 91, price: "2,341", change: "+0.56%", type: "success" },
    { pair: "ETH/USD", action: "ATTENTE", confidence: 72, price: "3,456", change: "+0.12%", type: "warning" },
  ];

  const features = [
    {
      icon: Brain,
      title: "Signaux IA en Temps Réel",
      description: "Recevez des signaux Achat/Vente/Stop instantanés basés sur l'analyse de millions de données."
    },
    {
      icon: Target,
      title: "Plans de Trade Personnalisés",
      description: "L'IA crée des stratégies adaptées à votre profil de risque et vos objectifs."
    },
    {
      icon: AlertTriangle,
      title: "Alertes de Risque",
      description: "Soyez averti avant les mouvements dangereux grâce à notre détection prédictive."
    },
    {
      icon: Zap,
      title: "Tri Intelligent",
      description: "Filtrez automatiquement les opportunités rentables des trades risqués."
    },
  ];

  return (
    <section id="trading" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Trading Propulsé par l'IA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Des <span className="text-gradient">Signaux Précis</span> à Portée de Main
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notre IA analyse les marchés 24/7 pour vous fournir les meilleures opportunités de trading
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Signals Panel */}
          <div className="glass rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Signaux en Direct</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>

            <div className="space-y-4">
              {signals.map((signal, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      signal.type === "success" ? "bg-success/20" : 
                      signal.type === "destructive" ? "bg-destructive/20" : "bg-warning/20"
                    }`}>
                      {signal.type === "success" ? (
                        <TrendingUp className="w-6 h-6 text-success" />
                      ) : signal.type === "destructive" ? (
                        <TrendingDown className="w-6 h-6 text-destructive" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-warning" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{signal.pair}</div>
                      <div className="text-sm text-muted-foreground">${signal.price}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      signal.type === "success" ? "bg-success/20 text-success" : 
                      signal.type === "destructive" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                    }`}>
                      {signal.action}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Confiance: {signal.confidence}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" className="w-full mt-6">
              Voir Tous les Signaux
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingSection;
