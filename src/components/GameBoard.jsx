import React, { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        console.info("handleSelectSquare");
        setGameBoard((prevGameBoard) => {
            const newGameBoard = [...prevGameBoard];
            newGameBoard[rowIndex] = [...newGameBoard[rowIndex]];
            newGameBoard[rowIndex][colIndex] = 'X';
            return newGameBoard;
        });
    }

    return (
        <ol id="game-board">
            {/* {initialGameBoard.map((cell, rowIndex) => <li key={rowIndex} className="cell">{cell}</li>)} */}
            {
                gameBoard.map((row, rowIndex) => 
                <li key={rowIndex} className="row">
                    <ol>
                        {
                            row.map((playerSymbol, colIndex) => 
                            <li key={colIndex} className="cell">
                                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>)
                        }
                    </ol>
                </li>)
            }
        </ol>
    );
}