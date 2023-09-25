import axios from "./axios"

export const createTask = async (task) => axios.post("/tasks", task)