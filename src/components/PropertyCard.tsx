import type { Database } from '@/integrations/supabase/types';

type AdaUnit = Database['public']['Tables']['ada_units']['Row'];

function PropertyCard({
  building_name,
  address,
  unit_number,
  neighborhood,
  square_feet,
  bedrooms,
  bathrooms,
  rent,
  date_of_availability,
  wheelchair_width_doors,
  roll_in_shower,
  grab_bars,
}: AdaUnit) {
  return (
    <div className="flex flex-col justify-between border p-6 rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{building_name}</h2>
        <p className="text-sm text-gray-500 mb-1">{address} — Unit {unit_number}</p>
        <p className="text-sm text-gray-600 mb-2">{bedrooms} Bed · {bathrooms} Bath · {square_feet} sqft</p>
        
        <p className="text-sm text-sky-700 font-semibold mb-2">Neighborhood: {neighborhood}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {wheelchair_width_doors === 'Y' && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Wheelchair Access
            </span>
          )}
          {roll_in_shower === 'Y' && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Roll-in Shower
            </span>
          )}
          {grab_bars === 'Y' && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Grab Bars
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400">
          Available: {date_of_availability ? date_of_availability : 'Contact for details'}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold text-green-700">${rent?.toLocaleString()} / month</p>
      </div>
    </div>
  );
}

export default PropertyCard;
