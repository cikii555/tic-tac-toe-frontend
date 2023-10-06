import React, { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
const Wait = (props) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  async function handleClickCopyText(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(props.newGameId);
    }
  }
  const handleChange = (event) => {
    setTextFieldValue(event.target.value);
    console.log(textFieldValue);
  };
  const handleCopyClick = () => {
    handleClickCopyText(textFieldValue)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" className="wait-message">
        Waiting for player to connect...
      </Typography>

      <Typography variant="h5" className="copy-message">
        Give your friend the following room id to connect
      </Typography>

      <TextField
        variant="outlined"
        fullWidth
        label="gameId"
        name="username"
        onChange={handleChange}
        value={props.newGameId}
        required
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        type="submit"
        style={{ marginTop: "1rem" }}
        onClick={handleCopyClick}
      >
        Copy
      </Button>
    </Container>
  );
};

export default Wait;
