import React, { useState, useEffect } from 'react';
import { Search, Stethoscope } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { searchTerminology, MedicalTerm } from '@/data/mockTerminology';

interface SearchInterfaceProps {
  onSelectTerm: (term: MedicalTerm) => void;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSelectTerm }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MedicalTerm[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = searchTerminology(query);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelectTerm = (term: MedicalTerm) => {
    setQuery(term.term);
    setIsOpen(false);
    onSelectTerm(term);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-full">
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-medical-dark">NAMASTE ↔ ICD-11 Terminology Service</h1>
          <p className="text-muted-foreground">Search and translate traditional medicine codes</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for medical terms (e.g., Prameha, Amlapitta)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-4 py-6 text-lg border-2 border-border focus:border-primary transition-all duration-200 rounded-xl shadow-sm"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-y-auto shadow-lg border-2 border-border">
          <div className="p-2">
            {results.map((term) => (
              <div
                key={term.id}
                onClick={() => handleSelectTerm(term)}
                className="flex items-center justify-between p-4 hover:bg-medical-light rounded-lg cursor-pointer transition-colors duration-150"
              >
                <div className="flex-1">
                  <div className="font-semibold text-medical-dark">{term.term}</div>
                  <div className="text-sm text-muted-foreground">{term.description}</div>
                  <div className="text-xs text-accent font-medium mt-1">{term.category}</div>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded">{term.namaste}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* No Results */}
      {isOpen && query.length > 1 && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg border-2 border-border">
          <div className="p-6 text-center text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No matching terms found for "{query}"</p>
            <p className="text-sm mt-1">Try searching for: Prameha, Amlapitta, Jwara, or Arsha</p>
          </div>
        </Card>
      )}
    </div>
  );
};