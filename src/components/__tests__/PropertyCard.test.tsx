import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PropertyCard from "../PropertyCard";
import { makeUnit } from "@/test/fixtures";

test("renders property details", () => {
  render(<PropertyCard {...makeUnit()} />, { wrapper: MemoryRouter });

  expect(screen.getByText(/Maple Court/i)).toBeInTheDocument();
  expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
  expect(screen.getByText(/Capitol Hill/i)).toBeInTheDocument();
});
