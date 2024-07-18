import React, { useState, useEffect } from 'react';

interface FormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, image: File | null) => void;
  title: string;
  showDescription?: boolean;
  initialTitle?: string;
  initialDescription?: string;
}

const FormPopup: React.FC<FormPopupProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  showDescription = true,
  initialTitle = '',
  initialDescription = ''
}) => {
  const [formTitle, setFormTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setFormTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formTitle, description, image);
    setFormTitle('');
    setDescription('');
    setImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 mb-4 bg-gray-700 border-t-2 border-teal-700 text-white rounded"
          />
          <input
            type="text"
            placeholder="Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white border-t-2 border-teal-700 rounded"
          />
          {showDescription && (
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 border-t-2 border-teal-700 text-white rounded"
            ></textarea>
          )}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 hover:bg-gray-700 bg-gray-600 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-gray-600 rounded">
              {initialTitle ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPopup;