/* eslint-disable react/prop-types */
import { Card, Button } from "../ui";
import { useTask } from "../../context/tasksContext";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask } = useTask();
  const navigate = useNavigate();

  return (
    <Card key={task.id}>
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-2 mt-2">
        <Button onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</Button>
        <Button
          className="bg-red-500 hover:bg-red-700"
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              deleteTask(task.id);
            }
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard;
