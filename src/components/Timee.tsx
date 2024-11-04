import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface TimeeProps {
  fileKey: string | number;  // Changed from 'time' to 'fileKey' to match your usage
}
const Timee: React.FC<TimeeProps> = ({ fileKey }) => {
  const handleViewPdf = () => {
    if (fileKey) {
      window.open(`/api/time/${fileKey}`, '_blank');
    }
  };

  return (
    <div className="border-l-2 border-pink-400 pl-4">
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

export default Timee;