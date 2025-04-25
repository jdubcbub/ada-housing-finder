import { Property } from '@/types/property';

function PropertyCard({
  building_name,
  unit_number,
  square_feet,
  neighborhood,
  rent,
}: Property) {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-lg font-bold">{building_name}</h2>
      <p>Unit: {unit_number}</p>
      <p>Size: {square_feet} sqft</p>
      <p>Neighborhood: {neighborhood}</p>
      <p>Rent: ${rent}</p>
    </div>
  );
}

export default PropertyCard;
