import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Poster from './Poster';
import PDFManager from './PDFManager';

interface PosterItem {
  id: string;
  pdfId: string;
  presenter: string;
  topic: string;
}

interface ProgramItem {
  id: number;
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
      alert("Please fill in all fields.");
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

function EditForm({ item, onSave, onCancel }: { 
  item: ProgramItem; 
  onSave: (id: number | string, updatedItem: ProgramItem) => void; 
  onCancel: () => void; 
}) {
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

export default function ScientificProgram() {
  const [programData, setProgramData] = useState<ProgramItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({ time: '', activity: '', posters: [] as PosterItem[] });
  const [selectedDay, setSelectedDay] = useState(1);

  const fetchProgramData1 = async (day: number = selectedDay) => {
    try {
      const response = await fetch(`/api/program?day=${day}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProgramData(data);
    } catch (error) {
      console.error('Error fetching program data:', error);
    }
  };

  useEffect(() => {
    fetchProgramData1(selectedDay);
  }, [selectedDay]);

  const handleEdit = (id: number | string) => {
    setEditingId(id as number);
  };

  const handleSave = async (id: number | string, updatedItem: ProgramItem) => {
    const dataToUpdate = Object.fromEntries(
      Object.entries(updatedItem).filter(([key]) => key !== 'id')
    );
    
    await fetch('/api/program', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...dataToUpdate }),
    });
    setEditingId(null);
    fetchProgramData1();
  };

  const handleDelete = async (id: number | string) => {
    try {
      await fetch(`/api/program?id=${id}`, { method: 'DELETE' });
      fetchProgramData1(selectedDay);
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
      fetchProgramData1(selectedDay);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-2xl font-semibold mb-6 text-center text-white">November 7th, 2024 (Afternoon)</h4>
        
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={() => handleDayChange(1)} 
            className={`px-4 py-2 rounded ${selectedDay === 1 ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            Day 1
          </button>
          <button 
            onClick={() => handleDayChange(2)} 
            className={`px-4 py-2 rounded ${selectedDay === 2 ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            Day 2
          </button>
          <button 
            onClick={() => handleDayChange(3)} 
            className={`px-4 py-2 rounded ${selectedDay === 3 ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            Day 3
          </button>
        </div>
        
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
                <EditForm 
                  item={item} 
                  onSave={handleSave} 
                  onCancel={() => setEditingId(null)} 
                />
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
                              id: poster.id, 
                              presenter: poster.presenter, 
                              topic: poster.topic 
                            }} 
                            pdfId={poster.id}
                          />
                          <PDFManager poster={poster} />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 space-x-2">
                    <button 
                      onClick={() => handleEdit(item.id)} 
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
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