import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface Presenter {
  id: string;
  presenter: string;
  topic: string;
}

interface PosterProps {
  presenter: Presenter;
  pdfId: string;
}

const Poster: React.FC<PosterProps> = ({ presenter, pdfId }) => {
  const handleViewPdf = () => {
    if (pdfId) {
      window.open(`/api/pdfs/${pdfId}`, '_blank');
    }
  };

  return (
    <div className="border-l-2 border-pink-400 pl-4">
      <p className="text-xl text-white">
        <span className="font-semibold text-pink-400">{presenter.id}:</span> {presenter.presenter}
      </p>
      <p className="text-l text-white">{presenter.topic}</p>
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
