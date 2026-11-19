/** One housing unit, as served by the backend at /listings. All current data is test data. */
export interface Property {
  id: string;
  building_name: string | null;
  address: string | null;
  unit_number: string | null;
  neighborhood: string | null;
  square_feet: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  rent: number | null;
  date_of_availability: string | null;
  wheelchair_width_doors: string | null;
  roll_in_shower: string | null;
  grab_bars: string | null;
  elevator_access: string | null;
  kitchen_accessible: string | null;
  income_restricted: string | null;
  occupied: string | null;
  special_features: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
}
