import { Property } from '@/types/property'; // Your real Property type

function PropertyCard({
  building_name,
  unit_number,
  square_feet,
  neighborhood,
  rent,
}: Property) {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">{building_name}</h2>
      <p className="text-sm text-gray-600 mb-1">Unit: {unit_number}</p>
      <p className="text-sm text-gray-600 mb-1">Size: {square_feet} sqft</p>
      <p className="text-sm text-gray-600 mb-1">Neighborhood: {neighborhood}</p>
      <p className="text-md text-green-700 font-semibold mt-2">Rent: ${rent}</p>
    </div>
  );
}

export default PropertyCard;
