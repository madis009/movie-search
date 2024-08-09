import React from "react";
import { createRoot } from "react-dom/client";
import MovieSearchPage from "./pages/MovieSearchPage/MovieSearchPage";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MovieSearchPage />);
