import React from "react";

import { Home, Workout } from "../pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/workouts" element={<Workout />} />
      </Routes>
    </BrowserRouter>
  );
}
