// GridSizeSelector.js
import React, { useState } from 'react';
import '/src/assests/Home.style.css'

const Home = ({ onSelectGridSize }) => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSelectChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSize) {
      const [rows, columns] = selectedSize.split('x').map(Number);
      onSelectGridSize({ rows, columns });
    }
  };

  return (
    <div className='homediv'>
        <div className='content-div'>
        <h1>Welcome to Munch Master</h1>
      <h2>Select Grid Size to start the game!!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="4x6"
            checked={selectedSize === '4x6'}
            onChange={handleSelectChange}
          />
          <strong>4x6</strong>
        </label>
        <label>
          <input
            type="radio"
            value="5x7"
            checked={selectedSize === '5x7'}
            onChange={handleSelectChange}
          />
          <strong>5x7</strong>
        </label>
        <label>
          <input
            type="radio"
            value="6x8"
            checked={selectedSize === '6x8'}
            onChange={handleSelectChange}
          />
          <strong>6x8</strong>
        </label>
        
        <button type="submit">Start Game</button>
      </form>
        </div>
    </div>
  );
};

export default Home;
