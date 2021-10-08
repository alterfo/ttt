import Square from "./Square";
import {useState} from "react";

export default function Board() {
    const initialSquares = Array(9).fill(null);
    const [squares, setSquares] = useState(initialSquares)
    const [isX, setIsX] = useState(true)

    const winner = calculateWinner();

    function handleClick(i) {
        if (squares[i] || calculateWinner()) return;
        const newValues = [...squares];
        newValues[i] = isX ? 'X' : 'O'
        setSquares(newValues)
        setIsX(!isX);
    }

    function calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    return <div>
        <div className="status">
            { winner ?
                `Победил: ${winner}` :
                `Следующий ход: ${isX ? 'X' : 'O'}`}
        </div>

        <button onClick={() => { setSquares(initialSquares); setIsX(true) }}>Начать заново</button>

        <div className="grid">
            {squares.map((value, i) => {
                return <Square key={i} value={value}
                               onClick={() => {handleClick(i)}} />
            })}
        </div>
    </div>
}