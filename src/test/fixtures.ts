import type { Property } from "@/types/property";

/** Test-only unit records. All values are fictional. */
export const makeUnit = (overrides: Partial<Property> = {}): Property => ({
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
  elevator_access: "Y",
  kitchen_accessible: "N",
  income_restricted: "N",
  occupied: "N",
  special_features: "Lowered light switches",
  contact_name: "Test Contact",
  email: "leasing@example.com",
  phone: "555-0100",
  ...overrides,
});
