import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInterface } from '@/components/SearchInterface';
import { TerminologyResult } from '@/components/TerminologyResult';
import { FHIRBundleDisplay } from '@/components/FHIRBundleDisplay';
import { MedicalTerm } from '@/data/mockTerminology';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const [selectedTerm, setSelectedTerm] = useState<MedicalTerm | null>(null);
  const [showFHIRBundle, setShowFHIRBundle] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

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

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('abhaId');
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const abhaId = sessionStorage.getItem('abhaId');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-lg"></div>
            <div>
              <h1 className="text-lg font-semibold">NAMASTE ↔ ICD-11 System</h1>
              <p className="text-sm text-muted-foreground">Terminology Mapping Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
              <User className="w-4 h-4 text-medical-primary" />
              <span className="text-sm font-medium">{abhaId}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

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

export default Dashboard;