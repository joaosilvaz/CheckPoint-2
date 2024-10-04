// src/components/DeleteTodo.tsx
import React from 'react';
import axios from 'axios';

interface DeleteTodoProps {
  todoId: number;
  onDelete: (todoId: number) => void; // Adicione a função para manipular a exclusão
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todoId, onDelete }) => {
  const deleteData = async () => {
    try {
      const response = await axios.delete(`https://todo-caio.azurewebsites.net/api/Todo/${todoId}`);
      console.log('TODO deletado:', response.data);
      onDelete(todoId); // Chame a função para atualizar a lista
    } catch (error) {
      console.error('Erro ao deletar TODO:', error);
    }
  };

  return (
    <div>
      <button onClick={deleteData}>Excluir TODO</button>
    </div>
  );
};

export default DeleteTodo;
