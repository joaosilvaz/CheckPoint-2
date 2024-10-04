// src/services/api.ts
import axios from 'axios';

const baseUrl = 'https://todo-caio.azurewebsites.net/api/';

const requestBase = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Todo {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    targetId: number;
}

export interface Target {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
}

export const getTargets = async () => {
    try {
        const response = await requestBase.get('Targets');
        return response.data; // Retorna os dados recebidos
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export const postTarget = async (target: Omit<Target, 'id'>) => {
    try {
        const response = await requestBase.post('targets', target);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export const postTodo = async (todo: Omit<Todo, 'id'>) => {
    try {
        const response = await requestBase.post('Todo', todo);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export const putTodo = async (todoId: number, todo: Omit<Todo, 'id'>) => {
    try {
        const response = await requestBase.put(`Todo/${todoId}`, todo);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export const deleteTodo = async (todoId: number) => {
    try {
        await requestBase.delete(`todo/${todoId}`);
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

// src/services/api.ts
export const getTodosByTargetId = async (targetId: number) => {
    try {
        const response = await requestBase.get(`Todo?targetId=${targetId}`);
        return response.data; // Retorna a lista de TODOs
    } catch (error) {
        console.error('Erro ao obter TODOs:', error);
        return [];
    }
};
