/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  getAllTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
} from "../api/tasks.api";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks([...tasks, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const loadTask = async () => {
    const res = await getAllTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    if (res.status === 202) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, errors, loadTask, deleteTask, createTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
