import Player from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex) {
    console.info("handleSelectSquare");
    setActivePlayer((prevActivePlayer) => {
      return prevActivePlayer === 'X' ? 'O' : 'X';
    });
    setGameTurns((prevGameTurns) => {
      let currentPlayer = 'X';
      if( prevGameTurns.length > 0 && prevGameTurns[0].player === 'X' ) {
        currentPlayer = 'O';
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, 
        ...prevGameTurns
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player player={{ name: "Player 1", symbol: "X" }} onEdit={() => {console.info("clicked")}} isActive={ activePlayer === 'X' } />
          <Player player={{ name: "Player 2", symbol: "O" }} onEdit={() => {}} isActive={ activePlayer === 'O' } />
        </ol>
        <GameBoard onSelectSquare={ handleSelectSquare } turns={ gameTurns } />
      </div>
      <Log />
    </main>
  )
}

export default App
