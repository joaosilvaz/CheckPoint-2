// src/components/TargetList.tsx
import React from 'react';
import { Target } from '../services/api';

interface TargetListProps {
    targets: Target[];
    onSelectTarget: (id: number) => void;
}

const TargetList: React.FC<TargetListProps> = ({ targets, onSelectTarget }) => {
    return (
        <div>
            <h2>Lista de Targets</h2>
            <ul>
                {targets.map(target => (
                    <li key={target.id} onClick={() => onSelectTarget(target.id)}>
                        {target.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TargetList;
