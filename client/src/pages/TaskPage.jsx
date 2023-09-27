/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import TaskCard from "../components/tasks/TaskCard"
import { useTask } from "../context/tasksContext"

function TasksPage() {

  const { tasks, loadTask } = useTask()

  useEffect(() => {
    loadTask()    
  }, [])

  return (
    <div className="grid grid-cols-3 gap-2 mx-20 mt-10">
    {
      tasks.map(task => (
        <TaskCard key={task.id} task={task}/>
      ))
    }
    </div>
  )
}

export default TasksPage