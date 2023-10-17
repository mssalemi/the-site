import React, { useState } from "react";
import { WorkoutList, WorkoutBuilder } from "./components";
import OneRepMaxDisplay from "./components/OneRepMaxDisplay";

import { Stack } from "@mui/material";

export function Workout() {
  return (
    <>
      <Stack alignItems={"center"}>
        <OneRepMaxDisplay />
        <WorkoutBuilder />
        <WorkoutList />
      </Stack>
    </>
  );
}

export interface Exercise {
  name: string;
  oneRepMax: number;
}
