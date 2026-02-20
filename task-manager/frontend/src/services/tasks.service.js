import api from './api';

const TASKS_ENDPOINT = '/tasks';


export const getAllTasks = async (setState) => {
  const response = await api.get(TASKS_ENDPOINT);
  setState(response.data);
};

export const createTask = async (taskData) => {
  const response = await api.post(TASKS_ENDPOINT, taskData);
  return response.data;
};

export const updateTask = async (id, taskData, setState) => {
  const response = await api.put(`${TASKS_ENDPOINT}/${id}`, taskData);
  setState(prev => prev.map(t => t.id === id ? response.data : t));
  return response.data;
};

export const deleteTask = async (id, setState) => {
  await api.delete(`${TASKS_ENDPOINT}/${id}`);
  setState(prev => prev.filter(t => t.id !== id));
};

export const toggleTaskCompletion = async (id, setState) => {
  const response = await api.patch(`${TASKS_ENDPOINT}/${id}/toggle`);
  setState(prev => prev.map(t => t.id === id ? response.data : t));
  return response.data;
};
