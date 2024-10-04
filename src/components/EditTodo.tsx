import React, { useState } from 'react';
import axios from 'axios';

interface EditTodoProps {
  todoId: number;
}

const EditTodo: React.FC<EditTodoProps> = ({ todoId }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const putTodo = async () => {
    try {
      const response = await axios.put(`https://todo-caio.azurewebsites.net/api/Todo/${todoId}`, {
        id: todoId,
        title,
        description,
        isComplete: false,
        targetId: 22, // Exemplificando, aqui você pode passar o ID do target
      });
      console.log('TODO atualizado:', response.data);
    } catch (error) {
      console.error('Erro ao editar TODO:', error);
    }
  };

  return (
    <div>
      <h3>Editar TODO</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Novo título" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Nova descrição" />
      <button onClick={putTodo}>Salvar</button>
    </div>
  );
};

export default EditTodo;
