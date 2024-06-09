import Player from "./components/Player"
import { GameBoard } from "./components/GameBoard"

function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player player={{ name: "Player 1", symbol: "X" }} onEdit={() => {console.info("clicked")}} />
          <Player player={{ name: "Player 2", symbol: "O" }} onEdit={() => {}} />
        </ol>
        <GameBoard />
      </div>
      LOG
    </main>
  )
}

export default App
