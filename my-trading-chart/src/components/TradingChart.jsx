import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import PropTypes from 'prop-types';

const TradingChart = ({ symbol, interval, marketType }) => { // Props changed here
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const smaSeriesRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const klinesResponse = await fetch(`/api/klines/${symbol}?interval=${interval}&market_type=${marketType}`);
      if (!klinesResponse.ok) {
        throw new Error(`Erro HTTP ao buscar velas: ${klinesResponse.status}`);
      }
      const klinesJson = await klinesResponse.json();
      const formattedKlines = klinesJson.data.map(c => ({
        time: Math.floor(c.timestamp / 1000),
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }));

      const smaResponse = await fetch(`/api/indicators/${symbol}?type=SMA&period=20&interval=${interval}`);
      if (!smaResponse.ok) {
        throw new Error(`Erro HTTP ao buscar SMA: ${smaResponse.status}`);
      }
      const smaJson = await smaResponse.json();
      const formattedSma = smaJson.values.map(s => ({
        time: Math.floor(s.timestamp / 1000),
        value: s.value,
      }));

      if (candlestickSeriesRef.current && smaSeriesRef.current) {
        candlestickSeriesRef.current.setData(formattedKlines);
        smaSeriesRef.current.setData(formattedSma);
      } else {
        console.log("Dados de velas:", formattedKlines); // Will be set after chart init
        console.log("Dados de SMA:", formattedSma); // Will be set after chart init
      }

    } catch (err) {
      console.error("Erro ao buscar dados do backend:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [symbol, interval, marketType]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: {
        backgroundColor: '#1E2026',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: { color: 'rgba(70, 70, 70, 0.3)' },
        horzLines: { color: 'rgba(70, 70, 70, 0.3)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      },
      handleScroll: true,
      handleScale: true,
    });
    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4CAF50',
      downColor: '#EF5350',
      borderDownColor: '#EF5350',
      borderUpColor: '#4CAF50',
      wickDownColor: '#EF5350',
      wickUpColor: '#4CAF50',
    });
    candlestickSeriesRef.current = candlestickSeries;

    const smaSeries = chart.addLineSeries({
      color: '#2196F3',
      lineWidth: 2,
      priceLineVisible: false,
      title: 'SMA(20)'
    });
    smaSeriesRef.current = smaSeries;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    fetchData(); // Initial data fetch

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
        smaSeriesRef.current = null;
      }
    };
  }, [fetchData]); // fetchData is a dependency

  useEffect(() => {
    if (!isLoading && !error && chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Carregando dados do gráfico...</div>;
  }
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Erro ao carregar o gráfico: {error}</div>;
  }
  return (
    <div
      ref={chartContainerRef}
      style={{ width: '100%', height: '600px' }}
    />
  );
};

// PropTypes are updated for the new props
TradingChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  marketType: PropTypes.string.isRequired,
};

export default TradingChart;
