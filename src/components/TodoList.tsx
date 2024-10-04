// src/components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import { Todo, postTodo, getTodosByTargetId } from '../services/api'; // Verifique se essas funções estão importadas corretamente
import DeleteTodo from './DeleteTodo'; // Certifique-se de que o caminho está correto

interface TodoListProps {
    targetId: number;
}

const TodoList: React.FC<TodoListProps> = ({ targetId }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', isComplete: false, targetId });

    useEffect(() => {
        const loadTodos = async () => {
            const fetchedTodos = await getTodosByTargetId(targetId);
            setTodos(fetchedTodos);
        };
        loadTodos();
    }, [targetId]);

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        const createdTodo = await postTodo(newTodo);
        setTodos([...todos, createdTodo]);
        setNewTodo({ title: '', description: '', isComplete: false, targetId });
    };

    const handleDeleteTodo = (todoId: number) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    return (
        <div>
            <h3>TODOs</h3>
            <form onSubmit={handleAddTodo}>
                <input 
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    placeholder="Título da TODO"
                    required
                />
                <textarea
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    placeholder="Descrição da TODO"
                    required
                />
                <button type="submit">Adicionar TODO</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title}
                        <DeleteTodo todoId={todo.id} onDelete={handleDeleteTodo} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
