import { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickData, Time, IChartApi, CandlestickSeries } from 'lightweight-charts';

interface TradingChartProps {
  data: CandlestickData<Time>[];
  symbol: string;
  className?: string;
}

const TradingChart = ({ data, symbol, className = '' }: TradingChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<any>(null);
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'hsl(0 0% 70%)',
      },
      grid: {
        vertLines: { color: 'hsl(240 5% 20%)' },
        horzLines: { color: 'hsl(240 5% 20%)' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'hsl(187 100% 50%)',
          width: 1,
          style: 2,
        },
        horzLine: {
          color: 'hsl(187 100% 50%)',
          width: 1,
          style: 2,
        },
      },
      rightPriceScale: {
        borderColor: 'hsl(240 5% 25%)',
      },
      timeScale: {
        borderColor: 'hsl(240 5% 25%)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: 'hsl(142 76% 45%)',
      downColor: 'hsl(0 72% 51%)',
      borderUpColor: 'hsl(142 76% 45%)',
      borderDownColor: 'hsl(0 72% 51%)',
      wickUpColor: 'hsl(142 76% 45%)',
      wickDownColor: 'hsl(0 72% 51%)',
    });

    candlestickSeriesRef.current = candlestickSeries;

    if (data.length > 0) {
      candlestickSeries.setData(data);
      chart.timeScale().fitContent();
    }

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (candlestickSeriesRef.current && data.length > 0) {
      candlestickSeriesRef.current.setData(data);
      chartRef.current?.timeScale().fitContent();
    }
  }, [data]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-4 left-4 z-10">
        <span className="text-lg font-bold text-foreground">{symbol}</span>
      </div>
      <div ref={chartContainerRef} className="w-full h-full min-h-[400px]" />
    </div>
  );
};

export default TradingChart;
