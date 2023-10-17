import React, { useState } from "react";

import {
  Card,
  CardActions,
  Typography,
  CardContent,
  Button,
  Stack,
  Box,
  Paper,
  Modal,
  Fade,
  Backdrop,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AddIcon from "@mui/icons-material/Add";

import Grid from "@mui/material/Unstable_Grid2";

import { Exercise } from "../Workout";

interface Props {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const exercises: Exercise[] = [
  {
    name: "Bench",
    oneRepMax: 225,
  },
  {
    name: "Front Squat",
    oneRepMax: 225,
  },
  {
    name: "Ohp",
    oneRepMax: 225,
  },
  {
    name: "Pull Up",
    oneRepMax: 225,
  },
];

function OneRepMaxDisplay({}: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Add Lifts
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Add your latest lift. Add the reps and sets you completed.
            </Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormControl>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  type="number"
                />
                <FormHelperText id="my-helper-text">
                  Reps Completed
                </FormHelperText>
              </FormControl>
              <FormControl>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  type="number"
                />
                <FormHelperText id="my-helper-text">
                  Sets Completed
                </FormHelperText>
              </FormControl>

              <Button
                color="secondary"
                variant="contained"
                type="submit"
                onClick={handleClose}
              >
                Add Lift
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Grid container spacing={2}>
        <Stack justifyContent="center" direction="row" spacing={2}>
          {exercises.map(({ name, oneRepMax }) => {
            return (
              <Grid xs={2}>
                <Card>
                  <Grid container sx={{ padding: "16px 16px 0 16px" }}>
                    <Grid xs={12}>
                      <Typography variant="body1" component="div">
                        {name}
                      </Typography>
                    </Grid>
                    <Grid xs={12} textAlign={"center"}>
                      <Typography variant="h4">{oneRepMax}</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Button>
                        <ArrowCircleUpIcon color="success" />
                      </Button>
                    </Grid>
                    <Grid xs={6}>
                      <Button onClick={handleOpen}>
                        <AddIcon color="info" />
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Stack>
      </Grid>
    </>
  );
}

export default OneRepMaxDisplay;
