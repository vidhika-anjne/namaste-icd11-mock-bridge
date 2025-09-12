import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, FileText, Upload } from 'lucide-react';
import { MedicalTerm } from '@/data/mockTerminology';

interface TerminologyResultProps {
  term: MedicalTerm;
  onSaveToProblemList: (term: MedicalTerm) => void;
}

export const TerminologyResult: React.FC<TerminologyResultProps> = ({ 
  term, 
  onSaveToProblemList 
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-2 border-border hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl text-medical-dark flex items-center gap-2">
              {term.term}
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-base">{term.description}</CardDescription>
            <Badge variant="secondary" className="w-fit">{term.category}</Badge>
          </div>
          <Button 
            onClick={() => onSaveToProblemList(term)}
            className="bg-medical-success hover:bg-medical-success/90 text-white"
            size="sm"
          >
            <Upload className="w-4 h-4 mr-2" />
            Save to Problem List
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Coding Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* NAMASTE Code */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="font-semibold text-medical-dark">NAMASTE</span>
            </div>
            <div className="text-2xl font-bold text-primary mb-1">{term.namaste}</div>
            <div className="text-sm text-muted-foreground">Traditional Medicine</div>
          </div>

          {/* ICD-11 TM2 Code */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="font-semibold text-medical-dark">ICD-11 TM2</span>
            </div>
            <div className="text-2xl font-bold text-accent mb-1">{term.tm2}</div>
            <div className="text-sm text-muted-foreground">Traditional Medicine 2</div>
          </div>

          {/* ICD-11 Biomedicine Code */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-medical-warning/5 to-medical-warning/10 border border-medical-warning/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-medical-warning"></div>
              <span className="font-semibold text-medical-dark">ICD-11 Bio</span>
            </div>
            <div className="text-2xl font-bold text-medical-warning mb-1">{term.biomed}</div>
            <div className="text-sm text-muted-foreground">Biomedicine</div>
          </div>
        </div>

        {/* Translation Info */}
        <div className="p-4 bg-medical-light rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-medium text-medical-dark">Code Translation</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This term maps to <strong>three standardized coding systems</strong>: NAMASTE for traditional medicine terminology, 
            ICD-11 TM2 for traditional medicine classification, and ICD-11 Biomedicine for conventional medical coding.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};