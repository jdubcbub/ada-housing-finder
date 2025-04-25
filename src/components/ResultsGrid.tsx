
import React from 'react';
import PropertyCard from './PropertyCard';

interface Property {
  buildingName: string;
  unitNumber: string;
  availabilityDate: string;
  contactName: string;
  phone: string;
  email: string;
}

interface ResultsGridProps {
  properties: Property[];
  isLoading: boolean;
}

const ResultsGrid = ({ properties, isLoading }: ResultsGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Searching properties...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No properties found. Please try another neighborhood.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </div>
  );
};

export default ResultsGrid;
