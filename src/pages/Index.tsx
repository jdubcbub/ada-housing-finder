
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ResultsGrid from '@/components/ResultsGrid';

// This is mock data - replace with actual Google Sheets integration
const mockProperties = [
  {
    buildingName: "Sunset Apartments",
    unitNumber: "101",
    availabilityDate: "2024-05-01",
    contactName: "John Smith",
    phone: "(555) 123-4567",
    email: "john@example.com"
  },
  {
    buildingName: "Ocean View Heights",
    unitNumber: "304",
    availabilityDate: "2024-05-15",
    contactName: "Jane Doe",
    phone: "(555) 987-6543",
    email: "jane@example.com"
  }
];

const Index = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProperties(mockProperties.filter(p => 
        p.buildingName.toLowerCase().includes(query.toLowerCase())
      ));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
          Neighborhood Spotlight Finder
        </h1>
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        <ResultsGrid properties={properties} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
