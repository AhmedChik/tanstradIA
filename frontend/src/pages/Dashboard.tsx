import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CandlestickData, Time } from 'lightweight-charts';
import { Bell, Settings, LogOut, Menu, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import TradingChart from '@/components/trading/TradingChart';
import MarketTicker from '@/components/trading/MarketTicker';
import AISignalsPanel from '@/components/trading/AISignalsPanel';
import TradeExecutionPanel from '@/components/trading/TradeExecutionPanel';
import ChallengeStatusCard from '@/components/trading/ChallengeStatusCard';
import OpenPositions from '@/components/trading/OpenPositions';

// Données simulées pour le développement
const generateCandlestickData = (): CandlestickData<Time>[] => {
  const data: CandlestickData<Time>[] = [];
  let basePrice = 150;
  const now = new Date();
  
  for (let i = 100; i >= 0; i--) {
    const date = new Date(now);
    date.setMinutes(date.getMinutes() - i * 5);
    
    const open = basePrice + (Math.random() - 0.5) * 2;
    const close = open + (Math.random() - 0.5) * 3;
    const high = Math.max(open, close) + Math.random() * 1;
    const low = Math.min(open, close) - Math.random() * 1;
    
    data.push({
      time: Math.floor(date.getTime() / 1000) as Time,
      open,
      high,
      low,
      close,
    });
    
    basePrice = close;
  }
  
  return data;
};

const mockTickers = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.52, change: 2.34, changePercent: 1.32 },
  { symbol: 'BTC-USD', name: 'Bitcoin', price: 43250.00, change: -520.00, changePercent: -1.19 },
  { symbol: 'IAM.CS', name: 'Maroc Telecom', price: 92.50, change: 0.75, changePercent: 0.82 },
  { symbol: 'ATW.CS', name: 'Attijariwafa Bank', price: 485.00, change: -3.20, changePercent: -0.66 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.75, change: 5.60, changePercent: 2.30 },
];

const mockSignals = [
  { id: 1, symbol: 'AAPL', type: 'buy' as const, confidence: 85, price: 178.52, reasoning: 'Momentum haussier confirmé par RSI et MACD', timestamp: new Date().toISOString() },
  { id: 2, symbol: 'BTC-USD', type: 'sell' as const, confidence: 72, price: 43250.00, reasoning: 'Résistance majeure atteinte, divergence baissière', timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: 3, symbol: 'IAM.CS', type: 'hold' as const, confidence: 65, price: 92.50, reasoning: 'Consolidation en cours, attendre confirmation', timestamp: new Date(Date.now() - 600000).toISOString() },
];

const mockPositions = [
  { id: 1, symbol: 'AAPL', action: 'buy' as const, quantity: 10, entryPrice: 175.50, currentPrice: 178.52 },
  { id: 2, symbol: 'BTC-USD', action: 'sell' as const, quantity: 0.5, entryPrice: 44000, currentPrice: 43250 },
];

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [chartData, setChartData] = useState<CandlestickData<Time>[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setChartData(generateCandlestickData());
  }, [selectedSymbol]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setChartData(generateCandlestickData());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const currentTicker = mockTickers.find(t => t.symbol === selectedSymbol) || mockTickers[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold text-background">T</span>
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:block">TradeSense</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className={isRefreshing ? 'animate-spin' : ''}
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Signaux IA */}
        <aside
          className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-80 border-r border-border bg-background transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col">
            <AISignalsPanel signals={mockSignals} />
            <TradeExecutionPanel
              symbol={selectedSymbol}
              currentPrice={currentTicker.price}
              balance={5000}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 lg:p-6 space-y-6">
          {/* Market Tickers */}
          <div className="glass rounded-xl p-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Marchés en direct</h2>
            <MarketTicker
              tickers={mockTickers}
              selectedSymbol={selectedSymbol}
              onSelect={setSelectedSymbol}
            />
          </div>

          {/* Chart */}
          <div className="glass rounded-xl overflow-hidden">
            <TradingChart data={chartData} symbol={selectedSymbol} className="h-[500px]" />
          </div>

          {/* Bottom Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Challenge Status */}
            <ChallengeStatusCard
              status="active"
              initialBalance={5000}
              currentBalance={5250}
              dailyStartBalance={5200}
              maxDailyLoss={5}
              maxTotalLoss={10}
              profitTarget={10}
            />

            {/* Open Positions */}
            <div className="glass rounded-xl">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Positions Ouvertes</h3>
              </div>
              <OpenPositions positions={mockPositions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
