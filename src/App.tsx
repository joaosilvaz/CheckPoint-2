// src/components/App.tsx
import React, { useEffect, useState } from 'react';
import { getTargets, postTarget, Target } from './services/api';
import TargetList from './components/TargetList';
import AddTargetForm from './components/AddTargetForm';
import './App.css';
import DeleteTodo from './components/DeleteTodo';

const App: React.FC = () => {
    const [targets, setTargets] = useState<Target[]>([]);
    const [, setSelectedTargetId] = useState<number | null>(null);
    
    useEffect(() => {
        const loadTargets = async () => {
            const fetchedTargets = await getTargets();
            setTargets(fetchedTargets);
        };
        loadTargets();
    }, []);

    const handleAddTarget = async (target: Omit<Target, 'id'>) => {
        const newTarget = await postTarget(target);
        setTargets([...targets, newTarget]);
    };

    const handleSelectTarget = (id: number) => {
        setSelectedTargetId(id);
    };

    return (
        <div className="app">
            <h1>Todo App</h1>
            <AddTargetForm onAddTarget={handleAddTarget} />
            <TargetList targets={targets} onSelectTarget={handleSelectTarget} />
            {/* Aqui você pode adicionar a exibição de TODOs baseados no `selectedTargetId` */}
            <DeleteTodo todoId={0} onDelete={function (): void {
          throw new Error('Function not implemented.');
        } }/>
        </div>
    );
};

export default App;
