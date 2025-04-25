
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/SearchBar';
import ResultsGrid from '@/components/ResultsGrid';
import { fetchProperties } from '@/services/googleSheets';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['properties', searchQuery],
    queryFn: () => fetchProperties(searchQuery),
    onError: (error) => {
      toast.error('Failed to fetch properties. Please try again later.');
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
