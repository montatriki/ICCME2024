import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Poster from './Poster';
import PDFManager from './PDFManager';

interface PosterItem {
  id: string; // Make sure this matches the expected type for poster ID
  pdfId: string;
  presenter: string; // Assuming this property exists
  topic: string; // Assuming this property exists
}

interface ProgramItem {
  id: number; // or string, depending on your implementation
  time: string;
  activity: string;
  posters: PosterItem[];
}

interface AddFormProps {
  item: {
    time: string;
    activity: string;
    posters: PosterItem[];
  };
  onChange: React.Dispatch<React.SetStateAction<{ time: string; activity: string; posters: PosterItem[]; }>>;
  onAdd: () => void;
}

// Define AddForm before using it
function AddForm({ item, onChange, onAdd }: AddFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item.time && item.activity) {
      onAdd();
    } else {
      alert("Please fill in all fields."); // Or use a more user-friendly approach
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="time"
        value={item.time}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 text-white rounded"
        placeholder="Time"
      />
      <textarea
        name="activity"
        value={item.activity}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 text-white rounded"
        placeholder="Activity"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
    </form>
  );
}

export default function ScientificProgram() {
  const [programData, setProgramData] = useState<ProgramItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({ time: '', activity: '', posters: [] as PosterItem[] });

  useEffect(() => {
    fetchProgramData();
  }, []);

  const fetchProgramData = async () => {
    try {
      const response = await fetch('/api/program');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProgramData(data);
    } catch (error) {
      console.error('Error fetching program data:', error);
    }
  };

  const handleEdit = (id: number | string) => {
    setEditingId(id as number);
  };

  const handleSave = async (id: number | string, updatedItem: ProgramItem) => {
    const { id: updatedId, ...rest } = updatedItem; // Rename id to updatedId
    console.log('Updating item with id:', updatedId); // Use the new variable name here.

    // Proceed with your fetch call
    await fetch('/api/program', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...rest }), // id passed from the function parameter
    });
    setEditingId(null);
    fetchProgramData();
  };

  const handleDelete = async (id: number | string) => {
    try {
      await fetch(`/api/program?id=${id}`, { method: 'DELETE' });
      fetchProgramData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await fetch('/api/program', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      setNewItem({ time: '', activity: '', posters: [] });
      fetchProgramData();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-2xl font-semibold mb-6 text-center text-white">November 7th, 2024 (Afternoon)</h4>
        <div className="space-y-6">
          {programData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="border border-white/20 rounded-lg p-4 bg-gray-900 shadow-lg"
            >
              {editingId === item.id ? (
                <EditForm item={item} onSave={handleSave} onCancel={() => setEditingId(null)} />
              ) : (
                <>
                  <p className="text-lg font-semibold mb-2 text-pink-400">{item.time}</p>
                  <p className="text-sm text-gray-300 whitespace-pre-line mb-4">{item.activity}</p>
                  {item.posters && (
                    <div className="mt-4 space-y-4">
                      <p className="text-md font-semibold text-white">Poster Presentations:</p>
                      {item.posters.map((poster) => (
                        <div key={poster.id} className="space-y-2">
                          <Poster 
                            presenter={{ 
                              id: poster.id, // Ensure this is the correct type for Presenter
                              presenter: poster.presenter, // Adjust based on your actual data structure
                              topic: poster.topic 
                            }} 
                            pdfId={poster.pdfId} 
                          />
                          <PDFManager poster={poster} />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 space-x-2">
                    <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <h5 className="text-xl font-semibold mb-4 text-white">Add New Item</h5>
          <AddForm item={newItem} onChange={setNewItem} onAdd={handleAdd} />
        </div>
      </motion.div>
    </div>
  );
}

// Make sure EditForm is defined or imported as well
function EditForm({ item, onSave, onCancel }: { item: ProgramItem; onSave: (id: number | string, updatedItem: ProgramItem) => void; onCancel: () => void; }) {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(item.id, editedItem); }} className="space-y-4">
      <input
        type="text"
        name="time"
        value={editedItem.time}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 text-white rounded"
        placeholder="Time"
      />
      <textarea
        name="activity"
        value={editedItem.activity}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 text-white rounded"
        placeholder="Activity"
      />
      <div className="space-x-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
}
