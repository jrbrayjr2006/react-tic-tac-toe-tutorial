function Log({ turns }) {
  return (
    <ol id="log" className="highlight-player">
      {turns.map((turn, index) => <li key={`${turn.square.row}${turn.square.col}`}>{ turn.player } selected { turn.square.row }, { turn.square.col }</li>)};
    </ol>
  )
}

export default Log;