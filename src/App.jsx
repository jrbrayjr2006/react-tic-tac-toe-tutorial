import Player from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinatons";
import { GameOver } from "./components/GameOver";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function checkWinner(gameTurns, gameBoard, players) {
  let winner = null;
  for( const combination of WINNING_COMBINATIONS ) {
    const [first, second, third] = combination;
    const firstTurn = gameTurns.find((turn) => turn.square.row === first.row && turn.square.col === first.col);
    const secondTurn = gameTurns.find((turn) => turn.square.row === second.row && turn.square.col === second.col);
    const thirdTurn = gameTurns.find((turn) => turn.square.row === third.row && turn.square.col === third.col);
    console.log("checking for winner");

    if( firstTurn && secondTurn && thirdTurn ) {
      if( firstTurn.player === secondTurn.player && secondTurn.player === thirdTurn.player ) {
        players.map((player) => {
          console.log("player", player);
          if( player[firstTurn.player] ) {
            winner = player[firstTurn.player];
          }
        });
        if( winner ) {
          console.log("winner", winner);
        }
        break;
      }
    }
  }

  return winner;
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if( gameTurns.length > 0 && gameTurns[0].player === 'X' ) {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState([
    {"X": "Player 1"},
    {"O": "Player 2"}
  ]);
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  let winner = null;

  for( const turn of gameTurns ) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  const activePlayer = derivedActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    console.info("handleSelectSquare");

    setGameTurns((prevGameTurns) => {
      let currentPlayer = derivedActivePlayer(prevGameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, 
        ...prevGameTurns
      ];
      // winner = checkWinner(updatedTurns);
      console.log("winner", winner);
      return updatedTurns;
    });
  }

  winner = checkWinner(gameTurns, gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestartGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerIndex, newName) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[playerIndex] = newName;
      return updatedPlayers;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player player={{ name: "Player 1", symbol: "X" }} onEdit={() => {console.info("clicked")}} isActive={ activePlayer === 'X' } onChangeName={handlePlayerNameChange} />
          <Player player={{ name: "Player 2", symbol: "O" }} onEdit={() => {}} isActive={ activePlayer === 'O' } onChangeName={handlePlayerNameChange} />
        </ol>
        { (winner || hasDraw) && <GameOver winner={ winner } onRestart={handleRestartGame}  /> }
        <p>It's { activePlayer }'s turn</p>
        <GameBoard onSelectSquare={ handleSelectSquare } board={ gameBoard } />
      </div>
      <Log turns={ gameTurns } />
    </main>
  )
}

export default App
