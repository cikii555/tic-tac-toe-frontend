import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Wait from "./wait";
import {
  singlePlayerGame,
  multiPlayerGame,
  joinGame,
} from "../services/gameService";

const ENDPOINT = "http://localhost:80";
function Game() {
  const navigate = useNavigate();
  const [gameType, setGameType] = useState("");
  const [gameIdForJoining, setGameIdForJoining] = useState("");
  const [game, setGame] = useState({
    step: 1,
    name: "",
    newGameId: "",
    room: "",
    loading: false,
    serverConfirmed: false,
    error: false,
    errorMessage: "",
    gameType: "",
    gamePhase: "",
  });
  const socket = io(ENDPOINT);
  useEffect(() => {
    //const socket = io(ENDPOINT);

    console.log(game);

    socket.on("game.start", (game) => {
      setGame({ ...game, serverConfirmed: true });
    });
  });
  socket.on("game.start", (game) => {
    setGame({ ...game, serverConfirmed: true });
  });

  const onChoice = (choice) => {
    const gameChoice = choice === "new" ? true : false;
    const newState = { newGame: gameChoice };
    this.setState(newState, () => {
      this.stepForward();
    });
  };

  /* const validate = () => {
    if (this.state.newGame) {
      return !(this.state.name === "");
    } else {
      return !(this.state.name === "") && !(this.state.room === "");
    }
  };*/

  const displayError = (message) => {
    this.setState({ error: true, errorMessage: message, loading: false });
    setTimeout(() => {
      this.setState({ error: false, errorMessage: "" });
    }, 3000);
  };
  const singlePlayerGameCreation = async () => {
    const response = await singlePlayerGame();
    setGame({
      gameType: response.data.type,
      serverConfirmed: true,
      newGameId: response.data._id,
    });
  };
  const multiPlayerGameCreation = async () => {
    try {
      const response = await multiPlayerGame();
      console.log(response.data);
      setGame({
        gameType: response.data.type,
        gamePhase: "CREATE_NEW_MULTIPLAYER",
        newGameId: response.data._id,
      });
      setGameIdForJoining(response.data._id);
      setGameType(response.data.type);
    } catch (err) {
      console.log(err.message);
    }
  };
  const joinCreatedGame = async () => {
    setGame({
      gameType: "MULTI_PLAYER",
      gamePhase: "JOIN_MULTIPLAYER_GAME",
    });
    setGameType("MULTI_PLAYER");
  };
  const handleChange = (event) => {
    setGameIdForJoining(event.target.value);
  };
  const handleButtonClick = async (gameId) => {
    const response = await joinGame(gameId);
  };

  if (game.serverConfirmed && game.gameType == "SINGLE_PLAYER") {
    navigate(`/board?type=${game.gameType}&id=${game.newGameId}`);
  } else if (
    game.gameType == "MULTI_PLAYER" &&
    game.gamePhase === "CREATE_NEW_MULTIPLAYER"
  ) {
    return <Wait newGameId={game.newGameId}></Wait>;
  } else if (
    game.gameType == "MULTI_PLAYER" &&
    game.gamePhase == "JOIN_MULTIPLAYER_GAME"
  ) {
    return (
      <Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Enter your username to join the game
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              name="username"
              value={gameIdForJoining}
              onChange={handleChange}
              required
              style={{ marginBottom: 16 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleButtonClick(gameIdForJoining)}
            >
              Join Game
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  } else if (game.serverConfirmed) {
    navigate(`/board?type=${gameType}&id=${gameIdForJoining}`);
  } else {
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Button
            onClick={singlePlayerGameCreation}
            variant="contained"
            color="secondary"
            sx={{ margin: 1 }}
            style={{ width: "300px" }}
          >
            Singleplayer
          </Button>
          <Button
            onClick={multiPlayerGameCreation}
            variant="contained"
            color="secondary"
            style={{ width: "300px" }}
            sx={{ margin: 1 }}
          >
            Multiplayer
          </Button>
          <Button
            onClick={joinCreatedGame}
            variant="contained"
            color="secondary"
            style={{ width: "300px" }}
            sx={{ margin: 1 }}
          >
            Join Game
          </Button>
        </Box>
      </div>
    );
  }
}

export default Game;
