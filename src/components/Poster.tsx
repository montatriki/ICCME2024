// components/Poster.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Define the interface for the presenter prop
interface Presenter {
  id: string; // The ID of the presenter
  presenter: string; // The name of the presenter
  topic: string; // The topic associated with the presenter
}

interface PosterProps {
  presenter: Presenter; // Use the defined interface here
  pdfId: string; // The PDF ID for the document to view
}

const Poster: React.FC<PosterProps> = ({ presenter, pdfId }) => {
  const handleViewPdf = () => {
    if (pdfId) {
      window.open(`/api/pdfs/${pdfId}`, '_blank'); // Open the PDF in a new tab
    }
  };

  return (
    <div className="border-l-2 border-pink-400 pl-4">
      <p className="text-sm text-white">
        <span className="font-semibold text-pink-400">{presenter.id}:</span> {presenter.presenter}
      </p>
      <p className="text-sm text-gray-400">{presenter.topic}</p>
      <Button 
        onClick={handleViewPdf} 
        className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        variant="outline"
      >
        <Eye className="w-4 h-4 mr-2" />
        View PDF
      </Button>
    </div>
  );
};

export default Poster;
