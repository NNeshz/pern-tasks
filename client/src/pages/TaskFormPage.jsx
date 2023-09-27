import { Card, Input, TextArea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/tasksContext";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { createTask, errors: postErrors } = useTask();

  const onSubmit = handleSubmit(async (data) => {
    const task = await createTask(data);
    if (task) {
      navigate("/tasks");
    }
  });

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {postErrors &&
          postErrors.map((err, index) => (
            <span key={index} className="text-red-500">
              {err}
            </span>
          ))}
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
          {errors.title && <p className="text-red-500">Titulo es requerido</p>}

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
