import type { Database } from '@/integrations/supabase/types';

type AdaUnit = Database['public']['Tables']['ada_units']['Row'];

function PropertyCard(props: AdaUnit) {
  console.log('PropertyCard props:', props);

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">Property Data:</h2>
      <pre className="text-xs bg-gray-100 p-2 rounded">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

export default PropertyCard;