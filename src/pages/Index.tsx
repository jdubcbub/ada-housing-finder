
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import ResultsGrid from '@/components/ResultsGrid';
import { fetchProperties } from '@/services/properties';
import { toast } from '@/components/ui/sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  // Search lives in the URL (?q=) so Back from a details page returns to the results.
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const searchPerformed = searchParams.has('q');

  const { data: properties = [], isLoading, error, isError, refetch } = useQuery({
    queryKey: ['properties', searchQuery],
    queryFn: () => fetchProperties(searchQuery),
    enabled: searchPerformed,
    meta: {
      onError: (error) => {
        toast.error('Failed to fetch properties. Please try again later.');
        console.error('Query error:', error);
      },
    },
  });

  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
          ADA Housing Finder
        </h1>
        
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>
        
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error fetching properties. Please try again later.
              <button 
                onClick={() => refetch()} 
                className="ml-2 underline text-blue-700 hover:text-blue-900"
              >
                Try Again
              </button>
            </AlertDescription>
          </Alert>
        )}
        
        <ResultsGrid 
          properties={properties} 
          isLoading={isLoading} 
          searchPerformed={searchPerformed}
          searchQuery={searchQuery}
          isError={isError}
        />
      </div>
    </main>
  );
};

export default Index;
