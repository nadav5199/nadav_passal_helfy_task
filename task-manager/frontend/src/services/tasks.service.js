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

export const updateTask = async (id, taskData) => {
  const response = await api.put(`${TASKS_ENDPOINT}/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`${TASKS_ENDPOINT}/${id}`);
  return id;
};

export const toggleTaskCompletion = async (id) => {
  const response = await api.patch(`${TASKS_ENDPOINT}/${id}/toggle`);
  return response.data;
};
