/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  getAllTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
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

  const loadTasks = async () => {
    try {
      const res = await getAllTasksRequest();
      setTasks(res.data);
    } catch (error) {
      setErrors([error.response.data]);
    }
  };

  const loadTask = async (id) => {
    const res = await getTaskRequest(id);
    return res.data;
  };

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    if (res.status === 202) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      return res.data;
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        errors,
        loadTasks,
        loadTask,
        deleteTask,
        createTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
