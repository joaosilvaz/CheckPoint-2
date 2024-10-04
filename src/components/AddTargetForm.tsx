// src/components/AddTargetForm.tsx
import React, { useState } from 'react';
import { Target } from '../services/api';

interface AddTargetFormProps {
  onAddTarget: (target: Omit<Target, 'id'>) => Promise<void>;
}

const AddTargetForm: React.FC<AddTargetFormProps> = ({ onAddTarget }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await onAddTarget({ title, description, isComplete: false }); // Chama a função para adicionar o target
      setTitle('');
      setDescription('');
  };

  return (
      <form onSubmit={handleSubmit} className="input-container">
          <input
              type="text"
              className="input-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do Target"
              required
          />
          <input
              type="text"
              className="input-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do Target"
              required
          />
          <button type="submit">Adicionar Target</button>
      </form>
  );
};

export default AddTargetForm;