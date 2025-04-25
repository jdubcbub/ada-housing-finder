
import type { Database } from '@/integrations/supabase/types';
import PropertyCard from '@/components/PropertyCard';

type AdaUnit = Database['public']['Tables']['ada_units']['Row'];

interface ResultsGridProps {
  properties: AdaUnit[];
  isLoading: boolean;
  searchPerformed: boolean;
  searchQuery?: string;
}

export default function ResultsGrid({ properties, isLoading, searchPerformed, searchQuery }: ResultsGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading available units...</div>
      </div>
    );
  }

  if (searchPerformed && properties.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">
          No units found in {searchQuery}. We're working hard to extend our database. Please try another search.
        </div>
      </div>
    );
  }

  if (!searchPerformed) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </div>
  );
}
