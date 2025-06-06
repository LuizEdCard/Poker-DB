import React from 'react';
import ChartComponent from './components/ChartComponent';
import './App.css'; // Assuming you have some basic styles

function App() {
  // Sample candlestick data
  const sampleData = [
    { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
    { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
    { time: '2018-10-23', open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
    { time: '2018-10-24', open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
    { time: '2018-10-25', open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
    { time: '2018-10-26', open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
    { time: '2018-10-29', open: 173.74, high: 175.99, low: 170.95, close: 173.29 },
    { time: '2018-10-30', open: 173.16, high: 173.70, low: 169.88, close: 172.64 },
    { time: '2018-10-31', open: 174.62, high: 176.89, low: 173.00, close: 176.24 },
    { time: '2018-11-01', open: 176.84, high: 180.26, low: 175.90, close: 179.66 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading App</h1>
      </header>
      <main>
        <ChartComponent data={sampleData} />
      </main>
    </div>
  );
}

export default App;
