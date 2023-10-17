import React, { useState } from "react";

import {
  Container,
  FormControl,
  FormHelperText,
  Button,
  Input,
  Stack,
  Typography,
} from "@mui/material";

export function OneRepMax() {
  const [oneRepMax, setOneRepMax] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const weight = parseInt(data.get("weight") as string) || 0;
    const reps = parseInt(data.get("reps") as string) || 0;
    const oneRepMax = calculateOneRepMax(weight, reps);

    setOneRepMax(oneRepMax);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        One Rep Max Calculator
      </Typography>
      <Typography variant="body2" gutterBottom>
        {DESC}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl>
            <Input
              id="weight"
              name="weight"
              aria-describedby="my-helper-text"
              type="number"
            />
            <FormHelperText id="my-helper-text">Weight Lifted</FormHelperText>
          </FormControl>
          <FormControl>
            <Input
              id="reps"
              name="reps"
              aria-describedby="my-helper-text"
              type="number"
            />
            <FormHelperText id="my-helper-text">Reps Completed</FormHelperText>
          </FormControl>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => console.log("noop")}
          >
            Calculate Max
          </Button>
        </Stack>
      </form>

      <div>Your one rep max is {Math.round(oneRepMax)}</div>
    </Container>
  );
}

const DESC =
  "Our One Rep Max (1RM) Online Calculator is your ultimate fitness companion. Whether you're a seasoned weightlifter or just starting your strength journey, this tool helps you determine your maximum lifting capacity with ease. Simply input your weight and the amount of weight you've lifted, and our calculator will provide you with your estimated one-rep max.";

function calculateOneRepMax(weight: number, reps: number): number {
  const repMaxPercentages: number[] = [
    100, 97, 94, 92, 89, 86, 83, 81, 78, 75, 73, 71, 70, 68, 67, 65, 64, 63, 61,
    60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
  ];

  if (reps < 1 || reps > 30) {
    throw new Error("Reps must be between 1 and 30");
  }

  if (weight <= 0) {
    throw new Error("Weight must be greater than 0");
  }

  const index = reps - 1;
  const percentage = repMaxPercentages[index];

  return weight / (percentage / 100);
}
