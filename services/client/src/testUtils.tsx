import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

export function renderWithRouter(
  ui: React.ReactNode,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(
      <Router location={history.location} navigator={history}>
        {ui}
      </Router>
    ),
  };
}
