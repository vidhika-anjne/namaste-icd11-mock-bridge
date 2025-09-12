import React, { useState } from 'react';
import { SearchInterface } from '@/components/SearchInterface';
import { TerminologyResult } from '@/components/TerminologyResult';
import { FHIRBundleDisplay } from '@/components/FHIRBundleDisplay';
import { MedicalTerm } from '@/data/mockTerminology';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedTerm, setSelectedTerm] = useState<MedicalTerm | null>(null);
  const [showFHIRBundle, setShowFHIRBundle] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const { toast } = useToast();

  const handleSelectTerm = (term: MedicalTerm) => {
    setSelectedTerm(term);
    setShowFHIRBundle(false);
    setIsUploaded(false);
  };

  const handleSaveToProblemList = (term: MedicalTerm) => {
    setShowFHIRBundle(true);
    toast({
      title: "FHIR Bundle Generated",
      description: `Generated FHIR bundle for ${term.term} with dual coding system mapping.`,
    });
  };

  const handleUploadEncounter = () => {
    // Mock API call to /uploadEncounter endpoint
    setTimeout(() => {
      setIsUploaded(true);
      toast({
        title: "Encounter Uploaded Successfully",
        description: "FHIR Bundle has been uploaded to the encounter system.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light/30 to-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search Interface */}
        <div className="text-center space-y-6">
          <SearchInterface onSelectTerm={handleSelectTerm} />
        </div>

        {/* Results */}
        {selectedTerm && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <TerminologyResult 
              term={selectedTerm} 
              onSaveToProblemList={handleSaveToProblemList} 
            />
          </div>
        )}

        {/* FHIR Bundle Display */}
        {showFHIRBundle && selectedTerm && (
          <div className="animate-in fade-in-50 duration-500">
            <FHIRBundleDisplay 
              term={selectedTerm}
              onUploadEncounter={handleUploadEncounter}
              isUploaded={isUploaded}
            />
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center py-8 border-t border-border mt-12">
          <p className="text-muted-foreground text-sm">
            <strong>Demo Service:</strong> This is a mock implementation showcasing NAMASTE ↔ ICD-11 terminology mapping. 
            Real implementation would integrate with official WHO ICD-11 APIs and authenticated NAMASTE services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;