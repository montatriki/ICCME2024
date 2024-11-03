import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

// Define the interface for the poster prop
interface Poster {
  presenter: string;
  topic: string;
  id: string; // Ensure this matches the type used in your application
}

interface PDFManagertowProps {
  poster: Poster; // Use the defined interface here
}

const PDFManagertow: React.FC<PDFManagertowProps> = ({ poster }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', poster.presenter); // Using "name" to match the API requirement
    formData.append('time', poster.id); // Using "time" to match the API requirement

    try {
      const response = await fetch('/api/upload2', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading the file.');
    } finally {
      setLoading(false);
      setSelectedFile(null); // Reset after upload
    }
  };

  return (
    <div className="space-y-4 p-4 border border-gray-700 rounded-lg bg-gray-800">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id={`pdf-upload-${poster.id}`} // Unique ID for each input
      />
      <label htmlFor={`pdf-upload-${poster.id}`}>
        <Button variant="outline" className="cursor-pointer bg-gray-600 text-white hover:bg-gray-700 transition duration-200" asChild>
          <span className="flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Select PDF
          </span>
        </Button>
      </label>
      <Button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white transition duration-200`}
      >
        {loading ? 'Uploading...' : 'Upload PDF'}
      </Button>
    </div>
  );
};

export default PDFManagertow;
