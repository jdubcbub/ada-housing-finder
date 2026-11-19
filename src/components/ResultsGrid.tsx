
import type { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';

type AdaUnit = Property;

interface ResultsGridProps {
  properties: AdaUnit[];
  isLoading: boolean;
  searchPerformed: boolean;
  searchQuery?: string;
  isError?: boolean;
}

export default function ResultsGrid({ properties, isLoading, searchPerformed, searchQuery, isError = false }: ResultsGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading available units...</div>
      </div>
    );
  }

  // A failed request is reported by the error alert, not as "no units found".
  if (isError) {
    return null;
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
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}
