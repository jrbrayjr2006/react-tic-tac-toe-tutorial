import Player from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if( gameTurns.length > 0 && gameTurns[0].player === 'X' ) {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    console.info("handleSelectSquare");

    setGameTurns((prevGameTurns) => {
      let currentPlayer = derivedActivePlayer(prevGameTurns);
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
      <Log turns={ gameTurns } />
    </main>
  )
}

export default App
