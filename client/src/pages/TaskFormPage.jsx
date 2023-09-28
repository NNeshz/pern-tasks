/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Input, TextArea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "../context/tasksContext";
import { useEffect } from "react";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { createTask, errors: postErrors, loadTask, updateTask } = useTask();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let task;

    if (!params.id) {
      task = await createTask(data);
    } else {
      task = await updateTask(params.id, data);
    }

    if (task) {
      navigate("/tasks");
    }
  });

  useEffect(() => {
    if (params.id) {
      loadTask(params.id).then((response) => {
        setValue("title", response.title);
        setValue("description", response.description);
      });
    }
  }, []);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {postErrors &&
          postErrors.map((err, index) => (
            <span key={index} className="text-red-500">
              {err}
            </span>
          ))}
        <h2 className="text-center mb-4 text-2xl font-bold">
          {params.id ? "Edit Task" : "Create Task"}
        </h2>
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

          <Button>{params.id ? "Edit" : "Create"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
