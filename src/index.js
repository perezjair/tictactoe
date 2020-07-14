import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  return (
    <div className="board">
      {props.squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => props.onClick(i)} />
      ))}
    </div>
  );
}

function Game(props) {
  const [history, setHistory] = React.useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setxIsNext] = React.useState(true);
  const [stepNumber, setStepNumber] = React.useState(0);

  function handleClick(i) {
    const handleHistory = history.slice(0, stepNumber + 1);
    const current = handleHistory[handleHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      handleHistory.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNumber(handleHistory.length);
    setxIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setxIsNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Move # ' + move : 'Start';
    return (
      <button key={move} onClick={() => jumpTo(move)}>
        {desc}
      </button>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <p>{status}</p>
        <div className="game-history">
          <p>History:</p>
          {moves}
        </div>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
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