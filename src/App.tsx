import React from "react";
import AppRoutes from "./routes/AppRoutes";

import { Link, Box, Tab, Tabs } from "@mui/material";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          padding: "16px",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Link href="/">
              <Tab label="OneRepMax" />
            </Link>

            <Link href="/workouts">
              <Tab label="Workouts" />
            </Link>
          </Tabs>
        </Box>
      </Box>
      <AppRoutes />
    </>
  );
}

export default App;
