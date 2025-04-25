
import type { Database } from "@/integrations/supabase/types";

type AdaUnit = Database['public']['Tables']['ada_units']['Row'];

function PropertyCard(props: AdaUnit) {
  const {
    building_name,
    unit_number,
    square_feet,
    neighborhood,
    rent,
    address,
    bedrooms,
    bathrooms,
    date_of_availability
  } = props;

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">{building_name}</h2>
      <p className="text-sm text-gray-700 mb-1">{address} — Unit {unit_number}</p>
      <p className="text-sm text-gray-600 mb-1">{bedrooms} Bed / {bathrooms} Bath · {square_feet} sqft</p>
      <p className="text-sm text-gray-600 mb-1">Neighborhood: {neighborhood}</p>
      <p className="text-md text-green-700 font-semibold mt-2">${rent} / month</p>
      <p className="text-xs text-gray-500 mt-1">Available: {date_of_availability}</p>
    </div>
  );
}

export default PropertyCard;
