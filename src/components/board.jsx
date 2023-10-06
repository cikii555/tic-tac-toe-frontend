import React, { Component, useEffect, useState } from "react";
import { io } from "socket.io-client";
import qs from "qs";

const ENDPOINT = "http://localhost:80";
function Board() {
  const [game, setGame] = useState({
    step: 1,
    name: "",
    newGameId: "",
    room: "",
    symbol: "O",
    loading: false,
    serverConfirmed: false,
    error: false,
    errorMessage: "",
    gameType: "",
    gamePhase: "",
    board: Array(9).fill(" "),
  });
  const [board, setBoard] = useState(Array(9).fill(" "));
  const [isXNext, setIsXNext] = useState(true);
  const socket = io(ENDPOINT);
  const handleClick = (index, row, col) => {
    const { type, id } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (type === "SINGLE_PLAYER") {
      if (game.board[index]) {
        return;
      }

      const newBoard = [...game.board];
      newBoard[index] = "X";
      setGame({ board: newBoard });
      setIsXNext(!isXNext);

      socket.emit("make.move", {
        gameId: id,
        type: type,
        row,
        col,
      });
    } else {
      const newBoard = [...game.board];
      newBoard[index] = isXNext ? "X" : "O";

      setGame({ board: newBoard });
      setIsXNext(!isXNext);

      socket.emit("make.move", {
        gameId: id,
        type: type,
        row,
        col,
      });
    }
  };

  const renderSquare = (index, row, col) => {
    return (
      <button className="square" onClick={() => handleClick(index, row, col)}>
        {game.board[index]}
      </button>
    );
  };

  useEffect(() => {
    console.log(game);
    const { type, id } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    socket.emit("make.it.work", { id: id });
    socket.on("game.start", (game) => {});
    socket.on("move.made", ({ dashboard, gameId }) => {
      setGame({ board: dashboard.flat() });
      //setMessage();
    });
    socket.on("x_win", ({ dashboard }) => {
      //handleWin;
    });
    socket.on("o_win", ({ dashboard }) => {
      //handleWin;
    });
    socket.on("tie", ({ gameState }) => handleDraw(gameState));

    /* socket.on("restart", ({ gameState, turn }) =>
      //handleRestart(gameState, turn)
    );*/
  });

  const handleWin = (id, gameState) => {
    setBoard(gameState);
    if (this.socketID === id) {
      const playerScore = this.state.currentPlayerScore + 1;
      this.setState({
        currentPlayerScore: playerScore,
        statusMessage: "You Win",
      });
    } else {
      const opponentScore = this.state.opponentPlayer[1] + 1;
      const opponent = this.state.opponentPlayer;
      opponent[1] = opponentScore;
      this.setState({
        opponentPlayer: opponent,
        statusMessage: `${this.state.opponentPlayer[0]} Wins`,
      });
    }
    this.setState({ end: true });
  };

  const handleDraw = (gameState) => {
    setBoard(gameState);
    setGame({ end: true, statusMessage: "Draw" });
  };

  const handleRestart = (gameState, turn) => {
    setBoard(gameState);
    setTurn(turn);
    setMessage();
    setGame({ end: false });
  };

  const setMessage = () => {
    const message = this.state.turn
      ? "Your Turn"
      : `${this.state.opponentPlayer[0]}'s Turn`;
    setGame({ statusMessage: message });
  };

  const setTurn = (turn) => {
    if (this.state.piece === turn) {
      setGame({ turn: true });
    } else {
      setGame({ turn: false });
    }
  };

  return (
    <div>
      <div className="board">
        {renderSquare(0, 0, 0)}
        {renderSquare(1, 0, 1)}
        {renderSquare(2, 0, 2)}
        {renderSquare(3, 1, 0)}
        {renderSquare(4, 1, 1)}
        {renderSquare(5, 1, 2)}
        {renderSquare(6, 2, 0)}
        {renderSquare(7, 2, 1)}
        {renderSquare(8, 2, 2)}
      </div>
      <div></div>
    </div>
  );
}

export default Board;
