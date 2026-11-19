
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar = ({ onSearch, initialQuery = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full max-w-2xl mx-auto">
      <label htmlFor="neighborhood-search" className="sr-only">
        Neighborhood
      </label>
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Input
            id="neighborhood-search"
            type="text"
            placeholder="Enter neighborhood name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
          <Search aria-hidden="true" className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Search aria-hidden="true" className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
