import React from 'react';
import TradingChart from './components/TradingChart';

function App() {
  return (
    <div>
      <header>
        <h1>Trading App</h1>
      </header>
      <main>
        <TradingChart
          symbol="BTCUSDT"
          interval="1h"
          marketType="spot"
        />
      </main>
    </div>
  );
}

export default App;
