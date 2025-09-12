export interface MedicalTerm {
  id: string;
  term: string;
  description: string;
  namaste: string;
  tm2: string;
  biomed: string;
  category: string;
}

export const mockTerminology: MedicalTerm[] = [
  {
    id: "1",
    term: "Prameha",
    description: "Diabetes mellitus in Ayurvedic medicine",
    namaste: "AYU-567",
    tm2: "XM12.5",
    biomed: "5A11",
    category: "Metabolic Disorders"
  },
  {
    id: "2", 
    term: "Amlapitta",
    description: "Gastroesophageal reflux disease in Ayurvedic medicine",
    namaste: "AYU-123",
    tm2: "XM05.8",
    biomed: "DB30",
    category: "Digestive Disorders"
  },
  {
    id: "3",
    term: "Arsha",
    description: "Hemorrhoids in Ayurvedic medicine",
    namaste: "AYU-456",
    tm2: "XM08.2",
    biomed: "MD41",
    category: "Digestive Disorders"
  },
  {
    id: "4",
    term: "Atisara",
    description: "Diarrhea in Ayurvedic medicine", 
    namaste: "AYU-789",
    tm2: "XM03.1",
    biomed: "ME05",
    category: "Digestive Disorders"
  },
  {
    id: "5",
    term: "Jwara",
    description: "Fever in Ayurvedic medicine",
    namaste: "AYU-234",
    tm2: "XM15.7",
    biomed: "MG50",
    category: "General Symptoms"
  },
  {
    id: "6",
    term: "Shiroroga",
    description: "Headache disorders in Ayurvedic medicine",
    namaste: "AYU-678",
    tm2: "XM20.4",
    biomed: "8A80",
    category: "Neurological Disorders"
  },
  {
    id: "7",
    term: "Hridroga",
    description: "Heart diseases in Ayurvedic medicine",
    namaste: "AYU-345",
    tm2: "XM25.9",
    biomed: "BA00",
    category: "Cardiovascular Disorders"
  },
  {
    id: "8",
    term: "Kshaya",
    description: "Tuberculosis in Ayurvedic medicine",
    namaste: "AYU-901",
    tm2: "XM18.3",
    biomed: "1B10",
    category: "Respiratory Disorders"
  }
];

export const searchTerminology = (query: string): MedicalTerm[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  return mockTerminology.filter(term => 
    term.term.toLowerCase().includes(searchTerm) ||
    term.description.toLowerCase().includes(searchTerm) ||
    term.namaste.toLowerCase().includes(searchTerm) ||
    term.category.toLowerCase().includes(searchTerm)
  );
};

export const getTermById = (id: string): MedicalTerm | undefined => {
  return mockTerminology.find(term => term.id === id);
};

export const translateCode = (namasteCode: string): MedicalTerm | null => {
  return mockTerminology.find(term => term.namaste === namasteCode) || null;
};