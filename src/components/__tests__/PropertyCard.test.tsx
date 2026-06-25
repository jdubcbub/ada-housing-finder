import { render, screen } from "@testing-library/react";
import PropertyCard from "../PropertyCard";

const property = {
  id: "1",
  building_name: "Maple Court",
  address: "123 Main St",
  unit_number: "2B",
  neighborhood: "Capitol Hill",
  square_feet: 750,
  bedrooms: 1,
  bathrooms: 1,
  rent: 1895,
  date_of_availability: "2026-01-01",
  wheelchair_width_doors: "Y",
  roll_in_shower: "Y",
  grab_bars: "N",
};

test("renders property details", () => {
  render(<PropertyCard {...property} />);

  expect(screen.getByText(/Maple Court/i)).toBeInTheDocument();
  expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
  expect(screen.getByText(/Capitol Hill/i)).toBeInTheDocument();
});
