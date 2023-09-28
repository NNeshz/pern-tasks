import axios from "./axios"

export const createTaskRequest = async (task) => axios.post("/tasks", task)

export const getAllTasksRequest = async () => axios.get("/tasks")

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`)

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`)

export const updateTaskRequest = async (id, task) => axios.put(`/tasks/${id}`, task)
