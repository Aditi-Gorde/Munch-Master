import React, { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import './App.css'; 
function App() {
  const [selectedGridSize, setSelectedGridSize] = useState(null);

  const handleGridSizeSelect = (size) => {
    setSelectedGridSize(size);
  };
  return (
  <div>
  {!selectedGridSize ? (
    <Home onSelectGridSize={handleGridSizeSelect} />
  ) : (
    <Game rows={selectedGridSize.rows} columns={selectedGridSize.columns} />
  )}
</div>
  );
}

export default App;
