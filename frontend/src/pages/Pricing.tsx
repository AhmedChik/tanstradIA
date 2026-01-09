import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Zap, Crown, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ThemeToggle';
import { toast } from 'sonner';

interface Plan {
  id: number;
  name: string;
  price: number;
  balance: number;
  icon: React.ElementType;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 1,
    name: 'Starter',
    price: 200,
    balance: 5000,
    icon: Zap,
    features: [
      'Solde virtuel de 5 000$',
      'Objectif de profit: 10%',
      'Perte max journalière: 5%',
      'Perte max totale: 10%',
      'Durée: 30 jours',
      'Support par email',
    ],
  },
  {
    id: 2,
    name: 'Pro',
    price: 500,
    balance: 15000,
    icon: Crown,
    popular: true,
    features: [
      'Solde virtuel de 15 000$',
      'Objectif de profit: 10%',
      'Perte max journalière: 5%',
      'Perte max totale: 10%',
      'Durée: 45 jours',
      'Signaux IA premium',
      'Support prioritaire',
    ],
  },
  {
    id: 3,
    name: 'Elite',
    price: 1000,
    balance: 50000,
    icon: Rocket,
    features: [
      'Solde virtuel de 50 000$',
      'Objectif de profit: 10%',
      'Perte max journalière: 5%',
      'Perte max totale: 10%',
      'Durée: 60 jours',
      'Signaux IA premium',
      'Coaching personnalisé',
      'Support VIP 24/7',
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleSelectPlan = (planId: number) => {
    setSelectedPlan(planId);
    toast.success('Plan sélectionné! Redirection vers le paiement...');
    navigate(`/checkout/${planId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-button">
              <span className="text-xl font-bold text-background">T</span>
            </div>
            <span className="text-xl font-bold text-foreground">TradeSense</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline">Se connecter</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Challenges Trading
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choisissez votre <span className="text-gradient">Challenge</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prouvez vos compétences de trading et accédez à un financement. 
            Atteignez l'objectif de profit pour devenir un trader financé.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative glass rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-background">
                    Plus populaire
                  </Badge>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.popular ? 'bg-gradient-primary' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${plan.popular ? 'text-background' : 'text-primary'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">Challenge</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">DH</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Solde: ${plan.balance.toLocaleString()}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-primary text-background hover:opacity-90'
                      : 'bg-card hover:bg-card/80'
                  }`}
                >
                  Commencer le Challenge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Comment fonctionne le challenge?',
                a: 'Vous tradez avec un capital virtuel. Si vous atteignez 10% de profit sans dépasser les limites de perte, vous êtes financé.',
              },
              {
                q: 'Quelles sont les règles de perte?',
                a: 'Perte max journalière: 5% du solde du jour. Perte max totale: 10% du capital initial.',
              },
              {
                q: 'Que se passe-t-il si je réussis?',
                a: 'Vous accédez à un compte financé réel avec partage des profits 80/20 en votre faveur.',
              },
            ].map((faq, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TradeSense. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
