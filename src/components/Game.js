// Game.js
import React, { useState, useEffect } from 'react';
import '../assests/Game.style.css'

const Game = ({ rows, columns }) => {
  const [characterPosition, setCharacterPosition] = useState({ row: 0, column: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [dots, setDots] = useState([{ row: 0, column: 0 }]);
  const [gameOver, setGameOver] = useState(false);
  const [moves,setMoves] = useState(0);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const imageUrl = `${process.env.PUBLIC_URL}/super-mario.png`;
  const imageUrl2 = `${process.env.PUBLIC_URL}/mushroom.png`;
  const eating = `${process.env.PUBLIC_URL}/eating.mp3`;
  const swoop1 = `${process.env.PUBLIC_URL}/swoop1.mp3`;

  const audio = new Audio(swoop1);
  const eat = new Audio(eating);

  

  const handleClick = () => {
    if(isPanelOpen)
    setPanelOpen(false);
  }

  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  const dotCount = Math.floor((rows*columns)/4);

  const containerStyle = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, 60px)`,
    gridTemplateColumns: `repeat(${columns}, 60px)`,
    /* grid-template-columns: repeat(var(--columns, 6), 80px); */
    gap: '5px',
    border: '2px solid rgb(234, 150, 150)',
    padding: '2px',

  };
  

  useEffect(() => {
   
      generateRandomDots();
    
  }, [dotCount]);


  const generateRandomDots = () => {
    const newDots = [];
    const initialCharacterPosition = {...characterPosition}; 
    const generatedCoordinates = new Set();
    generatedCoordinates.add(`${initialCharacterPosition.row},${initialCharacterPosition.column}`);

    for (let i = 0; i < dotCount; i++) {
      let randomRow, randomColumn;
  
      do {
        randomRow = Math.floor(Math.random() * rows);
        randomColumn = Math.floor(Math.random() * columns);
      } while (
       ( Math.abs(randomRow - initialCharacterPosition.row) < 2 &&
         Math.abs(randomColumn - initialCharacterPosition.column) < 2
        ) ||
        generatedCoordinates.has(`${randomRow},${randomColumn}`) 
      );
  
      newDots.push({ row: randomRow, column: randomColumn });
      
      generatedCoordinates.add(`${randomRow},${randomColumn}`);
      generatedCoordinates.forEach(value => {

        console.log('set value : '+value);
      });
    }
    console.log("end");
    setDots(newDots);
    setGameOver(false);
  };
  

  const handleKeyDown = (e) => {
    if (!gameStarted || gameOver) {
    // If the game hasn't started or is over, do not update the character position
    return;
  }
    if (gameOver) return; 

    switch (e.key) {
      case 'ArrowUp':
        setCharacterPosition((prev) => ({ ...prev, row: Math.max(prev.row - 1, 0) }));
        audio.play();
        setMoves(moves+1);
        break;
      case 'ArrowDown':
        setCharacterPosition((prev) => ({ ...prev, row: Math.min(prev.row + 1, rows - 1) }));
        audio.play();
        setMoves(moves+1);
        break;
      case 'ArrowLeft':
        setCharacterPosition((prev) => ({ ...prev, column: Math.max(prev.column - 1, 0) }));
        audio.play();
        setMoves(moves+1);
        break;
      case 'ArrowRight':
        setCharacterPosition((prev) => ({ ...prev, column: Math.min(prev.column + 1, columns - 1) }));
        audio.play();
        setMoves(moves+1);
        break;
      case 'Escape' :
        setPanelOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (dots.length === 0 && moves > 0  &&  !gameOver ) {
        setTimeout(() => {
        alert('Congratulations! You have eaten all the dots. Game Over! You Finished the game in ' +moves+ ' moves');
        setGameOver(true);
        setMoves(0);
        setCharacterPosition({ row: 0, column: 0 });
          }, 5);
     
    }
  }, [dots, gameOver]);

  useEffect(() => {

    const updatedDots = dots.filter(
      (dot) => dot.row !== characterPosition.row || dot.column !== characterPosition.column
    );
    if (updatedDots.length < dots.length && moves>1) {
      eat.play();
    }
    setDots(updatedDots);
   
  }, [characterPosition]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      handleKeyDown(e);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyDown]);

  

  return (
   <div className='gameDiv' onClick={handleClick}>
    <h1 style={{color:'#b59595'}}>Munch Master</h1>
    <p style={{color:'#b59595'}}>Number of moves : {moves}</p>
     <div className="game">
   <div className="grid" style={containerStyle}>
        {Array.from({ length: rows * columns }).map((_, index) => {
          const isDot = dots.some((dot) => dot.row * columns + dot.column === index);
          const isCharacter =
            characterPosition.row * columns + characterPosition.column === index;

          return (
            <div
            key={index}
            className="grid-cell"
          >
            {isDot && <img src={imageUrl2} alt="Dot" className='dot'/>}
            
            {isCharacter && <img src={imageUrl} alt="Character" style={{width:'60px',height:'60px'}}  />}
          </div>
          
          );
        })}
   </div>
      
      <div className='btnDiv'> 
      <button onClick={() => {
  setGameStarted(true);
  generateRandomDots();
}}>Start Game</button>
      <button className='spbutton' onClick={togglePanel}>Rules</button>
      <div className={`side-panel ${isPanelOpen ? 'open' : ''}`}>
        <h2>Rules for the game</h2>
        <p>Press start in order to start the game.</p> 
        <p>Guide the player using the arrow keys to navigate towards and consume the scattered dots across the grid.</p>
        <img src="https://static.vecteezy.com/system/resources/previews/006/059/930/original/pc-keyboard-arrow-keys-linear-icon-isolated-on-white-background-free-vector.jpg" alt="arrow keys" className='rules_img' />
        <p>Upon successfully consuming all the dots, the game concludes.</p>
        <button onClick={togglePanel}>Close</button>
    </div> 
      </div>
    </div>
   </div>
  );
};

export default Game;
