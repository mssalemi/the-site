import React, { useState } from "react";

import {
  Container,
  FormControl,
  FormHelperText,
  Button,
  Input,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
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

      {oneRepMax > 0 && <OneRepMaxDisplay oneRepMax={oneRepMax} />}
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

function calculateWeightForReps(oneRepMax: number, reps: number): number {
  const repMaxPercentages: number[] = [
    100, 97, 94, 92, 89, 86, 83, 81, 78, 75, 73, 71, 70, 68, 67, 65, 64, 63, 61,
    60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
  ];

  if (reps < 1 || reps > 30) {
    throw new Error("Reps must be between 1 and 30");
  }

  if (oneRepMax <= 0) {
    throw new Error("One-rep max must be greater than 0");
  }

  const index = reps - 1;
  const percentage = repMaxPercentages[index];

  return (percentage / 100) * oneRepMax;
}

function OneRepMaxTable({ oneRepMax }: { oneRepMax: number }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "reps", label: "Reps", minWidth: 20, code: "reps" },
    {
      id: "percentage",
      label: "Percentage of 1RM",
      minWidth: 20,
      code: "percentage",
    },
    { id: "weight", label: "Weight", minWidth: 20, code: "weight" },
  ];

  const rows: {
    [key: string]: number;
  }[] = [
    { reps: 1, percentage: 100 },
    { reps: 2, percentage: 97 },
    { reps: 3, percentage: 94 },
    { reps: 4, percentage: 92 },
    { reps: 5, percentage: 89 },
    { reps: 6, percentage: 86 },
    { reps: 7, percentage: 83 },
    { reps: 8, percentage: 81 },
    { reps: 9, percentage: 78 },
    { reps: 10, percentage: 75 },
    { reps: 11, percentage: 73 },
    { reps: 12, percentage: 71 },
    { reps: 13, percentage: 70 },
    { reps: 14, percentage: 68 },
    { reps: 15, percentage: 67 },
  ];

  return (
    <>
      <h2>1 Rep Max Table</h2>
      <TableContainer sx={{ maxHeight: 250 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={"center"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.reps}>
                    {columns.map((column) => {
                      console.log("columns", column.code);
                      console.log("row", row[column.code]);

                      return (
                        <TableCell key={column.id} align={"center"}>
                          {column.code === "weight" ? (
                            Math.round((row.percentage / 100) * oneRepMax)
                          ) : (
                            <>{row[column.code]}</>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

const OneRepMaxDisplay = ({ oneRepMax }: { oneRepMax: number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          alignSelf: "center",
          paddingTop: "1rem",
        }}
        variant="subtitle1"
        color="text.primary"
        component="div"
      >
        Your one rep max is{" "}
        <Typography
          sx={{
            fontWeight: 500,
          }}
          component={"span"}
        >
          {Math.round(oneRepMax)}
        </Typography>
      </Typography>
      <OneRepMaxTable oneRepMax={Math.round(oneRepMax)} />
    </Box>
  );
};
