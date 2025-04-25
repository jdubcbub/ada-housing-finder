
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/SearchBar';
import ResultsGrid from '@/components/ResultsGrid';
import { fetchProperties } from '@/services/googleSheets';
import { toast } from '@/components/ui/sonner';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: properties = [], isLoading, error, isError } = useQuery({
    queryKey: ['properties', searchQuery],
    queryFn: () => fetchProperties(searchQuery),
    meta: {
      onError: (error) => {
        toast.error('Failed to fetch properties. Please try again later.');
        console.error('Query error:', error);
      },
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
        
        {isError && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 text-red-800 rounded-md">
            <AlertCircle size={20} />
            <p>There was an error fetching properties. Please try again later.</p>
          </div>
        )}
        
        <ResultsGrid properties={properties} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
