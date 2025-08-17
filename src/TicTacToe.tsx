import { useState } from 'react'

const generateWinningPatterns = (boardSize: number) => {
    const topRow = Array.from({ length: boardSize }, (_, idx) => idx);
    let patterns = []

    for (let i = 0; i < boardSize; i++) {
        patterns.push(topRow.map(item => item + (i * boardSize))) // horizontals
        patterns.push(topRow.map(item => i + (item * boardSize))) // verticals
    }

    patterns.push(topRow.map(item => item * (boardSize - 1))) // left diagonal
    patterns.push(topRow.map(item => (item + 1) * (boardSize - 1))) // right diagonal

    return patterns
}

export default function TicTacToe() {
    
    const [winner, setWinner] = useState<string | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<string>('X')
    const [boardSize, setBoardSize] = useState<number>(3)

    const [grid, setGrid] = useState<(string | null)[][]>(
            Array.from({ length: boardSize }, () => Array(boardSize).fill(null))
        );

    const winningPatterns = generateWinningPatterns(boardSize)

    const checkWinner = (currentGrid: (string | null)[][]) => {
        const flatGrid = currentGrid.flat()
        for (let pattern of winningPatterns) {
            const first = flatGrid[pattern[0]]
            if (first && pattern.every(idx => flatGrid[idx] === first)) {
                return first
            }
        }

        return null
    }

    const resetGame = () => {
        setGrid(Array.from({ length: boardSize }, () => Array(boardSize).fill(null)));
        setCurrentPlayer('X');
        setWinner(null);
    }

    const handleClick = (row: number, col: number) => {
        setGrid((prev) => {
            const newGrid = prev.map((r) => [...r])
            if (newGrid[row][col] || winner) return prev

            newGrid[row][col] = currentPlayer
            const isWinner = checkWinner(newGrid)
            if (isWinner) {
                setWinner(isWinner)
            } else {
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
            }
            return newGrid
        })
    }

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div>Set Board Size</div>
            <div>{winner ? `Player ${winner} won!` : `It is ${currentPlayer}'s turn`}</div>
            <div className='ttt-container' style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 128px)`, gap: '4px'}}>
                {
                    grid.map((row, rowIdx) => 
                        row.map((col, colIdx: number) => <button 
                                                            key={`${rowIdx}-${colIdx}`} 
                                                            className='cell' 
                                                            onClick={() => handleClick(rowIdx, colIdx)}
                                                            disabled={!!winner}
                                                        >
                                                            {col}
                                                        </button>))
                }
            </div>
            <div onClick={() => resetGame()}>Reset Game</div>
        </div>
    )
}