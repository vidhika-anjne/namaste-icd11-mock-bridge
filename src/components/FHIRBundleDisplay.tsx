import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Copy, Eye, FileJson } from 'lucide-react';
import { MedicalTerm } from '@/data/mockTerminology';

interface FHIRBundleDisplayProps {
  term: MedicalTerm;
  onUploadEncounter: () => void;
  isUploaded: boolean;
}

export const FHIRBundleDisplay: React.FC<FHIRBundleDisplayProps> = ({ 
  term, 
  onUploadEncounter, 
  isUploaded 
}) => {
  const generateFHIRBundle = (term: MedicalTerm) => {
    return {
      resourceType: "Bundle",
      id: `bundle-${term.id}-${Date.now()}`,
      type: "transaction",
      timestamp: new Date().toISOString(),
      entry: [
        {
          fullUrl: `Condition/${term.id}`,
          resource: {
            resourceType: "Condition",
            id: term.id,
            clinicalStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  code: "active"
                }
              ]
            },
            code: {
              coding: [
                {
                  system: "https://namaste.gov.in/terminology",
                  code: term.namaste,
                  display: term.term
                },
                {
                  system: "https://icd.who.int/browse11/l-m/en#/http%3a%2f%2fid.who.int%2ficd%2fentity",
                  code: term.tm2,
                  display: `${term.term} (TM2)`
                },
                {
                  system: "https://icd.who.int/browse11/l-m/en",
                  code: term.biomed,
                  display: `${term.term} (Biomedicine)`
                }
              ],
              text: term.description
            },
            subject: {
              reference: "Patient/demo-patient-123",
              display: "Demo Patient"
            },
            recordedDate: new Date().toISOString(),
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/condition-category",
                    code: "problem-list-item",
                    display: "Problem List Item"
                  }
                ]
              }
            ]
          },
          request: {
            method: "POST",
            url: "Condition"
          }
        }
      ]
    };
  };

  const fhirBundle = generateFHIRBundle(term);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(fhirBundle, null, 2));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-2 border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl text-medical-dark flex items-center gap-2">
              <FileJson className="w-5 h-5 text-primary" />
              FHIR Bundle Preview
            </CardTitle>
            <CardDescription>
              Generated FHIR Bundle for {term.term} with dual coding system mapping
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy JSON
            </Button>
            {!isUploaded ? (
              <Button 
                onClick={onUploadEncounter}
                className="bg-primary hover:bg-primary/90"
                size="sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Upload Encounter
              </Button>
            ) : (
              <Badge className="bg-medical-success text-white">
                <CheckCircle className="w-4 h-4 mr-1" />
                Uploaded
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
          <pre className="text-sm text-gray-100 whitespace-pre-wrap font-mono">
            {JSON.stringify(fhirBundle, null, 2)}
          </pre>
        </div>
        
        {isUploaded && (
          <div className="mt-4 p-4 bg-medical-success/10 border border-medical-success/20 rounded-lg">
            <div className="flex items-center gap-2 text-medical-success">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Successfully uploaded to encounter system</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              FHIR Bundle has been processed and added to the patient's problem list with dual coding.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};