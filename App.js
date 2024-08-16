import React from 'react';
import { ThemeProvider } from './component/ThemeContext';
import NewsAggregator from './component/NewsAggregator';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <NewsAggregator />
    </ThemeProvider>
  );
}

export default App;
