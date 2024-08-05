

export function GameBoard({ onSelectSquare, board }) {

    return (
        <ol id="game-board">
            {
                board.map((row, rowIndex) => 
                <li key={rowIndex} className="row">
                    <ol>
                        {
                            row.map((playerSymbol, colIndex) => 
                            <li key={colIndex} className="cell">
                                <button onClick={ () => onSelectSquare(rowIndex, colIndex) } disabled={ playerSymbol !== null }>{playerSymbol}</button>
                            </li>)
                        }
                    </ol>
                </li>)
            }
        </ol>
    );
}