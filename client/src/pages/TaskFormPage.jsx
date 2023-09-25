import { Card, Input, TextArea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { createTask } from "../api/tasks.api";
import {useNavigate} from 'react-router-dom'

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    await createTask(data)
    navigate('/tasks')
  })

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        <h2 className="text-center mb-4 text-2xl font-bold">Create Task</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="title">Title:</Label>
          <Input
            placeholder="Titulo"
            type="text"
            autoFocus
            {...register("title", {
              required: true,
            })}
          />

          <Label htmlFor="description">Description:</Label>
          <TextArea
            placeholder="Descripcion"
            rows={3}
            {...register("description")}
          ></TextArea>

          <Button>Create</Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
