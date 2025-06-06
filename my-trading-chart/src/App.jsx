import React from 'react';
import TradingChart from './components/TradingChart'; // Verifique o caminho se necessário

function App() {
  return (
    <div style={{
      backgroundColor: '#131722', // Fundo escuro para simular ambiente de trading
      minHeight: '100vh', // Ocupa a altura total da tela
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>Meu Gráfico de Trading</h1>
      {/* Passe os parâmetros para o gráfico (símbolo, intervalo, tipo de mercado) */}
      <TradingChart symbol="BTCUSDT" interval="1h" marketType="spot" />
    </div>
  );
}

export default App;
