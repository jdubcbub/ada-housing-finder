import type { Database } from '@/integrations/supabase/types';
import PropertyCard from '@/components/PropertyCard';

type AdaUnit = Database['public']['Tables']['ada_units']['Row'];

interface ResultsGridProps {
  properties: AdaUnit[];
  isLoading: boolean;
}

export default function ResultsGrid({ properties, isLoading }: ResultsGridProps) {

  console.log('Is Loading?', isLoading);
  console.log('Properties:', properties);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading available units...</div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">No units found. Try another neighborhood!</div>
      </div>
    );
  }

  <pre className="text-xs">{JSON.stringify(properties, null, 2)}</pre>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </div>
  );
}
