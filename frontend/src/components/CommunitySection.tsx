import { Users, MessageCircle, Share2, Trophy, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunitySection = () => {
  const traders = [
    { name: "Sophie M.", avatar: "SM", profit: "+234%", rank: 1, specialty: "Crypto" },
    { name: "Marc D.", avatar: "MD", profit: "+189%", rank: 2, specialty: "Forex" },
    { name: "Julie L.", avatar: "JL", profit: "+156%", rank: 3, specialty: "Actions" },
    { name: "Thomas R.", avatar: "TR", profit: "+142%", rank: 4, specialty: "Commodités" },
  ];

  const groups = [
    { name: "Crypto Hunters", members: 12453, active: true },
    { name: "Forex Masters", members: 8921, active: true },
    { name: "Day Trading Pro", members: 6782, active: false },
  ];

  return (
    <section id="community" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Communauté</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Rejoignez des <span className="text-gradient">Milliers de Traders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Échangez, apprenez et grandissez avec une communauté passionnée de traders du monde entier
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top Traders */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-5 h-5 text-warning" />
              <h3 className="text-xl font-semibold">Top Traders du Mois</h3>
            </div>
            
            <div className="space-y-4">
              {traders.map((trader, index) => (
                <div 
                  key={index}
                  className="glass rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${
                      trader.rank === 1 ? "bg-gradient-primary text-primary-foreground" :
                      trader.rank === 2 ? "bg-secondary text-foreground" :
                      "bg-muted text-foreground"
                    }`}>
                      {trader.avatar}
                    </div>
                    {trader.rank <= 3 && (
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        trader.rank === 1 ? "bg-warning text-warning-foreground" :
                        trader.rank === 2 ? "bg-foreground/20 text-foreground" :
                        "bg-warning/60 text-warning-foreground"
                      }`}>
                        {trader.rank}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold">{trader.name}</div>
                    <div className="text-sm text-muted-foreground">{trader.specialty}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-success font-bold">{trader.profit}</div>
                    <div className="text-xs text-muted-foreground">Ce mois</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Groups & Features */}
          <div className="space-y-8">
            {/* Groups */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Groupes Populaires</h3>
              </div>
              
              <div className="space-y-3">
                {groups.map((group, index) => (
                  <div 
                    key={index}
                    className="glass rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold group-hover:text-primary transition-colors">{group.name}</div>
                        <div className="text-sm text-muted-foreground">{group.members.toLocaleString()} membres</div>
                      </div>
                    </div>
                    {group.active && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-xs text-muted-foreground">Actif</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Community Features */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-semibold mb-4">Fonctionnalités Communauté</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageCircle, label: "Chat en Direct" },
                  { icon: Share2, label: "Partage de Stratégies" },
                  { icon: Trophy, label: "Compétitions" },
                  { icon: Star, label: "Mentoring Expert" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <feature.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="hero" className="w-full">
              Rejoindre la Communauté
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
